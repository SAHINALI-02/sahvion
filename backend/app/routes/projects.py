from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectResponse

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get(
    "",
    response_model=List[ProjectResponse],
    summary="List Projects",
    description="Retrieves published projects from the database for the dynamic portfolio.",
)
def list_projects(
    category: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    query = db.query(Project)
    if category:
        query = query.filter(Project.category.ilike(f"%{category}%"))
    projects = query.order_by(Project.created_at.desc()).offset(offset).limit(limit).all()
    return projects


@router.get(
    "/{project_id_or_slug}",
    response_model=ProjectResponse,
    summary="Get Project by ID or Slug",
    description="Retrieves comprehensive details for a specific project.",
)
def get_project(project_id_or_slug: str, db: Session = Depends(get_db)):
    if project_id_or_slug.isdigit():
        project = db.query(Project).filter(Project.id == int(project_id_or_slug)).first()
    else:
        project = db.query(Project).filter(Project.slug == project_id_or_slug).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project '{project_id_or_slug}' not found.",
        )
    return project
