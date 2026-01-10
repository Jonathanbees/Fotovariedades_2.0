# Arquitectura de Base de Datos - Fotovariedades

## Diagrama Entidad-Relación (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FOTOVARIEDADES DATABASE                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       USERS          │
├──────────────────────┤
│ id (PK)              │
│ email (UNIQUE)       │
│ full_name            │
│ password_hash        │
│ role (ENUM)          │──┐
│ is_active            │  │
│ created_at           │  │
│ updated_at           │  │
└──────────────────────┘  │
           │              │
           │ 1            │
           │              │
           │ N            │
           ↓              │
┌──────────────────────┐  │
│       ORDERS         │  │
├──────────────────────┤  │
│ id (UUID, PK)        │  │
│ user_id (FK)         │──┘
│ total_amount         │
│ status (ENUM)        │
│ wompi_reference      │
│ validation_code      │
│ created_at           │
│ redeemed_at          │
│ updated_at           │
└──────────────────────┘
           │
           │ 1
           │
           │ N
           ↓
┌──────────────────────┐         ┌──────────────────────┐
│    ORDER_ITEMS       │    N:1  │      PRODUCTS        │
├──────────────────────┤ ────────├──────────────────────┤
│ id (PK)              │         │ id (PK)              │
│ order_id (FK)        │         │ name                 │
│ product_id (FK)      │─────────│ description          │
│ quantity             │         │ price                │
│ price_at_purchase    │         │ stock_quantity       │
└──────────────────────┘         │ image_url            │
                                 │ category             │
           ┌─────────────────────│ is_active            │
           │ 1                   │ created_at           │
           │                     │ updated_at           │
           │ N                   └──────────────────────┘
           ↓
┌──────────────────────┐
│      PAYMENTS        │
├──────────────────────┤
│ id (PK)              │
│ order_id (FK)        │
│ wompi_transaction_id │
│ wompi_reference      │
│ amount               │
│ status (ENUM)        │
│ payment_method       │
│ payment_method_type  │
│ currency             │
│ card_last_four       │
│ card_brand           │
│ webhook_data (JSON)  │
│ error_message        │
│ created_at           │
│ updated_at           │
│ transaction_date     │
└──────────────────────┘
```

## Tablas Detalladas

### **users** - Usuarios del Sistema

Gestiona clientes, administradores y personal de validación.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO | ID único del usuario |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEX | Email del usuario |
| `full_name` | VARCHAR(255) | NOT NULL | Nombre completo |
| `password_hash` | VARCHAR(255) | NOT NULL | Contraseña hasheada con bcrypt |
| `role` | ENUM | NOT NULL, DEFAULT='customer' | Rol: admin, customer, staff |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT=true | Si el usuario está activo |
| `created_at` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updated_at` | TIMESTAMP | NULL | Fecha de última actualización |

**Índices:**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `email`
- INDEX: `role`, `is_active`

**Relaciones:**
- 1:N con `orders` (un usuario tiene muchas órdenes)

---

### **products** - Inventario de Productos

Catálogo de productos disponibles para la venta.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO | ID único del producto |
| `name` | VARCHAR(255) | NOT NULL, INDEX | Nombre del producto |
| `description` | TEXT | NULL | Descripción detallada |
| `price` | DECIMAL(10,2) | NOT NULL | Precio unitario (NUNCA float) |
| `stock_quantity` | INTEGER | NOT NULL, DEFAULT=0 | Cantidad disponible en stock |
| `image_url` | VARCHAR(500) | NULL | URL de imagen del producto |
| `category` | VARCHAR(100) | NULL, INDEX | Categoría del producto |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT=true | Si está visible en la tienda |
| `created_at` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updated_at` | TIMESTAMP | NULL | Fecha de última actualización |

**Índices:**
- PRIMARY KEY: `id`
- INDEX: `name`, `category`, `is_active`

**Relaciones:**
- 1:N con `order_items` (un producto puede estar en muchos items)

**Nota Importante:**
- **NUNCA uses FLOAT para dinero** - Usa DECIMAL para evitar errores de redondeo
- `is_active` permite ocultar productos sin eliminarlos (mantiene integridad histórica)

---

### **orders** - Pedidos (Corazón del Sistema)

Registra las compras y gestiona el flujo completo hasta la entrega.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | UUID | PRIMARY KEY | ID único (UUID para seguridad) |
| `user_id` | INTEGER | FOREIGN KEY, NOT NULL, INDEX | Referencia a `users.id` |
| `total_amount` | DECIMAL(10,2) | NOT NULL | Monto total del pedido |
| `status` | ENUM | NOT NULL, DEFAULT='pending' | Estado: pending, paid, failed, redeemed, cancelled |
| `wompi_reference` | VARCHAR(100) | UNIQUE, NULL, INDEX | Referencia para Wompi |
| `validation_code` | VARCHAR(50) | UNIQUE, NOT NULL, INDEX | Código del QR para validación |
| `created_at` | TIMESTAMP | NOT NULL, INDEX | Fecha de creación |
| `redeemed_at` | TIMESTAMP | NULL | Fecha de canje (cuando se entrega) |
| `updated_at` | TIMESTAMP | NULL | Fecha de última actualización |

**Estados del Pedido:**
- `pending`: Creado, esperando pago en Wompi
- `paid`: Pago confirmado, se envió email + PDF con QR
- `failed`: El pago falló o fue rechazado
- `redeemed`: QR escaneado, producto entregado
- `cancelled`: Pedido cancelado

**Índices:**
- PRIMARY KEY: `id`
- FOREIGN KEY: `user_id` → `users.id`
- UNIQUE INDEX: `wompi_reference`, `validation_code`
- INDEX: `status`, `created_at`

**Relaciones:**
- N:1 con `users` (muchos pedidos de un usuario)
- 1:N con `order_items` (un pedido tiene muchos items)
- 1:N con `payments` (un pedido puede tener múltiples intentos de pago)

**Decisión de Diseño:**
- Se usa UUID en lugar de INTEGER para evitar que se pueda adivinar cuántos pedidos hay

---

### **order_items** - Detalle de Productos en Pedidos

**¡CRÍTICO!** Esta tabla es fundamental para mantener integridad histórica.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO | ID único del item |
| `order_id` | UUID | FOREIGN KEY, NOT NULL, INDEX | Referencia a `orders.id` |
| `product_id` | INTEGER | FOREIGN KEY, NOT NULL, INDEX | Referencia a `products.id` |
| `quantity` | INTEGER | NOT NULL | Cantidad ordenada |
| `price_at_purchase` | DECIMAL(10,2) | NOT NULL | Precio al momento de la compra |

**Índices:**
- PRIMARY KEY: `id`
- FOREIGN KEY: `order_id` → `orders.id`
- FOREIGN KEY: `product_id` → `products.id`
- INDEX: `order_id`, `product_id`

**Relaciones:**
- N:1 con `orders` (muchos items de un pedido)
- N:1 con `products` (muchos items de un producto)

**¿Por qué `price_at_purchase`?**
- **Snapshot del precio**: Si mañana cambias el precio del producto, no afecta pedidos antiguos
- **Integridad histórica**: Mantienes el registro exacto de lo que se pagó
- **Auditoría**: Sabes exactamente cuánto se cobró en cada momento

---

### **payments** - Auditoría de Transacciones de Wompi

Registra todas las transacciones y respuestas de webhooks para trazabilidad completa.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO | ID único del pago |
| `order_id` | UUID | FOREIGN KEY, NOT NULL, INDEX | Referencia a `orders.id` |
| `wompi_transaction_id` | VARCHAR(100) | UNIQUE, NOT NULL, INDEX | ID de transacción de Wompi |
| `wompi_reference` | VARCHAR(100) | NULL, INDEX | Referencia de Wompi |
| `amount` | DECIMAL(10,2) | NOT NULL | Monto del pago |
| `status` | ENUM | NOT NULL, INDEX | PENDING, APPROVED, DECLINED, VOIDED, ERROR |
| `payment_method` | ENUM | NULL | CARD, NEQUI, PSE, BANCOLOMBIA_TRANSFER, etc. |
| `payment_method_type` | VARCHAR(50) | NULL | Tipo específico del método (CREDIT, DEBIT) |
| `currency` | VARCHAR(3) | NOT NULL, DEFAULT='COP' | Moneda del pago |
| `card_last_four` | VARCHAR(4) | NULL | Últimos 4 dígitos de tarjeta |
| `card_brand` | VARCHAR(50) | NULL | Marca de tarjeta (VISA, MASTERCARD) |
| `webhook_data` | TEXT | NULL | JSON completo del webhook |
| `error_message` | TEXT | NULL | Mensaje de error si falló |
| `created_at` | TIMESTAMP | NOT NULL, INDEX | Fecha de creación |
| `updated_at` | TIMESTAMP | NULL | Fecha de actualización |
| `transaction_date` | TIMESTAMP | NULL | Fecha según Wompi |

**Estados del Pago:**
- `PENDING`: Transacción iniciada pero no confirmada
- `APPROVED`: Pago aprobado exitosamente
- `DECLINED`: Pago rechazado
- `VOIDED`: Transacción anulada
- `ERROR`: Error en la transacción

**Índices:**
- PRIMARY KEY: `id`
- FOREIGN KEY: `order_id` → `orders.id`
- UNIQUE INDEX: `wompi_transaction_id`
- INDEX: `status`, `payment_method`, `created_at`

**Relaciones:**
- N:1 con `orders` (múltiples intentos de pago para un pedido)

**Importancia:**
- **Auditoría completa**: Registro de cada webhook recibido
- **Debugging**: Puedes revisar exactamente qué respondió Wompi
- **Conciliación**: Comparar con reportes de Wompi

---

## Flujo de Datos Completo

### Proceso de Compra

```
1. USUARIO SELECCIONA PRODUCTOS
   ↓
2. CHECKOUT: Se crea ORDER (status='pending')
   - Se genera validation_code único
   - Se genera wompi_reference
   - Se crean ORDER_ITEMS con price_at_purchase (snapshot)
   ↓
3. REDIRECCIÓN A WOMPI
   - Usuario paga en la pasarela
   ↓
4. WEBHOOK DE WOMPI
   - Se crea registro en PAYMENTS
   - Si status='APPROVED':
     * ORDER.status = 'paid'
     * Se resta stock en PRODUCTS
     * Se envía email con PDF + QR
   ↓
5. USUARIO VA A LA TIENDA
   - Muestra QR
   ↓
6. STAFF ESCANEA QR
   - Valida validation_code
   - Verifica ORDER.status = 'paid'
   - Cambia a ORDER.status = 'redeemed'
   - Registra ORDER.redeemed_at
   ↓
7. PRODUCTO ENTREGADO
```

### Control de Concurrencia

**Problema:** Dos personas compran el último producto al mismo tiempo.

**Solución:** Transacción atómica en PostgreSQL

```sql
-- MAL (Race Condition)
SELECT stock_quantity FROM products WHERE id = 123;  -- Lee: 1
-- Otro usuario también lee: 1
UPDATE products SET stock_quantity = 0 WHERE id = 123;  -- ¡Se vende 2 veces!

-- BIEN (Atómico)
UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 123 AND stock_quantity > 0
RETURNING stock_quantity;
-- Si stock llega a 0, la segunda consulta falla
```

En SQLAlchemy:

```python
from sqlalchemy import update
from sqlalchemy.exc import IntegrityError

# Restar stock de forma segura
stmt = (
    update(Product)
    .where(Product.id == product_id)
    .where(Product.stock_quantity >= quantity)
    .values(stock_quantity=Product.stock_quantity - quantity)
    .returning(Product.stock_quantity)
)

result = db.execute(stmt)
new_stock = result.scalar_one_or_none()

if new_stock is None:
    raise ValueError("Stock insuficiente")
```

## Consideraciones de Performance

### Índices Estratégicos

1. **Búsqueda frecuente:**
   - `users.email` (login)
   - `orders.validation_code` (escaneo QR)
   - `orders.wompi_reference` (webhooks)

2. **Filtros comunes:**
   - `orders.status` (dashboard admin)
   - `orders.created_at` (métricas por fecha)
   - `products.is_active` (catálogo)

3. **Foreign Keys:**
   - `order_items.order_id`
   - `order_items.product_id`
   - `payments.order_id`

### Queries Optimizadas

```python
# ❌ N+1 Query Problem
orders = db.query(Order).all()
for order in orders:
    print(order.user.email)  # Query por cada orden

# Eager Loading
from sqlalchemy.orm import joinedload

orders = db.query(Order).options(
    joinedload(Order.user),
    joinedload(Order.items).joinedload(OrderItem.product)
).all()
```

## Migraciones con Alembic

### Crear la Base de Datos Completa

```bash
# 1. Crear migración inicial
docker-compose exec backend uv run alembic revision --autogenerate -m "initial database schema"

# 2. Aplicar migración
docker-compose exec backend uv run alembic upgrade head

# 3. Verificar en pgAdmin
# http://localhost:8080
# Servers → Fotovariedades → Databases → fotovariedades_db → Schemas → public → Tables
```

### Agregar Datos de Prueba

```sql
-- Usuario admin
INSERT INTO users (email, full_name, password_hash, role, is_active) 
VALUES ('admin@fotovariedades.com', 'Administrador', '$2b$12$...', 'admin', true);

-- Producto de prueba
INSERT INTO products (name, description, price, stock_quantity, category, is_active)
VALUES ('Resma de Papel A4', 'Resma de 500 hojas', 15000.00, 50, 'Papelería', true);
```

## Decisiones de Diseño

**UUID para orders**: Seguridad (no se pueden adivinar IDs)  
**DECIMAL para dinero**: Precisión (no float)  
**price_at_purchase**: Integridad histórica  
**is_active en products**: Soft delete  
**Tabla payments**: Auditoría completa de Wompi  
**validation_code**: Sistema QR seguro  
**Enums para estados**: Validación a nivel de DB  
**Índices estratégicos**: Performance optimizada  