import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.config import settings

logger = logging.getLogger("sahvion.database")
logging.basicConfig(level=logging.INFO)

Base = declarative_base()

def get_engine():
    db_url = settings.DATABASE_URL
    try:
        if db_url.startswith("postgresql"):
            # Attempt PostgreSQL engine connection
            engine = create_engine(
                db_url,
                pool_pre_ping=True,
                pool_size=10,
                max_overflow=20,
            )
            # Test connection
            with engine.connect() as conn:
                logger.info("Successfully established connection to PostgreSQL database.")
            return engine
        else:
            return create_engine(db_url, connect_args={"check_same_thread": False})
    except Exception as e:
        logger.warning(
            f"PostgreSQL connection to '{db_url}' failed: {e}. "
            "Falling back to local SQLite engine (sahvion_dev.db) for uninterrupted development."
        )
        sqlite_fallback = "sqlite:///./sahvion_dev.db"
        return create_engine(sqlite_fallback, connect_args={"check_same_thread": False})

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # Import all models to ensure they are registered with Base metadata
    from app.models import contact, newsletter, project, admin  # noqa: F401
    Base.metadata.create_all(bind=engine)

    if engine.dialect.name == "sqlite":
        with engine.begin() as conn:
            table_info = conn.exec_driver_sql("PRAGMA table_info(contact_inquiries)").fetchall()
            columns = [row[1] for row in table_info]
            if "status" not in columns:
                conn.exec_driver_sql(
                    "ALTER TABLE contact_inquiries ADD COLUMN status VARCHAR(32) DEFAULT 'received' NOT NULL"
                )
                logger.info("Migrated SQLite contact_inquiries schema by adding missing status column.")

    logger.info("Database schema verification and table creation complete.")
