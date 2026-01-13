# Frontend - Fotovariedades

Aplicación web moderna construida con Next.js 14+ para el e-commerce y panel administrativo de Fotovariedades.

## 🏗️ Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Fuentes**: Geist Font Family
- **Gestión de Estado**: React Context / Zustand (si aplica)
- **HTTP Client**: Fetch API / Axios

## Estructura del Proyecto

```
frontend/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx          # Página de inicio
│   ├── (admin)/          # Rutas de administración
│   │   └── ...           # Dashboard, productos, órdenes, etc.
│   └── (shop)/           # Rutas de la tienda
│       └── ...           # Catálogo, carrito, checkout, etc.
├── modules/              # Módulos de funcionalidad
│   ├── cart/            # Lógica del carrito de compras
│   ├── orders/          # Gestión de órdenes
│   └── products/        # Gestión de productos
├── shared/              # Componentes y utilidades compartidas
│   ├── components/      # Componentes reutilizables
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Funciones utilitarias
│   └── types/          # Tipos TypeScript compartidos
├── public/             # Archivos estáticos
│   ├── images/        # Imágenes
│   └── icons/         # Iconos
├── next.config.ts     # Configuración de Next.js
├── tsconfig.json      # Configuración de TypeScript
├── tailwind.config.ts # Configuración de Tailwind
├── postcss.config.mjs # Configuración de PostCSS
├── proxy.ts           # Configuración de proxy para API
└── dockerfile         # Imagen Docker del frontend
```

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` (para desarrollo local):

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Otras configuraciones
NEXT_PUBLIC_APP_NAME=Fotovariedades
NEXT_PUBLIC_APP_VERSION=2.0
```

Para Docker, las variables se configuran en `docker-compose.yml`.

### Proxy de API

El archivo `proxy.ts` configura el enrutamiento de peticiones al backend:

```typescript
// Todas las peticiones a /api/* se redirigen al backend
'/api/*' -> 'http://backend:8000/*'
```

## Desarrollo

### Con Docker (Recomendado)

```bash
# Levantar el frontend con hot-reload
docker-compose up frontend

# Ver logs
docker-compose logs -f frontend

# Instalar nuevas dependencias
docker-compose exec frontend npm install paquete

# Acceder al contenedor
docker-compose exec frontend sh
```

El frontend estará disponible en: http://localhost:3000

### Local (sin Docker)

```bash
cd frontend

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install

# Correr en modo desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev
```

## Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint

# Formateo de código
npm run format

# Type checking
npm run type-check
```

## Estructura de Rutas

### Rutas Públicas (Shop)

```
/                          # Página de inicio
/shop                      # Catálogo de productos
/shop/[id]                # Detalle de producto
/cart                     # Carrito de compras
/checkout                 # Proceso de pago
/orders                   # Mis órdenes (requiere auth)
/auth/login               # Iniciar sesión
/auth/register            # Registro
```

### Rutas de Administración

```
/admin                    # Dashboard administrativo
/admin/products           # Gestión de productos
/admin/products/new       # Crear producto
/admin/products/[id]/edit # Editar producto
/admin/orders             # Gestión de órdenes
/admin/users              # Gestión de usuarios
/admin/inventory          # Control de inventario
```

## Módulos Principales

### Cart (Carrito)
- Agregar/remover productos
- Actualizar cantidades
- Calcular totales
- Persistencia en localStorage

### Orders (Órdenes)
- Crear nueva orden
- Ver historial de órdenes
- Seguimiento de estado
- Facturación con QR

### Products (Productos)
- Catálogo con filtros
- Búsqueda
- Gestión CRUD (admin)
- Carga de imágenes

## Componentes Compartidos

```typescript
shared/
├── components/
│   ├── Button/          # Botones reutilizables
│   ├── Card/            # Tarjetas de contenido
│   ├── Modal/           # Modales
│   ├── Input/           # Campos de formulario
│   ├── Navbar/          # Barra de navegación
│   ├── Footer/          # Pie de página
│   └── Loading/         # Indicadores de carga
├── hooks/
│   ├── useAuth.ts       # Hook de autenticación
│   ├── useCart.ts       # Hook del carrito
│   └── useApi.ts        # Hook para peticiones API
└── utils/
    ├── api.ts           # Cliente HTTP
    ├── formatters.ts    # Formateo de datos
    └── validators.ts    # Validaciones
```

## Autenticación

### Flow de Autenticación

1. Usuario hace login → `POST /api/v1/auth/login`
2. Backend retorna JWT token
3. Token se guarda en localStorage
4. Peticiones subsecuentes incluyen token en headers
5. Middleware protege rutas que requieren auth

```typescript
// Ejemplo de uso
const { user, login, logout } = useAuth();

// Login
await login(email, password);

// Logout
logout();

// Verificar si está autenticado
if (user) {
  // Usuario autenticado
}
```

## Integración con Backend

### Cliente API

```typescript
// shared/utils/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
  // ... más métodos
};
```

### Ejemplo de Uso

```typescript
// modules/products/services/productService.ts
import { api } from '@/shared/utils/api';

export const getProducts = async () => {
  return api.get('/api/v1/products');
};

export const getProduct = async (id: string) => {
  return api.get(`/api/v1/products/${id}`);
};
```

## Testing

```bash
# Correr tests (cuando estén configurados)
npm run test

# Tests en modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

## Responsive Design

El diseño es responsive por defecto usando Tailwind:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 columna, Tablet: 2 columnas, Desktop: 3 columnas */}
</div>
```

## Build y Deployment

### Build de Producción

```bash
# Build local
npm run build

# Probar build localmente
npm start
```

### Con Docker

```bash
# Build de imagen
docker build -t fotovariedades-frontend .

# Correr contenedor
docker run -p 3000:3000 fotovariedades-frontend
```

## Debugging

```bash
# Ver logs del contenedor
docker-compose logs -f frontend

# Inspeccionar el contenedor
docker-compose exec frontend sh

# Ver variables de entorno
docker-compose exec frontend env

# Limpiar caché de Next.js
rm -rf .next
npm run build
```

## Performance

### Optimizaciones Implementadas

- **Image Optimization**: Uso de `next/image` para imágenes optimizadas
- **Code Splitting**: Automático con Next.js App Router
- **Lazy Loading**: Componentes y rutas cargadas bajo demanda
- **Font Optimization**: Geist font optimizada con `next/font`

## Referencias Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [App Router Guide](https://nextjs.org/docs/app)

---

Para comandos adicionales de Docker, npm y utilidades generales, consulta [docs/COMMANDS.md](../docs/COMMANDS.md)
