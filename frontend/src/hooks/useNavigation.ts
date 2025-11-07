"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

  // Obtener el nombre de la sección actual
  const getSectionName = () => {
    if (!pathname) return "Dashboard";

    // Rutas dinámicas para procesos
    if (pathname.startsWith("/proceso-")) {
      return pathname
        .substring(1) // Remover el slash inicial
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Rutas dinámicas para pendientes
    if (pathname.startsWith("/todolist-")) {
      return "TodoList";
    }

    switch (pathname) {
      case "/":
        return "Home";
      case "/dashboard":
        return "Dashboard";
      case "/todolist":
        return "TodoList";
      case "/indicador-de-equipos":
        return "Indicador de Equipos";
      case "/Cruce-CMDB":
        return "Cruce CMDB";
      default:
        return "Dashboard";
    }
  };

  // Verificar si una ruta está activa
  const isActive = (path: string): boolean => {
    if (!pathname) return false;
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Verificar si un submenú está activo
  const isSubmenuActive = (items: { path: string }[]): boolean => {
    return items.some((item) => isActive(item.path));
  };

  return {
    pathname,
    getSectionName,
    isActive,
    isSubmenuActive,
  };
};
