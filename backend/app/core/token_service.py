"""
Service for creating and verifying short-lived JWTs for temporary access.
"""

import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt

from .config import settings

logger = logging.getLogger(__name__)


class TempTokenService:
    """Handles creation and verification of temporary access tokens."""

    def __init__(self):
        self.secret_key = settings.SECRET_KEY
        self.algorithm = settings.ALGORITHM

    def create_temp_access_token(
        self, user_id: str, expires_delta: timedelta = timedelta(minutes=5)
    ) -> str:
        """Creates a short-lived JWT for temporary access (e.g., file downloads)."""
        to_encode = {
            "sub": str(user_id),
            "exp": datetime.now(timezone.utc) + expires_delta,
            "type": "temp_access",
        }
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def verify_temp_token(self, token: str) -> Optional[str]:
        """Verifies a temporary token and returns the user ID (sub)."""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            # Check token type
            if payload.get("type") != "temp_access":
                logger.warning("Invalid token type for temporary access.")
                return None

            user_id = payload.get("sub")
            if user_id is None:
                logger.warning("Token payload missing 'sub' (user ID).")
                return None

            return user_id
        except JWTError as e:
            logger.error(f"Temporary token could not be validated: {e}")
            return None
