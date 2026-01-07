import os

from dotenv import load_dotenv

# Force reload of environment variables
load_dotenv(override=True)


class Settings:
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://username:password@localhost/dbname"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )

    def __init__(self):
        # Debug: print the actual DATABASE_URL being used
        print(f"[CONFIG DEBUG] DATABASE_URL loaded: {self.DATABASE_URL}")


settings = Settings()
