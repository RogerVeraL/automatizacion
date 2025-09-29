"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", path: "/" },
    { id: "Tareas", label: "Tareas", path: "/tareas" },
    { id: "Historial", label: "Historial", path: "/historial" },
    { id: "Configuración", label: "Configuración", path: "/configuracion" },
  ];

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
      <nav className="p-6">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item.path)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-gray-100 text-gray-900 font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
