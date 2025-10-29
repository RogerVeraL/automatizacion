"use client";

import { ChevronDown } from "lucide-react";
import { ProcessData } from "../hooks/useProcessData";

interface ProcessSelectorProps {
  processes: ProcessData[];
  selectedProcess: string;
  onProcessChange: (processId: string) => void;
  isLoading?: boolean;
}

const ProcessSelector = ({
  processes,
  selectedProcess,
  onProcessChange,
  isLoading = false,
}: ProcessSelectorProps) => {
  const currentProcess = processes.find((p) => p.id === selectedProcess);

  const handleProcessChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onProcessChange(event.target.value);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gráficas de Datos
          </h1>
          <p className="text-gray-600 text-sm">
            Visualización y análisis de métricas de procesos
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex flex-col min-w-[280px]">
            <label
              htmlFor="process-select"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Seleccionar Proceso
            </label>
            <div className="relative">
              <select
                id="process-select"
                value={selectedProcess}
                onChange={handleProcessChange}
                disabled={isLoading}
                className="appearance-none bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ee2b7b]/20 focus:border-[#ee2b7b] disabled:opacity-50 disabled:cursor-not-allowed w-full transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                {processes.map((process) => (
                  <option key={process.id} value={process.id}>
                    {process.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSelector;
