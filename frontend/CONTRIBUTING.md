# 🤝 Guía de Contribución

## 📋 Cómo Contribuir

### 1. **Fork del Proyecto**

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/automatizacion.git
cd automatizacion/frontend
```

### 2. **Configurar el Entorno**

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### 3. **Crear una Rama**

```bash
# Crear rama para tu feature
git checkout -b feature/nombre-del-feature

# O para bugfix
git checkout -b fix/nombre-del-bug
```

### 4. **Desarrollar**

- Sigue las convenciones de código
- Escribe tests si es necesario
- Documenta cambios importantes

### 5. **Commit y Push**

```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nuevo proceso de automatización"

# Push a tu fork
git push origin feature/nombre-del-feature
```

### 6. **Crear Pull Request**

- Ve a GitHub y crea un Pull Request
- Describe los cambios realizados
- Asigna reviewers si es necesario

## 📝 Convenciones de Código

### **Naming Conventions**

```typescript
// Componentes: PascalCase
const MyComponent = () => {};

// Hooks: camelCase con prefijo 'use'
const useNavigation = () => {};

// Archivos: PascalCase para componentes, camelCase para utilidades
MyComponent.tsx;
useNavigation.ts;
utils.ts;
```

### **Estructura de Commits**

```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato, espacios
refactor: refactorización
test: tests
chore: tareas de mantenimiento
```

### **Ejemplos de Commits**

```bash
git commit -m "feat: agregar proceso de automatización para facturación"
git commit -m "fix: corregir error en DataTable cuando no hay datos"
git commit -m "docs: actualizar README con nueva estructura"
```

## 🏗️ Agregar Nuevos Procesos

### 1. **Crear Componente**

```typescript
// src/components/processes/Proceso7.tsx
const Proceso7 = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Proceso 7</h2>
      <p>Contenido del proceso 7</p>
    </div>
  );
};

export default Proceso7;
```

### 2. **Agregar a Rutas**

```typescript
// src/app/routes.ts
export const processRoutes = {
  // ... procesos existentes
  "proceso-7": lazy(() => import("../components/processes/Proceso7")),
};

export const processMetadata = {
  // ... metadatos existentes
  "proceso-7": {
    title: "Proceso 7",
    description: "Descripción del proceso 7",
  },
};
```

### 3. **Agregar al Menú**

```typescript
// src/config/menu.ts
export const processItems = [
  // ... procesos existentes
  { id: "Proceso7", label: "Proceso 7", path: "/proceso-7" },
];

export const dashboardProcesses = [
  // ... procesos existentes
  {
    id: 7,
    title: "Proceso 7",
    icon: "NewIcon",
    color: "text-[#COLOR]",
    bgColor: "bg-transparent",
    path: "/proceso-7",
  },
];
```

## 🧪 Testing

### **Ejecutar Tests**

```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### **Escribir Tests**

```typescript
// __tests__/components/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

## 📚 Documentación

### **Agregar Documentación**

- Actualiza README.md si es necesario
- Documenta nuevas funcionalidades
- Agrega ejemplos de uso
- Mantén ARCHITECTURE.md actualizado

### **Comentarios en Código**

```typescript
/**
 * Hook personalizado para manejar la navegación
 * @returns {Object} Objeto con funciones de navegación
 */
export const useNavigation = () => {
  // implementación
};
```

## 🐛 Reportar Bugs

### **Template de Bug Report**

```markdown
## 🐛 Descripción del Bug

Descripción clara del problema

## 🔄 Pasos para Reproducir

1. Ve a '...'
2. Haz clic en '...'
3. Scroll hasta '...'
4. Ve el error

## 🎯 Comportamiento Esperado

Qué debería pasar

## 📱 Información del Sistema

- OS: [ej. Windows 10]
- Browser: [ej. Chrome 91]
- Versión: [ej. 1.0.0]

## 📷 Screenshots

Si aplica, agrega screenshots
```

## ✨ Solicitar Features

### **Template de Feature Request**

```markdown
## 🚀 Descripción de la Feature

Descripción clara de la funcionalidad solicitada

## 💡 Motivación

Por qué esta feature sería útil

## 📋 Descripción Detallada

Cómo debería funcionar la feature

## 🎨 Mockups/Prototipos

Si tienes diseños, agrégalos aquí

## ✅ Criterios de Aceptación

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3
```

## 📞 Contacto

- **Issues**: Usa GitHub Issues para bugs y features
- **Discussions**: Usa GitHub Discussions para preguntas
- **Email**: [tu-email@comfama.com]

## 📄 Licencia

Al contribuir, aceptas que tu código será licenciado bajo la [MIT License](LICENSE).

---

**¡Gracias por contribuir al proyecto!** 🚀
