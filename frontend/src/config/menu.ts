export interface MenuItem {
  id: string;
  label: string;
  path: string;
}

export interface ProcessItem {
  id: string;
  label: string;
  path: string;
}

// Menú principal
export const menuItems: MenuItem[] = [
  { id: "Home", label: "Home", path: "/" },
  { id: "Pendientes", label: "Pendientes", path: "/pendientes" },
];

// Procesos de automatización
export const processItems: ProcessItem[] = [
  {
    id: "Indicador de Equipos",
    label: "Indicador Equipos",
    path: "/indicador-de-equipos",
  },
  { id: "Cruce CMDB", label: "Cruce CMDB", path: "/Cruce-CMDB" },
  { id: "Proceso3", label: "Proceso 3", path: "/proceso-3" },
  { id: "Proceso4", label: "Proceso 4", path: "/proceso-4" },
  { id: "Proceso5", label: "Proceso 5", path: "/proceso-5" },
  { id: "Proceso6", label: "Proceso 6", path: "/proceso-6" },
];

// Configuración de procesos para el dashboard
export const dashboardProcesses = [
  {
    id: 1,
    title: "Indicador Equipos",
    icon: "Settings",
    color: "text-[#6A1B9A]",
    bgColor: "bg-transparent",
    path: "/indicador-de-equipos",
  },
  {
    id: 2,
    title: "Proceso 2",
    icon: "Workflow",
    color: "text-[#00BCD4]",
    bgColor: "bg-transparent",
    path: "/Cruce CMDB",
  },
  {
    id: 3,
    title: "Proceso 3",
    icon: "Cog",
    color: "text-[#FFC107]",
    bgColor: "bg-transparent",
    path: "/proceso-3",
  },
  {
    id: 4,
    title: "Proceso 4",
    icon: "FileText",
    color: "text-[#B71C1C]",
    bgColor: "bg-transparent",
    path: "/proceso-4",
  },
  {
    id: 5,
    title: "Proceso 5",
    icon: "Users",
    color: "text-[#2196F3]",
    bgColor: "bg-transparent",
    path: "/proceso-5",
  },
  {
    id: 6,
    title: "Proceso 6",
    icon: "CheckSquare",
    color: "text-[#4CAF50]",
    bgColor: "bg-transparent",
    path: "/proceso-6",
  },
];
