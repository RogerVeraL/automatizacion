"use client";

import { usePathname } from "next/navigation";
import { User } from "lucide-react";

const Header = () => {
  const pathname = usePathname();

  const getSectionName = () => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/tareas":
        return "Tareas";
      case "/historial":
        return "Historial";
      case "/configuracion":
        return "Configuración";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-[#ee2b7b] text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">comfama</h1>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-lg font-medium">{getSectionName()}</span>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-[#ee2b7b]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
