# Comandos de Utilidad - Fotovariedades

Guía de referencia rápida con todos los comandos útiles para el desarrollo y mantenimiento del proyecto.

## Docker & Docker Compose

### Operaciones Básicas

```bash
# Levantar todos los servicios
docker-compose up -d

# Levantar con logs visibles
docker-compose up

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Ver estado de los contenedores
docker-compose ps

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### Build y Rebuild

```bash
# Construir imágenes
docker-compose build

# Construir sin caché (útil cuando hay problemas)
docker-compose build --no-cache

# Construir un servicio específico
docker-compose build backend
docker-compose build frontend

# Reconstruir y levantar
docker-compose up -d --build
```

### Limpieza y Mantenimiento

```bash
# Detener todo y limpiar volúmenes y contenedores huérfanos
docker-compose down --volumes --remove-orphans

# Ver volúmenes creados
docker volume ls

# Ver espacio usado por Docker
docker system df -v

# Inspeccionar volúmenes específicos
docker volume inspect postgres_data
docker volume inspect pgadmin_data

# Limpiar recursos no utilizados
docker system prune -a --volumes
```

### Acceso a Contenedores

```bash
# Ejecutar comando en un contenedor
docker-compose exec backend [comando]
docker-compose exec frontend [comando]

# Acceder a shell del contenedor
docker-compose exec backend bash
docker-compose exec frontend sh
```

## Python & uv (Backend)

### Gestión de Paquetes

```bash
# Agregar una biblioteca
uv add [nombre-paquete]

# Instalar/sincronizar dependencias
docker-compose exec backend uv sync

# Actualizar dependencias
docker-compose exec backend uv lock --upgrade

# Remover un paquete
uv remove [nombre-paquete]
```

### Desarrollo Local

```bash
# Correr FastAPI en modo desarrollo (local, sin Docker)
uv run fastapi dev

# Con recarga automática
uv run fastapi dev --reload
```

### Linting

```bash
# Ejecutar pylint desde el directorio actual
pylint .

# Pylint en archivos específicos
pylint app/
pylint app/models/
```

## 🗄️ Alembic (Migraciones de Base de Datos)

### Crear Migraciones

```bash
# Crear migración automática (detecta cambios en modelos)
docker-compose exec backend uv run alembic revision --autogenerate -m "descripción del cambio"

# Crear migración vacía (manual)
docker-compose exec backend uv run alembic revision -m "descripción"
```

### Aplicar Migraciones

```bash
# Aplicar todas las migraciones pendientes
docker-compose exec backend uv run alembic upgrade head

# Aplicar hasta una migración específica
docker-compose exec backend uv run alembic upgrade [revision_id]
```

### Revertir Migraciones

```bash
# Revertir la última migración
docker-compose exec backend uv run alembic downgrade -1

# Revertir hasta una migración específica
docker-compose exec backend uv run alembic downgrade [revision_id]

# Revertir todas las migraciones
docker-compose exec backend uv run alembic downgrade base
```

### Información de Migraciones

```bash
# Ver historial de migraciones
docker-compose exec backend uv run alembic history

# Ver migración actual aplicada
docker-compose exec backend uv run alembic current

# Ver migraciones pendientes
docker-compose exec backend uv run alembic heads
```

## PostgreSQL

### Acceso Directo

```bash
# Entrar a psql (terminal de PostgreSQL)
docker-compose exec postgres psql -U fotovariedades -d fotovariedades_db
```

### Comandos Útiles en psql

```sql
-- Listar todas las bases de datos
\l

-- Conectar a una base de datos
\c fotovariedades_db

-- Listar todas las tablas
\dt

-- Describir una tabla
\d nombre_tabla

-- Ver estructura de tabla con detalles
\d+ nombre_tabla

-- Listar usuarios
\du

-- Salir de psql
\q
```

### Backup y Restore

```bash
# Crear backup de la base de datos
docker-compose exec postgres pg_dump -U fotovariedades fotovariedades_db > backup.sql

# Crear backup con fecha
docker-compose exec postgres pg_dump -U fotovariedades fotovariedades_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar desde backup
docker-compose exec -T postgres psql -U fotovariedades -d fotovariedades_db < backup.sql
```

## pgAdmin

### Acceso
- URL: http://localhost:8080
- Email: admin@admin.com
- Password: root

### Configuración de Conexión

Al crear una nueva conexión al servidor PostgreSQL en pgAdmin:

```
Host: postgres
Port: 5432
Database: fotovariedades_db
Username: fotovariedades
Password: fotovariedades123
```

### Navegación en pgAdmin

Para ver las tablas creadas:
```
Servers → Fotovariedades → Databases → fotovariedades_db → Schemas → public → Tables
```

## Frontend (Next.js)

### NPM/YARN/PNPM

```bash
# Instalar dependencias (dentro del contenedor)
docker-compose exec frontend npm install

# Agregar paquete
docker-compose exec frontend npm install [paquete]

# Agregar paquete de desarrollo
docker-compose exec frontend npm install -D [paquete]

# Eliminar paquete
docker-compose exec frontend npm uninstall [paquete]
```

### Desarrollo Local (sin Docker)

```bash
cd frontend

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev

# Build de producción
npm run build

# Correr build de producción
npm start

# Linting
npm run lint
```

## Debugging

### Ver Logs Específicos

```bash
# Backend
docker-compose logs -f backend

# Frontend
docker-compose logs -f frontend

# PostgreSQL
docker-compose logs -f postgres

# Últimas 100 líneas
docker-compose logs --tail=100 backend
```

### Reiniciar Servicios

```bash
# Reiniciar un servicio específico
docker-compose restart backend
docker-compose restart frontend

# Reiniciar todos los servicios
docker-compose restart
```

### Verificar Salud del Sistema

```bash
# Ver recursos utilizados
docker stats

# Ver procesos en un contenedor
docker-compose exec backend ps aux
```

## Git (Flujo de Trabajo)

```bash
# Ver estado
git status

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Agregar cambios
git add .

# Commit
git commit -m "descripción del cambio"

# Push
git push origin feature/nueva-funcionalidad

# Pull del main
git pull origin main

# Merge
git merge main
```

## Tips y Trucos

### Limpiar Todo y Empezar de Nuevo

```bash
# Eliminar todo (contenedores, volúmenes, redes)
docker-compose down -v --remove-orphans

# Limpiar imágenes no utilizadas
docker image prune -a

# Rebuild completo
docker-compose build --no-cache
docker-compose up -d
```

### Ver Variables de Entorno

```bash
# En el backend
docker-compose exec backend env

# En el frontend
docker-compose exec frontend env
```

### Acceso Rápido a Servicios

```bash
# Backend API docs
curl http://localhost:8000/docs

# Health check backend
curl http://localhost:8000/health

# Frontend
curl http://localhost:3000
```

---

## Referencias

- [Docker Compose CLI](https://docs.docker.com/compose/reference/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
