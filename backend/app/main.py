from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse, RedirectResponse
from app.config import Settings, _has_real_value, settings
from app.database import init_db, SessionLocal
from app.models.project import Project
from app.routes import contact_router, newsletter_router, projects_router, admin_router
from app.services.email import send_contact_notification

# Resolve path to frontend production build (SAHVION/dist)
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
DIST_DIR = ROOT_DIR / "dist"


def seed_initial_projects():
    """Seeds initial showcase projects if the table is currently empty."""
    db = SessionLocal()
    try:
        count = db.query(Project).count()
        if count == 0:
            sample_projects = [
                Project(
                    title="Aether 3D Spatial Canvas",
                    slug="aether-3d-spatial-canvas",
                    description="Real-time WebGL engine with deterministic physics simulation and dynamic volumetric lighting.",
                    category="Spatial 3D Platform",
                    thumbnail="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
                    live_url="https://sahvion.network/work/aether",
                    github_url="https://github.com/sahvion/aether-core",
                ),
                Project(
                    title="Vortex Global Edge Mesh",
                    slug="vortex-global-edge-mesh",
                    description="Distributed zero-latency routing network supporting real-time cryptographic state trees across 32 global edge points.",
                    category="Cloud Architecture",
                    thumbnail="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
                    live_url="https://sahvion.network/work/vortex",
                    github_url="https://github.com/sahvion/vortex-mesh",
                ),
                Project(
                    title="Neural HUD Intelligence",
                    slug="neural-hud-intelligence",
                    description="Biometric telemetry dashboard and next-generation glass UI system engineered for complex enterprise operations.",
                    category="UI/UX System",
                    thumbnail="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
                    live_url="https://sahvion.network/work/neural-hud",
                    github_url="https://github.com/sahvion/neural-hud",
                ),
            ]
            sample_projects[0].technologies = ["Three.js", "React Three Fiber", "WebGPU", "TypeScript"]
            sample_projects[0].images = ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"]

            sample_projects[1].technologies = ["FastAPI", "Go", "Distributed Redis", "PostgreSQL"]
            sample_projects[1].images = ["https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4"]

            sample_projects[2].technologies = ["React 18", "Tailwind CSS", "Framer Motion", "WebGL Shaders"]
            sample_projects[2].images = ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b"]

            db.add_all(sample_projects)
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error seeding initial projects: {e}")
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup sequence
    init_db()
    seed_initial_projects()
    yield
    # Shutdown sequence


app = FastAPI(
    title="SAHVION Engine API",
    description="Production-ready FastAPI backend for SAHVION — TECH • INNOVATION • FUTURE. Powers client inquiries, newsletter subscriptions, and dynamic project portfolios.",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

# CORS Middleware Configuration
origins = settings.CORS_ORIGINS
# Ensure localhost and dev ports are always permitted
for dev_origin in [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]:
    if dev_origin not in origins:
        origins.append(dev_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include API Routers under /api
app.include_router(contact_router, prefix=settings.API_V1_STR)
app.include_router(newsletter_router, prefix=settings.API_V1_STR)
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)

# Mount frontend static asset directories if available
if (DIST_DIR / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(DIST_DIR / "assets")), name="assets")

if (DIST_DIR / "images").exists():
    app.mount("/images", StaticFiles(directory=str(DIST_DIR / "images")), name="images")


@app.get("/docs", include_in_schema=False)
def redirect_docs():
    return RedirectResponse(url="/api/docs")


@app.get("/redoc", include_in_schema=False)
def redirect_redoc():
    return RedirectResponse(url="/api/redoc")


@app.get("/api", tags=["Health Check"])
def api_root():
    return {
        "status": "online",
        "system": "SAHVION Technological Core",
        "tagline": "TECH • INNOVATION • FUTURE",
        "version": "1.0.0",
        "docs": "/api/docs",
        "redoc": "/api/redoc",
        "official_contact": {
            "email": settings.CONTACT_EMAIL,
            "phone": settings.CONTACT_PHONE,
        },
    }


@app.get("/api/health", tags=["Health Check"])
def health_check():
    return {
        "status": "healthy",
        "service": "SAHVION Engine API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "openapi": "/api/openapi.json",
    }


@app.get("/api/email/health", tags=["Email Health Check"])
def email_health_check():
    provider = settings.EMAIL_PROVIDER.lower()
    configured = False
    missing = []

    if provider == "resend":
        configured = bool(_has_real_value(settings.RESEND_API_KEY) and _has_real_value(settings.RESEND_FROM_EMAIL))
        if not _has_real_value(settings.RESEND_API_KEY):
            missing.append("RESEND_API_KEY")
        if not _has_real_value(settings.RESEND_FROM_EMAIL):
            missing.append("RESEND_FROM_EMAIL")
    elif provider == "smtp":
        configured = bool(settings.SMTP_HOST and settings.SMTP_USERNAME and settings.SMTP_PASSWORD)
        if not settings.SMTP_HOST:
            missing.append("SMTP_HOST")
        if not settings.SMTP_USERNAME:
            missing.append("SMTP_USERNAME")
        if not settings.SMTP_PASSWORD:
            missing.append("SMTP_PASSWORD")
    elif provider == "disabled":
        configured = False
        missing.append("EMAIL_PROVIDER=disabled")
    else:
        missing.append("EMAIL_PROVIDER")

    return {
        "status": "configured" if configured else "missing_credentials",
        "provider": provider,
        "recipient_email": settings.CONTACT_EMAIL,
        "configured": configured,
        "missing": missing,
        "docs": "/api/docs",
    }


@app.api_route("/api/email/test", methods=["GET", "POST"], tags=["Email Health Check"])
def email_test_send():
    provider = settings.EMAIL_PROVIDER.lower()
    if provider not in {"resend", "smtp"}:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email delivery is disabled in the current environment. Set EMAIL_PROVIDER=resend or EMAIL_PROVIDER=smtp and configure the required credentials.",
        )

    email_sent = send_contact_notification(
        name="SAHVION System Test",
        email="test@local.dev",
        phone="+1 000 000 0000",
        company="SAHVION",
        service="Email Delivery Check",
        message="This is an automated verification email from the SAHVION backend to confirm email delivery configuration.",
    )

    if not email_sent:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Test email could not be sent. Verify the provider credentials and recipient configuration.",
        )

    return {
        "status": "sent",
        "provider": provider,
        "recipient_email": settings.CONTACT_EMAIL,
    }


@app.get("/", include_in_schema=False)
async def serve_root():
    """Serves the frontend single-page application at root."""
    index_file = DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return api_root()


@app.get("/{full_path:path}", include_in_schema=False)
async def serve_spa(full_path: str):
    """
    Catch-all route to serve static files from dist or fallback to index.html for SPA routing.
    Protects /api, /docs, /redoc, /openapi.json from being shadowed.
    """
    if (
        full_path.startswith("api/")
        or full_path == "api"
        or full_path.startswith("docs")
        or full_path.startswith("redoc")
        or full_path.startswith("openapi.json")
    ):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API endpoint not found")

    target_file = (DIST_DIR / full_path).resolve()
    if target_file.is_file() and str(target_file).startswith(str(DIST_DIR.resolve())):
        return FileResponse(target_file)

    index_file = DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Frontend production bundle not found. Please run 'npm run build'.",
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
