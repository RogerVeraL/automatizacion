"use client";

import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";
import Image from "next/image";
import Logo from "../images/comfama_logo.png";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const getSectionName = () => {
    // Rutas dinámicas para procesos
    if (pathname.startsWith("/proceso-")) {
      return pathname
        .substring(1) // Remover el slash inicial
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Rutas dinámicas para pendientes
    if (pathname.startsWith("/pendiente-")) {
      return "Pendientes";
    }

    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/tareas":
        return "Tareas";
      case "/pendientes":
        return "Pendientes";
      case "/historial":
        return "Historial";
      case "/configuracion":
        return "Configuración";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-[#ffffff] px-6 py-4 flex items-center justify-between shadow-md border-b border">
      <div className="flex items-center">
        <button
          onClick={handleLogoClick}
          className="cursor-pointer hover:scale-105 transition-transform duration-200 rounded-lg "
        >
          <Image src={Logo} alt="Logo" width={150} height={100} />
        </button>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-lg text-white bg-[#ee2b7b] px-2 py-1 rounded-lg font-medium">
          {getSectionName()}
        </span>
        <div className="w-8 h-8 bg-[#ee2b7b] rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
