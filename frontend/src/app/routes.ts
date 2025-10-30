import { lazy } from "react";

// Lazy loading de componentes de procesos
export const processRoutes = {
  tareas: lazy(() => import("../components/processes/Pendientes")),
  "indicador-de-equipos": lazy(
    () => import("../components/processes/Indicador de Equipos")
  ),
  "Cruce CMDB": lazy(() => import("../components/processes/Crucecmbd")),
  "proceso-3": lazy(() => import("../components/processes/Proceso3")),
  "proceso-4": lazy(() => import("../components/processes/Proceso4")),
  "proceso-5": lazy(() => import("../components/processes/Proceso5")),
  "proceso-6": lazy(() => import("../components/processes/Proceso6")),
} as const;

// Configuración de metadatos para cada Proceso
export const processMetadata = {
  tareas: {
    title: "Tareas",
    description: "Gestión de tareas",
  },
  "indicador-de-equipos": {
    title: "Indicador de Equipos",
    description: "Indicador de Equipos",
    showDataTable: true,
    globalFilterColumn: "name",
  },
  "Cruce CMDB": {
    title: "Cruce CMDB",
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
