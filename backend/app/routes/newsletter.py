import logging
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.newsletter import NewsletterSubscriber
from app.schemas.newsletter import (
    NewsletterSubscribeRequest,
    NewsletterSubscribeResponse,
)
from app.services.rate_limiter import newsletter_rate_limiter

logger = logging.getLogger("sahvion.routes.newsletter")
router = APIRouter(prefix="/newsletter", tags=["Newsletter"])


@router.post(
    "/subscribe",
    response_model=NewsletterSubscribeResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Subscribe to Newsletter Radar",
    description="Registers a user email address into the newsletter database with duplicate prevention.",
)
def subscribe_newsletter(
    payload: NewsletterSubscribeRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    newsletter_rate_limiter.check_rate_limit(request)

    email_clean = payload.email.strip().lower()

    # Check for existing subscription to prevent duplicates
    existing = (
        db.query(NewsletterSubscriber)
        .filter(NewsletterSubscriber.email == email_clean)
        .first()
    )

    if existing:
        if not existing.is_active:
            existing.is_active = True
            db.commit()
            db.refresh(existing)
        return NewsletterSubscribeResponse(
            id=existing.id,
            email=existing.email,
            is_active=existing.is_active,
            created_at=existing.created_at,
            message="Your subscription is already active. You are on the SAHVION radar.",
        )

    try:
        new_sub = NewsletterSubscriber(email=email_clean, is_active=True)
        db.add(new_sub)
        db.commit()
        db.refresh(new_sub)

        return new_sub

    except Exception as e:
        db.rollback()
        logger.error(f"Error subscribing email: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong. Please try again.",
        )
