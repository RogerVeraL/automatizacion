"use client";

import EquipmentChart from "./ui/linechart";
import ChartCard from "./ChartCard";
import ProcessSelector from "./ProcessSelector";
import { useProcessData } from "../hooks/useProcessData";

const DashboardContent = () => {
  const {
    processes,
    selectedProcess,
    setSelectedProcess,
    getCurrentProcess,
    getCurrentProcessData,
    isLoading,
  } = useProcessData();

  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando datos...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentProcess = getCurrentProcess();
  const currentData = getCurrentProcessData();

  return (
    <main className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-6 min-h-screen">
      <div className="max-w-8xl mx-auto px-8">
        <ProcessSelector
          processes={processes}
          selectedProcess={selectedProcess}
          onProcessChange={setSelectedProcess}
          isLoading={isLoading}
        />

        {/* Grid Bento - Cards con diferentes tamaños */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
          {currentProcess && (
            <>
              {/* 2 columnas */}
              <ChartCard
                title={currentProcess.chartTitle}
                variant="featured"
                className="lg:col-span-2"
              >
                <EquipmentChart users={currentData} />
              </ChartCard>

              {/* 1 columna */}
              <ChartCard
                title={`Resumen`}
                variant="compact"
                className="lg:col-span-1"
              >
                <EquipmentChart users={currentData} />
              </ChartCard>

              {/* 1 columna */}
              <ChartCard
                title={`Métricas`}
                variant="compact"
                className="lg:col-span-1"
              >
                <EquipmentChart users={currentData} />
              </ChartCard>

              {/* 1 columna */}
              <ChartCard
                title={`Tendencias`}
                variant="compact"
                className="lg:col-span-1"
              >
                <EquipmentChart users={currentData} />
              </ChartCard>

              <ChartCard
                title={`Estadísticas`}
                variant="compact"
                className="lg:col-span-1"
              >
                <EquipmentChart users={currentData} />
              </ChartCard>
              {/* ocupa 2 columnas */}
              <ChartCard
                title={`Análisis Detallado - ${currentProcess.name}`}
                variant="default"
                className="lg:col-span-2"
              >
                <EquipmentChart users={currentData} />
              </ChartCard>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
