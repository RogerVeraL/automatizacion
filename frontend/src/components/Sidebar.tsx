"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { menuItems, processItems } from "../config/menu";
import { useNavigation } from "../hooks/useNavigation";

const Sidebar = () => {
  const router = useRouter();
  const { isActive, isSubmenuActive } = useNavigation();
  const [isAutomatizacionesOpen, setIsAutomatizacionesOpen] = useState(false);

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  const handleAutomatizacionesToggle = () => {
    setIsAutomatizacionesOpen(!isAutomatizacionesOpen);
  };

  // Mantener abierto el submenú cuando haya una automatización activa
  useEffect(() => {
    if (isSubmenuActive(processItems)) {
      setIsAutomatizacionesOpen(true);
    }
  }, [isSubmenuActive]);

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
                isSubmenuActive(processItems)
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
                {processItems.map((item) => (
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
