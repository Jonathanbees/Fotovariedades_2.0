import os
from typing import List

class Settings:
    """
    Configuración de la aplicación.
    Lee variables de entorno directamente (Docker las inyecta).
    """

    # ============================================
    # POSTGRESQL DATABASE
    # ============================================
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "fotovariedades")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "fotovariedades123")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "fotovariedades_db")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")

    # ============================================
    # BACKEND (FastAPI)
    # ============================================
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )
    API_V1_PREFIX: str = os.getenv("API_V1_PREFIX", "/api/v1")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"

    # ============================================
    # WOMPI (Pasarela de Pagos)
    # ============================================
    WOMPI_PUBLIC_KEY: str = os.getenv("WOMPI_PUBLIC_KEY", "pub_test_xxxx")
    WOMPI_PRIVATE_KEY: str = os.getenv("WOMPI_PRIVATE_KEY", "prv_test_xxxx")
    WOMPI_EVENTS_SECRET: str = os.getenv("WOMPI_EVENTS_SECRET", "test_events_secret")
    WOMPI_ENVIRONMENT: str = os.getenv("WOMPI_ENVIRONMENT", "test")
    WOMPI_API_URL: str = os.getenv(
        "WOMPI_API_URL", "https://sandbox.wompi.co/v1"
    )

    # ============================================
    # EMAIL (SMTP)
    # ============================================
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_FROM: str = os.getenv("SMTP_FROM", "noreply@fotovariedades.com")

    # ============================================
    # STORAGE (Uploads)
    # ============================================
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "/app/uploads")
    MAX_UPLOAD_SIZE: int = int(os.getenv("MAX_UPLOAD_SIZE", "10485760"))  # 10MB
    ALLOWED_EXTENSIONS: List[str] = os.getenv(
        "ALLOWED_EXTENSIONS", "jpg,jpeg,png,gif,webp"
    ).split(",")

    # ============================================
    # CORS & TIMEZONE
    # ============================================
    CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:3000,http://localhost:8000"
    ).split(",")
    TIMEZONE: str = os.getenv("TIMEZONE", "America/Bogota")

    # ============================================
    # PROPIEDADES COMPUTADAS
    # ============================================
    @property
    def DATABASE_URL(self) -> str:
        """
        Construye la URL de conexión a PostgreSQL dinámicamente.
        Usa asyncpg para soporte asíncrono de SQLAlchemy.
        """
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    @property
    def SYNC_DATABASE_URL(self) -> str:
        """
        URL síncrona para Alembic migrations (usa psycopg2).
        """
        return (
            f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    @property
    def is_production(self) -> bool:
        """Verifica si está en modo producción."""
        return not self.DEBUG

    @property
    def is_wompi_production(self) -> bool:
        """Verifica si Wompi está en modo producción."""
        return self.WOMPI_ENVIRONMENT == "production"

    def __init__(self):
        # Debug: print configuration on startup
        if self.DEBUG:
            print("\n" + "=" * 60)
            print("🚀 FOTOVARIEDADES - CONFIGURACIÓN CARGADA")
            print("=" * 60)
            print(f"📊 Database: {self.POSTGRES_USER}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}")
            print(f"🔐 Secret Key: {'*' * len(self.SECRET_KEY[:8])}... (configurada)")
            print(f"💳 Wompi: {self.WOMPI_ENVIRONMENT} mode")
            print(f"📧 SMTP: {self.SMTP_HOST}:{self.SMTP_PORT}")
            print(f"🌍 CORS Origins: {', '.join(self.CORS_ORIGINS)}")
            print(f"🐛 Debug Mode: {self.DEBUG}")
            print(f"📁 Upload Dir: {self.UPLOAD_DIR}")
            print("=" * 60 + "\n")


# Instancia global de configuración
settings = Settings()