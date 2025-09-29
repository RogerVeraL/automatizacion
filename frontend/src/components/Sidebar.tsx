"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAutomatizacionesOpen, setIsAutomatizacionesOpen] = useState(false);

  const menuItems = [
    { id: "Home", label: "Home", path: "/" },
    { id: "Pendientes", label: "Pendientes", path: "/pendiente-1" },
  ];

  const automatizacionesItems = [
    { id: "Proceso1", label: "Proceso 1", path: "/proceso-1" },
    { id: "Proceso2", label: "Proceso 2", path: "/proceso-2" },
    { id: "Proceso3", label: "Proceso 3", path: "/proceso-3" },
    { id: "Proceso4", label: "Proceso 4", path: "/proceso-4" },
    { id: "Proceso5", label: "Proceso 5", path: "/proceso-5" },
    { id: "Proceso6", label: "Proceso 6", path: "/proceso-6" },
  ];

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  const handleAutomatizacionesToggle = () => {
    setIsAutomatizacionesOpen(!isAutomatizacionesOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const isAutomatizacionActive = () => {
    return automatizacionesItems.some((item) => isActive(item.path));
  };

  // Mantener abierto el submenú cuando haya una automatización activa
  useEffect(() => {
    if (isAutomatizacionActive()) {
      setIsAutomatizacionesOpen(true);
    }
  }, [pathname]);

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
      <nav className="p-6">
        <ul className="space-y-2">
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

          {/* Menú desplegable Automatizaciones */}
          <li>
            <button
              onClick={handleAutomatizacionesToggle}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-between ${
                isAutomatizacionActive()
                  ? "bg-gray-100 text-gray-900 font-bold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>Automatizaciones</span>
              {isAutomatizacionesOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isAutomatizacionesOpen && (
              <ul className="ml-4 mt-2 space-y-1">
                {automatizacionesItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.path)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive(item.path)
                          ? "bg-[#ee2b7b] text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
