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
      title: "Proceso 1",
      icon: Settings,
      color: "text-[#6A1B9A]",
      bgColor: "bg-transparent",
      path: "/proceso-1",
    },
    {
      id: 2,
      title: "Proceso 2",
      icon: Workflow,
      color: "text-[#00BCD4]",
      bgColor: "bg-transparent",
      path: "/proceso-2",
    },
    {
      id: 3,
      title: "Proceso 3",
      icon: Cog,
      color: "text-[#FFC107]",
      bgColor: "bg-transparent",
      path: "/proceso-3",
    },
    {
      id: 4,
      title: "Proceso 4",
      icon: FileText,
      color: "text-[#B71C1C]",
      bgColor: "bg-transparent",
      path: "/proceso-4",
    },
    {
      id: 5,
      title: "Proceso 5",
      icon: Users,
      color: "text-[#2196F3]",
      bgColor: "bg-transparent",
      path: "/proceso-5",
    },
    {
      id: 6,
      title: "Proceso 6",
      icon: CheckSquare,
      color: "text-[#4CAF50]",
      bgColor: "bg-transparent",
      path: "/proceso-6",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
