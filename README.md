# 🚀 Comfama - Automatización de Procesos

Sistema de automatización de procesos para Comfama con Next.js 14, TypeScript y TailwindCSS.

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Layout principal de la aplicación
│   │   ├── page.tsx                  # Página home (Dashboard)
│   │   ├── [slug]/                   # Rutas dinámicas
│   │   │   └── page.tsx              # Página dinámica para procesos
│   │   ├── routes.ts                 # Sistema de rutas con lazy loading
│   │   ├── columns.tsx               # Configuración de columnas para DataTable
│   │   └── users.ts                  # Datos mock de usuarios
│   ├── components/
│   │   ├── ui/                       # Componentes UI base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── datatable.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── processes/                # Componentes de cada proceso
│   │   │   ├── Pendientes.tsx        # Gestión de tareas pendientes
│   │   │   ├── Proceso1.tsx          # DataTable con usuarios
│   │   │   ├── Proceso2.tsx          # En construcción
│   │   │   ├── Proceso3.tsx          # En construcción
│   │   │   ├── Proceso4.tsx          # En construcción
│   │   │   ├── Proceso5.tsx          # En construcción
│   │   │   └── Proceso6.tsx          # En construcción
│   │   ├── Header.tsx                # Header con navegación
│   │   ├── Sidebar.tsx               # Sidebar con menú
│   │   ├── MainContent.tsx           # Dashboard principal
│   │   └── TodoList.tsx              # Componente de tareas
│   ├── config/
│   │   └── menu.ts                   # Configuración centralizada de menús
│   ├── hooks/
│   │   └── useNavigation.ts          # Hook para lógica de navegación
│   ├── lib/
│   │   └── utils.ts                  # Utilidades (cn function)
│   └── images/
│       └── comfama_logo.png          # Logo de Comfama
├── public/                           # Archivos estáticos
├── package.json                      # Dependencias del proyecto
├── tailwind.config.js                # Configuración de TailwindCSS
├── tsconfig.json                     # Configuración de TypeScript
└── next.config.js                    # Configuración de Next.js
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

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework de CSS
- **shadcn/ui** - Componentes UI
- **TanStack Table** - Tablas avanzadas
- **Lucide React** - Iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run lint:fix     # Linting con corrección automática
npm run type-check   # Verificación de tipos
```

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
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollo Frontend**: [Tu nombre]
- **Diseño UI/UX**: [Diseñador]
- **Product Owner**: [PO]

---

**Comfama** - Automatización de Procesos 🚀
