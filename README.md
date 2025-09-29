# Comfama Automatización

Sistema de automatización para Comfama desarrollado con tecnologías modernas.

## 🚀 Tecnologías

### Backend

- **Python 3.11+**
- **FastAPI** - Framework web moderno y rápido
- **SQLAlchemy** - ORM para base de datos
- **PostgreSQL** - Base de datos principal 
- **Alembic** - Migraciones de base de datos

### Frontend

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Superset de JavaScript
- **TailwindCSS** - Framework de CSS
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

## 📁 Estructura del Proyecto

```
automatizacion/
├── backend/                 # API Backend (Python/FastAPI)
│   ├── main.py             # Aplicación principal
│   ├── requirements.txt    # Dependencias Python
│   ├── env.example        # Variables de entorno
│   └── README.md          # Documentación backend
├── frontend/               # Frontend (Next.js/React)
│   ├── src/               # Código fuente
│   ├── package.json      # Dependencias Node.js
│   └── README.md         # Documentación frontend
└── README.md             # Este archivo
```

## 🛠️ Instalación y Configuración

### Backend

1. Navegar a la carpeta backend:

```bash
cd backend
```

2. Crear entorno virtual:

```bash
python -m venv venv
```

3. Activar entorno virtual:

```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Instalar dependencias:

```bash
pip install -r requirements.txt
```

5. Configurar variables de entorno:

```bash
copy env.example .env
```

6. Ejecutar la aplicación:

```bash
python main.py
```

El backend estará disponible en: http://localhost:8000

### Frontend

1. Navegar a la carpeta frontend:

```bash
cd frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno de Firebase:

Crea un archivo .env.local en la raíz de frontend/ con el siguiente contenido (usa tus valores reales de Firebase):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

El frontend estará disponible en: http://localhost:3000

## 📚 Documentación

- **Backend API**: http://localhost:8000/docs (Swagger UI)
- **Backend ReDoc**: http://localhost:8000/redoc

## 🎯 Características Principales

- ✅ Dashboard interactivo para gestión de automatizaciones
- ✅ API RESTful con documentación automática
- ✅ Interfaz moderna y responsive
- ✅ Sistema de autenticación y autorización (Firebase Auth)
- ✅ Monitoreo en tiempo real de procesos
- ✅ Reportes y analytics
- ✅ Configuración flexible de automatizaciones

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
