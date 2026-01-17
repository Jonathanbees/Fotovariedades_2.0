"""
Aplicación principal FastAPI
Configuración de la API con OAuth2 y rutas
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth_router

# Crear aplicación FastAPI
app = FastAPI(
    title="Fotovariedades API",
    description="API para gestión de tienda de fotografía y papelería",
    version="1.0.0",
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth_router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    """Endpoint raíz de la API"""
    return {
        "message": "Fotovariedades API",
        "version": "1.0.0",
        "docs": f"{settings.API_V1_PREFIX}/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint para verificar que la API está funcionando"""
    return {"status": "healthy"}
