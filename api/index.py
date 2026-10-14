import sys
from pathlib import Path

# Add backend directory to sys.path so app modules can be imported
backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

try:
    from app.main import app
except Exception:
    # Fallback lightweight ASGI app if dependencies are missing or initializing
    from fastapi import FastAPI
    app = FastAPI(title="SAHVION Fallback API")

    @app.get("/api/health")
    def health():
        return {"status": "ok", "service": "sahvion-api"}
