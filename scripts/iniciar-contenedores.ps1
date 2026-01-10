# SETUP SIMPLIFICADO
Write-Host "Iniciando servicios..." -ForegroundColor Cyan
Set-Location "C:\Users\ASUS\Desktop\Fotovariedades"

# Crear archivos de configuración
if (-not (Test-Path "pgadmin")) { New-Item -ItemType Directory -Path "pgadmin" -Force | Out-Null }

# Crear servers.json
'{
  "Servers": {
    "1": {
      "Name": "Fotovariedades PostgreSQL",
      "Group": "Servers",
      "Host": "postgres",
      "Port": 5432,
      "MaintenanceDB": "fotovariedades_db",
      "Username": "fotovariedades",
      "SSLMode": "prefer",
      "PassFile": "/tmp/pgpassfile"
    }
  }
}' | Out-File -FilePath "pgadmin/servers.json" -Encoding UTF8

# Crear pgpass
'postgres:5432:fotovariedades_db:fotovariedades:fotovariedades123
postgres:5432:*:fotovariedades:fotovariedades123' | Out-File -FilePath "pgadmin/pgpass" -Encoding UTF8 -NoNewline

# Detener y limpiar contenedores anteriores
Write-Host "Limpiando contenedores anteriores..." -ForegroundColor Yellow
docker-compose down

# Reconstruir el backend (fuerza reconstrucción)
Write-Host "Reconstruyendo backend..." -ForegroundColor Yellow
docker-compose build --no-cache backend

# Levantar servicios
Write-Host "Levantando servicios..." -ForegroundColor Yellow
docker-compose up -d

# Esperar a que PostgreSQL esté listo
Write-Host "Esperando a PostgreSQL..." -ForegroundColor Yellow
$maxRetries = 30
for ($i = 1; $i -le $maxRetries; $i++) {
    $result = docker-compose exec postgres pg_isready -U fotovariedades -d fotovariedades_db 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "PostgreSQL listo!" -ForegroundColor Green
        break
    }
    Write-Host "Intento $i/$maxRetries..." -ForegroundColor Gray
    Start-Sleep -Seconds 2
}

# Verificar que el backend está corriendo
Write-Host "Verificando backend..." -ForegroundColor Yellow
$backendStatus = docker-compose ps backend --format json | ConvertFrom-Json
if ($backendStatus.State -ne "running") {
    Write-Host "ERROR: El backend no está corriendo" -ForegroundColor Red
    Write-Host "Logs del backend:" -ForegroundColor Yellow
    docker-compose logs backend
    exit 1
}

# Verificar conexión
Write-Host "Verificando conexion a BD..." -ForegroundColor Yellow
docker-compose exec backend python -c "from app.core.config import settings; print(settings.SYNC_DATABASE_URL)"

# Migraciones
Write-Host "Aplicando migraciones..." -ForegroundColor Yellow
docker-compose exec backend uv run alembic upgrade head

# Verificar tablas
Write-Host "Verificando tablas..." -ForegroundColor Green
docker-compose exec postgres psql -U fotovariedades -d fotovariedades_db -c "\dt"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "SETUP COMPLETO" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "pgAdmin:  http://localhost:8080 (admin@admin.com / 1234)" -ForegroundColor White
Write-Host "Docs:     http://localhost:8000/docs" -ForegroundColor White
Write-Host ""