# 🚀 Comfama - Automatización de Procesos

Sistema de automatización de procesos para Comfama con Next.js 14, TypeScript y TailwindCSS.

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
- **shadcn/ui** - Componentes UI
- **TanStack Table** - Tablas avanzadas
- **Lucide React** - Iconos

## 📁 Estructura del Proyecto

```
automatizacion/
├── backend/                 # API Backend (Python/FastAPI)
│   ├── main.py             # Aplicación principal
│   ├── requirements.txt    # Dependencias Python
│   ├── env.example        # Variables de entorno
│   └── README.md          # Documentación backend
├── frontend/               # Frontend (Next.js/React)
│   ├── src/
│   │   ├── app/                          # Next.js App Router
│   │   │   ├── layout.tsx                # Layout principal de la aplicación
│   │   │   ├── page.tsx                  # Página home (Dashboard)
│   │   │   ├── [slug]/                   # Rutas dinámicas
│   │   │   │   └── page.tsx              # Página dinámica para procesos
│   │   │   ├── routes.ts                 # Sistema de rutas con lazy loading
│   │   │   ├── columns.tsx               # Configuración de columnas para DataTable
│   │   │   └── users.ts                  # Datos mock de usuarios
│   │   ├── components/
│   │   │   ├── ui/                       # Componentes UI base (shadcn/ui)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── datatable.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── ...
│   │   │   ├── processes/                # Componentes de cada proceso
│   │   │   │   ├── Pendientes.tsx        # Gestión de tareas pendientes
│   │   │   │   ├── Proceso1.tsx          # DataTable con usuarios
│   │   │   │   ├── Proceso2.tsx          # En construcción
│   │   │   │   ├── Proceso3.tsx          # En construcción
│   │   │   │   ├── Proceso4.tsx          # En construcción
│   │   │   │   ├── Proceso5.tsx          # En construcción
│   │   │   │   └── Proceso6.tsx          # En construcción
│   │   │   ├── Header.tsx                # Header con navegación
│   │   │   ├── Sidebar.tsx               # Sidebar con menú
│   │   │   ├── MainContent.tsx           # Dashboard principal
│   │   │   └── TodoList.tsx              # Componente de tareas
│   │   ├── config/
│   │   │   └── menu.ts                   # Configuración centralizada de menús
│   │   ├── hooks/
│   │   │   └── useNavigation.ts          # Hook para lógica de navegación
│   │   ├── lib/
│   │   │   └── utils.ts                  # Utilidades (cn function)
│   │   └── images/
│   │       └── comfama_logo.png          # Logo de Comfama
│   ├── public/                           # Archivos estáticos
│   ├── package.json                      # Dependencias del proyecto
│   ├── tailwind.config.js                # Configuración de TailwindCSS
│   ├── tsconfig.json                     # Configuración de TypeScript
│   ├── next.config.js                    # Configuración de Next.js
│   └── README.md         # Documentación frontend
└── README.md             # Este archivo
```

## 🏗️ Arquitectura

### **Sistema de Rutas Dinámicas**

- **Lazy Loading**: Componentes se cargan solo cuando se necesitan
- **Suspense**: Loading states durante la carga
- **Validación**: Procesos no válidos muestran error 404

### **Configuración Centralizada**

- **Menús**: Configuración en `config/menu.ts`
- **Navegación**: Lógica reutilizable en `hooks/useNavigation.ts`
- **Metadatos**: Títulos y descripciones en `app/routes.ts`

### **Componentes Modulares**

- **Procesos**: Cada proceso en su archivo separado
- **UI**: Componentes base reutilizables
- **Layout**: Header y Sidebar consistentes

## 🚀 Funcionalidades

### **Dashboard (`/`)**

- Grid de procesos disponibles
- Navegación a procesos individuales
- Diseño responsive

### **Pendientes (`/pendientes`)**

- Gestión de tareas con TodoList
- Persistencia en localStorage
- Agregar, completar, eliminar tareas
- Contador de tareas pendientes

### **Proceso 1 (`/proceso-1`)**

- DataTable con usuarios
- Filtro global por nombre
- Ordenamiento y paginación
- Búsqueda en tiempo real

### **Procesos 2-6 (`/proceso-2` a `/proceso-6`)**

- Páginas "en construcción"
- Listos para desarrollo futuro
- Estructura preparada para escalabilidad

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

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run lint:fix     # Linting con corrección automática
npm run type-check   # Verificación de tipos
```

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

## 📋 Próximos Pasos

- [ ] Implementar Proceso 2
- [ ] Implementar Proceso 3
- [ ] Implementar Proceso 4
- [ ] Implementar Proceso 5
- [ ] Implementar Proceso 6
- [ ] Agregar testing (Jest + Testing Library)
- [ ] Implementar Storybook
- [ ] Agregar CI/CD

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollo Frontend**: [Tu nombre]
- **Diseño UI/UX**: [Diseñador]
- **Product Owner**: [PO]

---

**Comfama** - Automatización de Procesos 🚀
