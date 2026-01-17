"""
Configuración de la base de datos y sesión de SQLAlchemy
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

from app.core.config import settings

# Construcción de la URL de conexión a PostgreSQL
DATABASE_URL = (
    f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

# Crear engine de SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Verifica la conexión antes de usar
    pool_size=10,        # Tamaño del pool de conexiones
    max_overflow=20      # Conexiones adicionales si se necesitan
)

# Crear SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency para obtener una sesión de base de datos.
    Se usa con Depends() en los endpoints de FastAPI.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
