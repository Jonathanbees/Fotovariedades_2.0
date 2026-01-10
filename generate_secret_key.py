#!/usr/bin/env python3
"""
Script para generar una SECRET_KEY segura para JWT
Uso: python generate_secret_key.py
"""

import secrets

def generate_secret_key(length=64):
    """Genera una clave secreta segura"""
    # Opción 1: URL-safe (recomendado para JWT)
    url_safe_key = secrets.token_urlsafe(length)
    return url_safe_key

if __name__ == "__main__":
    url_safe = generate_secret_key()
    print(f"SECRET_KEY={url_safe}")
