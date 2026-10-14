import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    thumbnail = Column(String(500), nullable=True)
    _images = Column("images", Text, default="[]", nullable=False)
    _technologies = Column("technologies", Text, default="[]", nullable=False)
    live_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    @property
    def images(self):
        try:
            return json.loads(self._images) if self._images else []
        except Exception:
            return []

    @images.setter
    def images(self, value):
        self._images = json.dumps(value if isinstance(value, list) else [])

    @property
    def technologies(self):
        try:
            return json.loads(self._technologies) if self._technologies else []
        except Exception:
            return []

    @technologies.setter
    def technologies(self, value):
        self._technologies = json.dumps(value if isinstance(value, list) else [])

    def __repr__(self):
        return f"<Project(id={self.id}, title='{self.title}', category='{self.category}')>"
