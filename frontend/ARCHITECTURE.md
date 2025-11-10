# 🏗️ Arquitectura del Proyecto

## 📊 Diagrama de Flujo

```mermaid
graph TD
    A[Usuario] --> B[Dashboard /]
    B --> C{Selecciona Proceso}
    C -->|Pendientes| D[/pendientes]
    C -->|Proceso 1| E[/proceso-1]
    C -->|Proceso 2-6| F[/proceso-2 a /proceso-6]

    D --> G[TodoList Component]
    E --> H[DataTable Component]
    F --> I[En Construcción]

    G --> J[localStorage]
    H --> K[API Users]

    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style G fill:#e8f5e8
    style H fill:#fff3e0
    style I fill:#ffebee
```

## 🔄 Flujo de Navegación

### 1. **Dashboard Principal**

```
Usuario → / → MainContent.tsx
```

- Muestra grid de procesos
- Usa `dashboardProcesses` de `config/menu.ts`
- Navegación a procesos individuales

### 2. **Rutas Dinámicas**

```
Usuario → /proceso-1 → [slug]/page.tsx
```

- `[slug]/page.tsx` maneja todas las rutas dinámicas
- Valida si el proceso existe con `isValidProcess()`
- Carga componente con lazy loading
- Muestra loading spinner con Suspense

### 3. **Sistema de Rutas**

```typescript
// app/routes.ts
export const processRoutes = {
  pendientes: lazy(() => import("../components/processes/Pendientes")),
  "proceso-1": lazy(() => import("../components/processes/Proceso1")),
  // ...
};
```

## 🧩 Componentes Principales

### **Layout Components**

- **`Header.tsx`**: Navegación superior con logo y sección actual
- **`Sidebar.tsx`**: Menú lateral con navegación y submenús
- **`MainContent.tsx`**: Dashboard principal con grid de procesos

### **Process Components**

- **`Pendientes.tsx`**: TodoList para gestión de tareas
- **`Proceso1.tsx`**: DataTable con usuarios y filtros
- **`Proceso2-6.tsx`**: Páginas "en construcción"

### **UI Components**

- **`DataTable.tsx`**: Tabla avanzada con filtros y ordenamiento
- **`TodoList.tsx`**: Lista de tareas con persistencia
- **`Button.tsx`**: Botones reutilizables
- **`Input.tsx`**: Campos de entrada

## ⚙️ Sistema de Configuración

### **Configuración Centralizada**

```typescript
// config/menu.ts
export const menuItems = [
  { id: "Home", label: "Home", path: "/" },
  { id: "Pendientes", label: "Pendientes", path: "/pendientes" },
];

export const processItems = [
  { id: "Proceso1", label: "Proceso 1", path: "/proceso-1" },
  // ...
];
```

### **Hook de Navegación**

```typescript
// hooks/useNavigation.ts
export const useNavigation = () => {
  const getSectionName = () => {
    /* lógica */
  };
  const isActive = (path: string) => {
    /* lógica */
  };
  return { getSectionName, isActive };
};
```

## 🚀 Ventajas de la Arquitectura

### **Performance**

- ✅ **Lazy Loading**: Solo carga componentes necesarios
- ✅ **Code Splitting**: Bundles más pequeños
- ✅ **Suspense**: UX mejorada con loading states

### **Mantenibilidad**

- ✅ **Separación de responsabilidades**: Cada proceso en su archivo
- ✅ **Configuración centralizada**: Menús en un solo lugar
- ✅ **Lógica reutilizable**: Hooks personalizados

### **Escalabilidad**

- ✅ **Fácil agregar procesos**: Solo crear componente y agregar a routes
- ✅ **Metadatos centralizados**: Títulos y descripciones en un lugar
- ✅ **Sistema de validación**: Procesos no válidos muestran error

## 📁 Estructura de Archivos Detallada

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Dashboard home
│   ├── [slug]/page.tsx    # Rutas dinámicas
│   ├── routes.ts          # Sistema de rutas
│   ├── columns.tsx        # Configuración DataTable
│   └── users.ts           # Datos mock
├── components/
│   ├── ui/                # Componentes base
│   ├── processes/         # Componentes de procesos
│   ├── Header.tsx         # Header
│   ├── Sidebar.tsx        # Sidebar
│   ├── MainContent.tsx    # Dashboard
│   └── TodoList.tsx       # Lista de tareas
├── config/
│   └── menu.ts            # Configuración menús
├── hooks/
│   └── useNavigation.ts   # Hook navegación
└── lib/
    └── utils.ts           # Utilidades
```

## 🔧 Patrones de Diseño Utilizados

### **1. Lazy Loading Pattern**

```typescript
const Component = lazy(() => import("./Component"));
```

### **2. Configuration Pattern**

```typescript
export const config = {
  routes: {
    /* ... */
  },
  metadata: {
    /* ... */
  },
};
```

### **3. Custom Hook Pattern**

```typescript
export const useNavigation = () => {
  // lógica reutilizable
};
```

### **4. Dynamic Route Pattern**

```typescript
// [slug]/page.tsx
export default function DynamicPage({ params }) {
  const { slug } = params;
  // lógica dinámica
}
```

## 📈 Métricas de Performance

- **Bundle Size**: Optimizado con lazy loading
- **First Load**: Solo carga componentes necesarios
- **Navigation**: Transiciones suaves con Suspense
- **Memory**: Componentes se descargan cuando no se usan

## 🛡️ Seguridad

- **Type Safety**: TypeScript en todo el proyecto
- **Route Validation**: Validación de rutas existentes
- **Error Boundaries**: Manejo de errores en componentes
- **Input Validation**: Validación en formularios

## 🧪 Testing Strategy

- **Unit Tests**: Componentes individuales
- **Integration Tests**: Flujos completos
- **E2E Tests**: Navegación completa
- **Performance Tests**: Métricas de carga

---

**Esta arquitectura está diseñada para ser escalable, mantenible y performante.** 🚀
