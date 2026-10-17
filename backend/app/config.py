import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv

# Load .env file from the backend root directory or parent
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


def _has_real_value(value: str | None) -> bool:
    if value is None:
        return False
    cleaned = value.strip()
    if not cleaned:
        return False
    lowered = cleaned.lower()
    blocked_prefixes = ("replace_", "your_", "example", "placeholder", "changeme", "dummy", "test_")
    if any(lowered.startswith(prefix) for prefix in blocked_prefixes):
        return False
    if "yourdomain" in lowered or "example.com" in lowered:
        return False
    return True


class Settings:
    PROJECT_NAME: str = "SAHVION Technology Engine"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/sahvion_db",
    )

    # Security & CORS
    CORS_ORIGINS_RAW: str = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173",
    )

    @property
    def CORS_ORIGINS(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS_RAW.split(",") if origin.strip()]

    # JWT Authentication (for future admin features)
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "sahvion_default_secure_secret_key_2026")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

    # Contact & Email Configuration
    CONTACT_EMAIL: str = os.getenv("CONTACT_EMAIL", "sahvion26@gmail.com")
    CONTACT_PHONE: str = os.getenv("CONTACT_PHONE", "+91 8531833975")
    EMAIL_PROVIDER: str = os.getenv("EMAIL_PROVIDER", "resend").strip().lower()

    # Production-safe transactional email configuration.
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    RESEND_FROM_EMAIL: str = os.getenv("RESEND_FROM_EMAIL", "")
    RESEND_API_KEY_VALID: bool = _has_real_value(os.getenv("RESEND_API_KEY", ""))
    RESEND_FROM_EMAIL_VALID: bool = _has_real_value(os.getenv("RESEND_FROM_EMAIL", ""))

    # SMTP fallback for legacy/custom mail providers.
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_USE_TLS: bool = os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes", "on"}
    SMTP_USE_SSL: bool = os.getenv("SMTP_USE_SSL", "false").lower() in {"1", "true", "yes", "on"}


settings = Settings()
