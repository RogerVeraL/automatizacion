# Variables de Entorno para Vercel

## Variables Requeridas

Configura estas variables en el dashboard de Vercel:

### Producción

```
NEXT_PUBLIC_API_URL=https://your-firebase-functions-url.com
NEXT_PUBLIC_APP_NAME=Comfama Automatización
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Desarrollo

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Comfama Automatización (Dev)
NEXT_PUBLIC_APP_VERSION=1.0.0-dev
```

## Cómo configurar en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a Settings > Environment Variables
3. Agrega las variables necesarias
4. Asegúrate de que estén habilitadas para Production, Preview y Development

## Variables Opcionales

```
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```
