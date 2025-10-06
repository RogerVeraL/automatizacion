import { lazy } from "react";

// Lazy loading de componentes de procesos
export const processRoutes = {
  pendientes: lazy(() => import("../components/processes/Pendientes")),
  "proceso-1": lazy(() => import("../components/processes/Proceso1")),
  "proceso-2": lazy(() => import("../components/processes/Proceso2")),
  "proceso-3": lazy(() => import("../components/processes/Proceso3")),
  "proceso-4": lazy(() => import("../components/processes/Proceso4")),
  "proceso-5": lazy(() => import("../components/processes/Proceso5")),
  "proceso-6": lazy(() => import("../components/processes/Proceso6")),
} as const;

// Configuración de metadatos para cada proceso
export const processMetadata = {
  pendientes: {
    title: "Pendientes",
    description: "Gestión de tareas pendientes",
  },
  "proceso-1": {
    title: "Proceso 1",
    description: "Descripción del proceso 1",
    showDataTable: true,
    globalFilterColumn: "name",
  },
  "proceso-2": {
    title: "Proceso 2",
    description: "Descripción del proceso 2",
  },
  "proceso-3": {
    title: "Proceso 3",
    description: "Descripción del proceso 3",
  },
  "proceso-4": {
    title: "Proceso 4",
    description: "Descripción del proceso 4",
  },
  "proceso-5": {
    title: "Proceso 5",
    description: "Descripción del proceso 5",
  },
  "proceso-6": {
    title: "Proceso 6",
    description: "Descripción del proceso 6",
  },
} as const;

// Función helper para obtener el componente correcto
export const getProcessComponent = (slug: string) => {
  return processRoutes[slug as keyof typeof processRoutes];
};

// Función helper para obtener metadatos
export const getProcessMetadata = (slug: string) => {
  return processMetadata[slug as keyof typeof processMetadata];
};

// Función para verificar si un proceso existe
export const isValidProcess = (
  slug: string
): slug is keyof typeof processRoutes => {
  return slug in processRoutes;
};
