from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150, description="Full name of the contact")
    email: EmailStr = Field(..., description="Valid work or personal email address")
    phone: Optional[str] = Field(None, max_length=50, description="Contact phone / mobile number")
    company: Optional[str] = Field(None, max_length=150, description="Company or venture name")
    service: str = Field(..., min_length=2, max_length=150, description="Selected technology discipline or service")
    message: str = Field(..., min_length=5, max_length=5000, description="Project vision or inquiry details")


class ContactInquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    service: str
    message: str
    created_at: datetime
    status: str = "received"
    confirmation_message: str = "Thank you. Your project enquiry has been received."

    class Config:
        from_attributes = True
