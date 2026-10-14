from app.routes.contact import router as contact_router
from app.routes.newsletter import router as newsletter_router
from app.routes.projects import router as projects_router
from app.routes.admin import router as admin_router

__all__ = ["contact_router", "newsletter_router", "projects_router", "admin_router"]
