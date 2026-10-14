from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.project import Project
from app.models.contact import ContactInquiry
from app.models.newsletter import NewsletterSubscriber
from app.models.admin import AdminUser
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.schemas.contact import ContactInquiryResponse
from app.schemas.newsletter import NewsletterSubscribeResponse
from app.schemas.auth import AdminLoginRequest, Token
from app.auth.jwt import verify_password, create_access_token, verify_token, get_password_hash

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/login", response_model=Token, summary="Admin Authentication")
def admin_login(payload: AdminLoginRequest, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == payload.username).first()
    
    # If no admin exists in the system yet, initialize default admin for testing
    if not admin and payload.username == "admin" and payload.password == "sahvion2026":
        admin = AdminUser(
            username="admin",
            email="sahvion26@gmail.com",
            hashed_password=get_password_hash("sahvion2026"),
            is_active=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)

    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post(
    "/projects",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Project",
)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(verify_token),
):
    existing = db.query(Project).filter(Project.slug == payload.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A project with this slug already exists.",
        )

    project = Project(
        title=payload.title,
        slug=payload.slug,
        description=payload.description,
        category=payload.category,
        thumbnail=payload.thumbnail,
        live_url=payload.live_url,
        github_url=payload.github_url,
    )
    project.images = payload.images
    project.technologies = payload.technologies

    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put(
    "/projects/{project_id}",
    response_model=ProjectResponse,
    summary="Update Project",
)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(verify_token),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found.",
        )

    update_data = payload.dict(exclude_unset=True)
    if "images" in update_data:
        project.images = update_data.pop("images")
    if "technologies" in update_data:
        project.technologies = update_data.pop("technologies")

    for key, value in update_data.items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)
    return project


@router.delete(
    "/projects/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Project",
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(verify_token),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found.",
        )
    db.delete(project)
    db.commit()
    return None


@router.get(
    "/inquiries",
    response_model=List[ContactInquiryResponse],
    summary="List Client Inquiries",
)
def list_inquiries(
    db: Session = Depends(get_db),
    current_user: str = Depends(verify_token),
):
    return db.query(ContactInquiry).order_by(ContactInquiry.created_at.desc()).all()


@router.get(
    "/subscribers",
    response_model=List[NewsletterSubscribeResponse],
    summary="List Newsletter Subscribers",
)
def list_subscribers(
    db: Session = Depends(get_db),
    current_user: str = Depends(verify_token),
):
    return db.query(NewsletterSubscriber).order_by(NewsletterSubscriber.created_at.desc()).all()
