# Backend - Fotovariedades API

API REST construida con FastAPI para gestión de productos, inventario, órdenes y usuarios.

## Stack Tecnológico

- **Framework**: FastAPI 0.115+
- **Base de Datos**: PostgreSQL 15+
- **ORM**: SQLAlchemy 2.0+
- **Migraciones**: Alembic
- **Gestor de Paquetes**: uv
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: Pydantic V2

## Estructura del Proyecto

```
backend/
├── alembic/                # Migraciones de base de datos
│   ├── versions/          # Archivos de migración
│   └── env.py            # Configuración de Alembic
├── app/
│   ├── core/             # Configuración central
│   │   ├── config.py     # Variables de entorno y settings
│   │   ├── security.py   # Utilidades de seguridad (hashing, JWT)
│   │   ├── logging.py    # Configuración de logs
│   │   └── token_service.py  # Servicio de tokens
│   ├── database/         # Configuración de DB y sesiones
│   ├── models/           # Modelos SQLAlchemy
│   │   ├── users.py
│   │   ├── products.py
│   │   └── orders.py
│   ├── schemas/          # Schemas Pydantic (validación/serialización)
│   ├── routers/          # Endpoints de la API
│   ├── services/         # Lógica de negocio
│   └── internal/         # Utilidades internas
├── tests/                # Tests unitarios y de integración
├── uploads/              # Archivos subidos (imágenes, etc.)
├── alembic.ini           # Configuración de Alembic
├── main.py               # Punto de entrada de la aplicación
├── pyproject.toml        # Dependencias y configuración de Python
└── dockerfile            # Imagen Docker del backend
```

## Configuración

```
## Desarrollo

### Con Docker (Recomendado)

```bash
# Levantar el backend con hot-reload
docker-compose up backend

# Ver logs
docker-compose logs -f backend

# Instalar nuevas dependencias
docker-compose exec backend uv add nombre-paquete

# Sincronizar dependencias
docker-compose exec backend uv sync
```

### Local (sin Docker)

```bash
cd backend

# Instalar uv si no lo tienes
pip install uv

# Instalar dependencias
uv sync

# Correr en modo desarrollo
uv run fastapi dev main.py

# O con uvicorn directamente
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Base de Datos y Migraciones

### Workflow de Migraciones

```bash
# 1. Modificar los modelos en app/models/

# 2. Crear migración automática
docker-compose exec backend uv run alembic revision --autogenerate -m "descripción del cambio"

# 3. Revisar el archivo generado en alembic/versions/

# 4. Aplicar la migración
docker-compose exec backend uv run alembic upgrade head

# 5. Verificar en pgAdmin (http://localhost:8080)
#    Ruta: Servers → Fotovariedades → Databases → fotovariedades_db 
#          → Schemas → public → Tables
```

### Comandos Útiles

```bash
# Ver historial de migraciones
docker-compose exec backend uv run alembic history

# Ver migración actual
docker-compose exec backend uv run alembic current

# Revertir última migración
docker-compose exec backend uv run alembic downgrade -1

# Revertir todas las migraciones
docker-compose exec backend uv run alembic downgrade base
```

## API Endpoints

Una vez corriendo el servidor, accede a:

- **Documentación interactiva (Swagger)**: http://localhost:8000/docs
- **Documentación alternativa (ReDoc)**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

### Endpoints Principales

```
GET     /                      # Health check
GET     /api/v1/products       # Listar productos
POST    /api/v1/products       # Crear producto
GET     /api/v1/products/{id}  # Obtener producto
PUT     /api/v1/products/{id}  # Actualizar producto
DELETE  /api/v1/products/{id}  # Eliminar producto

POST    /api/v1/auth/login     # Login
POST    /api/v1/auth/register  # Registro
GET     /api/v1/users/me       # Perfil del usuario actual
```

## Testing

```bash
# Correr todos los tests
docker-compose exec backend uv run pytest

# Con cobertura
docker-compose exec backend uv run pytest --cov=app

# Tests específicos
docker-compose exec backend uv run pytest tests/test_products.py

# Modo verbose
docker-compose exec backend uv run pytest -v
```

## Linting y Formateo

```bash
# Pylint
docker-compose exec backend pylint app/

# Black (formateo)
docker-compose exec backend black app/

# isort (organizar imports)
docker-compose exec backend isort app/
```

## Modelos Principales

> **📖 Para documentación detallada de la base de datos, ver [docs/DATABASE.md](../docs/DATABASE.md)**

### User
```python
- id: int (PK)
- email: str (unique, indexed)
- full_name: str
- password_hash: str (bcrypt)
- role: UserRole (admin, customer, staff)
- is_active: bool
- created_at: datetime
- updated_at: datetime
# Relationships: orders[]
```

### Product
```python
- id: int (PK)
- name: str (indexed)
- description: text
- price: Decimal(10,2)  # NUNCA float para dinero
- stock_quantity: int
- image_url: str
- category: str (indexed)
- is_active: bool
- created_at: datetime
- updated_at: datetime
# Relationships: order_items[]
```

### Order
```python
- id: UUID (PK)  # UUID para seguridad
- user_id: int (FK → users.id)
- total_amount: Decimal(10,2)
- status: OrderStatus (pending, paid, failed, redeemed, cancelled)
- wompi_reference: str (unique, indexed)
- validation_code: str (unique, indexed)  # Para QR
- created_at: datetime
- redeemed_at: datetime
- updated_at: datetime
# Relationships: user, items[], payments[]
```

### OrderItem
```python
- id: int (PK)
- order_id: UUID (FK → orders.id)
- product_id: int (FK → products.id)
- quantity: int
- price_at_purchase: Decimal(10,2)  # Snapshot histórico
# Relationships: order, product
```

### Payment
```python
- id: int (PK)
- order_id: UUID (FK → orders.id)
- wompi_transaction_id: str (unique, indexed)
- wompi_reference: str (indexed)
- amount: Decimal(10,2)
- status: PaymentStatus (PENDING, APPROVED, DECLINED, VOIDED, ERROR)
- payment_method: PaymentMethod (CARD, NEQUI, PSE, etc)
- payment_method_type: str
- currency: str (default: COP)
- card_last_four: str
- card_brand: str
- webhook_data: text (JSON)
- error_message: text
- created_at: datetime
- updated_at: datetime
- transaction_date: datetime
# Relationships: order
```

## Seguridad

> **Para documentación completa del sistema de permisos, ver [docs/PERMISSIONS.md](../docs/PERMISSIONS.md)**

### Sistema de Roles (RBAC)

- **CUSTOMER**: Usuarios que compran productos
- **STAFF**: Personal que valida QR codes
- **ADMIN**: Acceso total al sistema

### Autenticación JWT

El sistema usa tokens JWT para autenticación:

1. **Login**: `POST /api/v1/auth/login` → Retorna access_token
2. **Uso**: Incluir en headers: `Authorization: Bearer {access_token}`
3. **Validación**: Middleware valida token en rutas protegidas

### Hashing de Contraseñas

- Bcrypt para hashing seguro
- Salt automático
- Verificación en tiempo constante

### Protección de Rutas

```python
# Ejemplo de rutas protegidas por rol
@router.get("/admin/dashboard")  # Solo ADMIN
@router.post("/staff/redeem")    # STAFF o ADMIN
@router.get("/orders/me")        # Cualquier usuario autenticado
```

## Debugging

```bash
# Ver logs en tiempo real
docker-compose logs -f backend

# Acceder al contenedor
docker-compose exec backend bash

# Ver variables de entorno
docker-compose exec backend env

# Inspeccionar base de datos
docker-compose exec postgres psql -U fotovariedades -d fotovariedades_db
```

## Gestión de Dependencias

### Agregar Paquete

```bash
# Producción
docker-compose exec backend uv add paquete

# Desarrollo
docker-compose exec backend uv add --dev paquete
```

### Actualizar Dependencias

```bash
# Actualizar todo
docker-compose exec backend uv lock --upgrade

# Sincronizar con lockfile
docker-compose exec backend uv sync
```

## Referencias Útiles

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy 2.0 Documentation](https://docs.sqlalchemy.org/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [Pydantic V2 Documentation](https://docs.pydantic.dev/)
- [uv Documentation](https://github.com/astral-sh/uv)

---

Para comandos adicionales de Docker, PostgreSQL y utilidades generales, consulta [docs/COMMANDS.md](../docs/COMMANDS.md)