# Frontend - Comfama Automatización

Este es el frontend del sistema de automatización para Comfama, desarrollado con Next.js, React, TypeScript, TailwindCSS y Vue.js.

## Características

- ⚡ Next.js 14 con App Router
- 🎨 TailwindCSS para estilos
- 📱 Diseño responsive
- 🔧 TypeScript para type safety
- 🎯 Componentes reutilizables
- 📊 Dashboard interactivo
- 🚀 Despliegue automático en Vercel

## Instalación

1. Instalar dependencias:

```bash
npm i
```

2. Configurar variables de entorno:

```bash
cp env.local.example .env.local
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en modo producción
- `npm run lint` - Ejecutar linter
- `npm run lint:fix` - Corregir errores de linting automáticamente
- `npm run type-check` - Verificar tipos de TypeScript
- `npm run vercel-build` - Build específico para Vercel

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── globals.css      # Estilos globales
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Página principal
│   ├── components/          # Componentes React
│   │   ├── Header.tsx      # Header de la aplicación
│   │   ├── Sidebar.tsx      # Sidebar de navegación
│   │   └── AutomationDashboard.tsx # Dashboard principal
│   └── lib/                 # Utilidades y helpers
├── public/                  # Archivos estáticos
├── package.json            # Dependencias
├── tailwind.config.js      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── next.config.js          # Configuración de Next.js
```

## Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Superset de JavaScript
- **TailwindCSS** - Framework de CSS
- **Lucide React** - Iconos
- **Axios** - Cliente HTTP

## Despliegue en Vercel

### Configuración Automática

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Configura las variables de entorno en el dashboard de Vercel

### Variables de Entorno Requeridas

```bash
NEXT_PUBLIC_API_URL=https://your-firebase-functions-url.com
NEXT_PUBLIC_APP_NAME=Comfama Automatización
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Despliegue Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

### Configuración de Dominio

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a Settings > Domains
3. Agrega tu dominio personalizado
4. Configura los registros DNS según las instrucciones

### Monitoreo y Analytics

- **Vercel Analytics**: Habilitado automáticamente
- **Core Web Vitals**: Monitoreo de rendimiento
- **Deploy Previews**: Preview automático en cada PR
