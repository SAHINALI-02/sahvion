import logging
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import ContactInquiry
from app.schemas.contact import ContactInquiryCreate, ContactInquiryResponse
from app.services.email import send_contact_notification
from app.services.rate_limiter import contact_rate_limiter

logger = logging.getLogger("sahvion.routes.contact")
router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post(
    "",
    response_model=ContactInquiryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Project Inquiry",
    description="Receives client project details, stores them securely in PostgreSQL, and dispatches a notification.",
)
def submit_contact_inquiry(
    payload: ContactInquiryCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    logger.info("Enquiry received from %s for service=%s", payload.email, payload.service)
    contact_rate_limiter.check_rate_limit(request)
    logger.info("Validation passed for enquiry from %s", payload.email)

    try:
        inquiry = ContactInquiry(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            phone=payload.phone.strip() if payload.phone else None,
            company=payload.company.strip() if payload.company else None,
            service=payload.service.strip(),
            message=payload.message.strip(),
            status="received",
        )
        db.add(inquiry)
        db.commit()
        db.refresh(inquiry)
        logger.info("Enquiry persisted successfully with id=%s", inquiry.id)

        logger.info("Email sending started for enquiry id=%s", inquiry.id)
        email_sent = send_contact_notification(
            name=inquiry.name,
            email=inquiry.email,
            phone=inquiry.phone,
            company=inquiry.company,
            service=inquiry.service,
            message=inquiry.message,
        )

        if not email_sent:
            inquiry.status = "email_failed"
            db.add(inquiry)
            db.commit()
            logger.error("Email sending failed for enquiry id=%s; the request will return an error to the frontend.", inquiry.id)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Your enquiry was received, but email delivery failed. Please try again in a few moments.",
            )

        inquiry.status = "email_sent"
        db.add(inquiry)
        db.commit()
        logger.info("Email sending successful for enquiry id=%s", inquiry.id)
        return inquiry

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.exception("Error persisting or sending contact inquiry: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong. Please try again.",
        )
