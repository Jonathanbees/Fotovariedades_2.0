# Fotovariedades 2.0

> Sistema web para gestión de ventas, inventario y punto de venta digital para la papelería Fotovariedades

## Descripción del Proyecto

La papelería Fotovariedades, con 10 años de trayectoria, busca expandir su presencia digital y ampliar su alcance de ventas mediante una plataforma web moderna que integre:

- **E-commerce**: Catálogo de productos y servicios con pasarela de pago
- **Sistema de inventario**: Control de stock en tiempo real
- **Generación de facturas**: Facturas digitales con códigos QR para validación
- **Panel administrativo**: Gestión completa del negocio

## Arquitectura

```
Fotovariedades/
├── backend/          # FastAPI + PostgreSQL + Alembic
├── frontend/         # Next.js 14+ (App Router) + TypeScript
├── docs/             # Documentación y comandos de utilidad
└── docker-compose.yml
```

### Stack Tecnológico

**Backend:**
- FastAPI (Python)
- PostgreSQL + pgAdmin
- Alembic (migraciones)
- uv (gestor de paquetes)

**Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS

**DevOps:**
- Docker & Docker Compose
- Hot-reload en desarrollo

## Quick Start

### Prerequisitos
- Docker y Docker Compose instalados
- Git

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/Jonathanbees/Fotovariedades_2.0.git
cd Fotovariedades_2.0

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Generar SECRET_KEY segura
python generate_secret_key.py

# 4. Levantar todos los servicios
docker-compose up -d

# 5. Verificar que todo está corriendo
docker-compose ps
```

### Acceso a los servicios

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **pgAdmin**: http://localhost:8080
  - Email: Ver `.env` (PGADMIN_DEFAULT_EMAIL)
  - Password: Ver `.env` (PGADMIN_DEFAULT_PASSWORD)

## Documentación

- [Backend - Documentación técnica](backend/README.md)
- [Frontend - Documentación técnica](frontend/README.md)
- [Base de Datos - Arquitectura y diseño](docs/DATABASE.md)
- [Sistema de Permisos - RBAC](docs/PERMISSIONS.md)
- [Comandos de utilidad](docs/COMMANDS.md)

## Objetivos del Proyecto

### Objetivo General
Proveer una plataforma digital completa para que Fotovariedades pueda ofrecer sus productos y servicios online.

### Objetivos Específicos

1. **Sistema de Punto de Venta**: Implementar pasarela de pago integrada para compra de productos y servicios
2. **Gestión de Inventario**: Sistema de administración con actualización automática según ventas
3. **Facturación Digital**: Generación de facturas con códigos QR para validación en punto de retiro

## Alcance

Ofrecer compra de productos de papelería y servicios locales a través de un sitio web, aumentando el alcance de ventas y la base de clientes del negocio Fotovariedades.

## Contribución

Para contribuir al proyecto, consulta la [guía de comandos útiles](docs/COMMANDS.md) y la documentación específica de cada módulo.

## Licencia

Ver archivo [LICENSE](LICENSE)