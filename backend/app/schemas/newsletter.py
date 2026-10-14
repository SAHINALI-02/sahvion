from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr = Field(..., description="Valid subscriber email address")


class NewsletterSubscribeResponse(BaseModel):
    id: int
    email: str
    is_active: bool
    created_at: datetime
    message: str = "Thank you for subscribing to SAHVION technological radar."

    class Config:
        from_attributes = True
