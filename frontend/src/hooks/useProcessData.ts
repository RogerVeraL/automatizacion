"use client";

import { useState, useEffect } from "react";
import { EquipmentInsight } from "../app/users";
import { getUsers } from "../app/users";

export interface ProcessData {
  id: string;
  name: string;
  description: string;
  data: EquipmentInsight[];
  chartType: "line" | "bar" | "pie" | "area";
  chartTitle: string;
}

// Definir los procesos disponibles
const processDefinitions: Omit<ProcessData, "data">[] = [
  {
    id: "indicador-equipos",
    name: "Indicador de Equipos",
    description: "Análisis de rendimiento de equipos de trabajo",
    chartType: "line",
    chartTitle: "Rendimiento por Usuario",
  },
  {
    id: "cruce-cmdb",
    name: "Cruce CMDB",
    description: "Cruce de datos de CMDB ",
    chartType: "bar",
    chartTitle: "Cruce de datos de CMDB",
  },
  {
    id: "proceso3",
    name: "Proceso 3",
    description: "Análisis del tercer proceso de automatización",
    chartType: "area",
    chartTitle: "Evolución del Proceso 3",
  },
  {
    id: "proceso4",
    name: "Proceso 4",
    description: "Métricas del cuarto proceso",
    chartType: "pie",
    chartTitle: "Distribución Proceso 4",
  },
  {
    id: "proceso5",
    name: "Proceso 5",
    description: "Indicadores del quinto proceso",
    chartType: "line",
    chartTitle: "Tendencias Proceso 5",
  },
  {
    id: "proceso6",
    name: "Proceso 6",
    description: "Análisis del sexto proceso",
    chartType: "bar",
    chartTitle: "Métricas Proceso 6",
  },
];

export const useProcessData = () => {
  const [processes, setProcesses] = useState<ProcessData[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos de todos los procesos
  useEffect(() => {
    const loadProcessData = async () => {
      try {
        setIsLoading(true);
        const rawData = await getUsers();

        // Crear datos para cada proceso basado en los datos originales
        const processData: ProcessData[] = processDefinitions.map((process) => {
          // Filtrar o transformar datos según el proceso
          let filteredData = rawData;

          switch (process.id) {
            case "indicador-equipos":
              // Datos completos para indicador de equipos
              filteredData = rawData;
              break;
            case "cruce-cmdb":
              // Cruce de datos de CMDB
              filteredData = rawData.filter(
                (item) =>
                  item.estado_del_caso === "Closed" &&
                  item.kpi &&
                  parseInt(item.kpi.replace("%", "")) >= 85
              );
              break;
            case "proceso5":
              // Casos de tipo Vinculado
              filteredData = rawData.filter(
                (item) => item.tipo_de_contrato === "Vinculado"
              );
              break;
            case "proceso6":
              // Casos de tipo Aprendizaje
              filteredData = rawData.filter(
                (item) => item.tipo_de_contrato === "Aprendizaje"
              );
              break;
            default:
              filteredData = rawData;
          }

          return {
            ...process,
            data: filteredData,
          };
        });

        setProcesses(processData);

        // Seleccionar el primer proceso por defecto
        if (processData.length > 0) {
          setSelectedProcess(processData[0].id);
        }
      } catch (error) {
        console.error("Error cargando datos de procesos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProcessData();
  }, []);

  const getCurrentProcess = (): ProcessData | undefined => {
    return processes.find((process) => process.id === selectedProcess);
  };

  const getCurrentProcessData = (): EquipmentInsight[] => {
    const currentProcess = getCurrentProcess();
    return currentProcess ? currentProcess.data : [];
  };

  return {
    processes,
    selectedProcess,
    setSelectedProcess,
    getCurrentProcess,
    getCurrentProcessData,
    isLoading,
  };
};
