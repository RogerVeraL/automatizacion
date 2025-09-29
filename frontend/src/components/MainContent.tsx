"use client";

import { useRouter } from "next/navigation";
import {
  Settings,
  Workflow,
  Cog,
  FileText,
  Users,
  CheckSquare,
} from "lucide-react";

const MainContent = () => {
  const router = useRouter();

  const cards = [
    {
      id: 1,
      title: "Gestión de procesos",
      icon: Settings,
      color: "text-[#6A1B9A]",
      bgColor: "bg-transparent",
      path: "/tareas",
    },
    {
      id: 2,
      title: "Flujos de trabajo",
      icon: Workflow,
      color: "text-[#00BCD4]",
      bgColor: "bg-transparent",
      path: "/historial",
    },
    {
      id: 3,
      title: "Configuración",
      icon: Cog,
      color: "text-[#FFC107]",
      bgColor: "bg-transparent",
      path: "/configuracion",
    },
    {
      id: 4,
      title: "Reportes",
      icon: FileText,
      color: "text-[#B71C1C]",
      bgColor: "bg-transparent",
      path: "/historial",
    },
    {
      id: 5,
      title: "Usuarios",
      icon: Users,
      color: "text-[#2196F3]",
      bgColor: "bg-transparent",
      path: "/tareas",
    },
    {
      id: 6,
      title: "Tareas",
      icon: CheckSquare,
      color: "text-[#4CAF50]",
      bgColor: "bg-transparent",
      path: "/tareas",
    },
  ];

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className="flex-1 bg-white p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">
          Automatización de procesos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.path)}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:border-gray-300"
              >
                <div className="mb-4">
                  <IconComponent className={`w-16 h-16 ${card.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
