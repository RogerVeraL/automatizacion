"use client";

import { Suspense, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TodoList from "../../components/TodoList";
import {
  getProcessComponent,
  getProcessMetadata,
  isValidProcess,
} from "../../app/routes";

type PageProps = {
  params: { slug: string };
};

// Componente de carga
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Cargando...</span>
  </div>
);

// Componente para procesos no válidos
const InvalidProcess = ({ title }: { title: string }) => (
  <div className="text-center py-12">
    <div className="text-gray-400 text-6xl mb-4">⚠️</div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
      Proceso no encontrado
    </h2>
    <p className="text-gray-500">
      El proceso &quot;{title}&quot; no existe o no está disponible.
    </p>
  </div>
);

export default function DynamicPage({ params }: PageProps) {
  const { slug } = params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => setIsSidebarOpen((v) => !v);

  // Verificar si es un proceso válido
  if (!isValidProcess(slug)) {
    const title = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar collapsed={!isSidebarOpen} onToggle={handleToggleSidebar} />
          <main className="flex-1 bg-white p-8 min-h-screen">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-bold text-black mb-6">{title}</h1>
              <InvalidProcess title={title} />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Obtener metadatos del proceso
  const metadata = getProcessMetadata(slug);
  const title = metadata.title;

  // Obtener el componente del proceso
  const ProcessComponent = getProcessComponent(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar collapsed={!isSidebarOpen} onToggle={handleToggleSidebar} />
        <main className="flex-1 bg-white p-8 min-h-screen">
          <div className="max-w-[77vw] mx-auto">
            <h1 className="text-3xl font-bold text-black mb-6">{title}</h1>
            <Suspense fallback={<LoadingSpinner />}>
              <ProcessComponent />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
