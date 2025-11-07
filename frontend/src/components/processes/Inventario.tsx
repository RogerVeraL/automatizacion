"use client";

import React, { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, CheckCircle2, XCircle } from "lucide-react";
import DataTable from "../ui/datatable";
import ExcelUploadButton from "../ui/excel-upload-button";
import LoadingSpinner from "../ui/loading-spinner";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface InventarioRow {
  id: string;
  serial: string;
  observacion: string;
}

type EstadoPermitido =
  | "Available"
  | "Awaiting Disposal"
  | "Reserved"
  | "Preparación";

interface ExcelRow {
  numeroSerie: string;
  estado: EstadoPermitido;
}

interface ComparacionResult {
  serial: string;
  estadoExcel: EstadoPermitido;
  coincidencia: "encontrado" | "no_encontrado";
  observacion?: string;
}

interface EstadisticasPorEstado {
  estado: EstadoPermitido;
  total: number;
  encontrados: number;
  noEncontrados: number;
  porcentajeEncontrados: number;
}

interface Estadisticas {
  totalExcel: number;
  totalEncontrados: number;
  totalNoEncontrados: number;
  porcentajeEncontrados: number;
  porEstado: EstadisticasPorEstado[];
}

// Constantes
const ESTADOS_PERMITIDOS: EstadoPermitido[] = [
  "Available",
  "Awaiting Disposal",
  "Reserved",
  "Preparación",
];

const FILA_INICIO_DATOS = 3; // La fila 3 contiene el encabezado (índice 2 en base 0)
const COLUMNA_NUMERO_SERIE = "Número de serie";
const COLUMNA_ESTADO = "Estado";

// Colores para la gráfica de torta por estado
const COLORES_POR_ESTADO: Record<EstadoPermitido, string> = {
  Available: "#22c55e", // Verde
  "Awaiting Disposal": "#ef4444", // Rojo
  Reserved: "#3b82f6", // Azul
  Preparación: "#f59e0b", // Amarillo/Naranja
};

// Funciones puras siguiendo principios SOLID

/**
 * Extrae los datos del Excel desde la fila especificada
 * Single Responsibility: Solo se encarga de leer y parsear el Excel
 */
const parseExcelData = (worksheet: XLSX.WorkSheet): any[][] => {
  // Leer todo el archivo y luego tomar desde la fila especificada
  const allData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
  }) as any[][];

  // Retornar desde la fila 3 (índice 2 en base 0)
  return allData.slice(FILA_INICIO_DATOS - 1);
};

/**
 * Encuentra el índice de una columna por su nombre
 * Single Responsibility: Solo busca el índice de una columna
 */
const encontrarIndiceColumna = (
  encabezados: any[],
  nombreColumna: string
): number => {
  return encabezados.findIndex(
    (header) =>
      header &&
      typeof header === "string" &&
      header.trim().toLowerCase() === nombreColumna.toLowerCase()
  );
};

/**
 * Valida si un estado está en la lista de estados permitidos
 * Single Responsibility: Solo valida estados
 */
const esEstadoPermitido = (estado: string): estado is EstadoPermitido => {
  return ESTADOS_PERMITIDOS.includes(estado as EstadoPermitido);
};

/**
 * Filtra y extrae las filas válidas del Excel
 * Single Responsibility: Solo filtra y transforma datos del Excel
 */
const extraerFilasExcel = (jsonData: any[][]): ExcelRow[] => {
  if (jsonData.length === 0) return [];

  const encabezados = jsonData[0];
  const indiceNumeroSerie = encontrarIndiceColumna(
    encabezados,
    COLUMNA_NUMERO_SERIE
  );
  const indiceEstado = encontrarIndiceColumna(encabezados, COLUMNA_ESTADO);

  if (indiceNumeroSerie === -1 || indiceEstado === -1) {
    throw new Error(
      `No se encontraron las columnas "${COLUMNA_NUMERO_SERIE}" o "${COLUMNA_ESTADO}" en el archivo Excel.`
    );
  }

  const filasValidas: ExcelRow[] = [];

  // Empezar desde la fila 1 (después del encabezado)
  for (let i = 1; i < jsonData.length; i++) {
    const fila = jsonData[i];
    const numeroSerie = fila[indiceNumeroSerie];
    const estado = fila[indiceEstado];

    if (
      numeroSerie &&
      typeof numeroSerie === "string" &&
      numeroSerie.trim() !== "" &&
      estado &&
      typeof estado === "string" &&
      esEstadoPermitido(estado.trim())
    ) {
      filasValidas.push({
        numeroSerie: numeroSerie.trim(),
        estado: estado.trim() as EstadoPermitido,
      });
    }
  }

  return filasValidas;
};

/**
 * Compara un serial con una lista de seriales (case-insensitive)
 * Single Responsibility: Solo realiza la comparación
 */
const serialCoincide = (serial1: string, serial2: string): boolean => {
  return serial1.toLowerCase().trim() === serial2.toLowerCase().trim();
};

/**
 * Realiza la comparación entre los seriales del Excel y los de la tabla
 * Single Responsibility: Solo realiza la comparación
 */
const compararSeriales = (
  filasExcel: ExcelRow[],
  serialesTabla: string[]
): ComparacionResult[] => {
  return filasExcel.map((filaExcel) => {
    const encontrado = serialesTabla.some((serialTabla) =>
      serialCoincide(serialTabla, filaExcel.numeroSerie)
    );

    return {
      serial: filaExcel.numeroSerie,
      estadoExcel: filaExcel.estado,
      coincidencia: encontrado ? "encontrado" : "no_encontrado",
    };
  });
};

/**
 * Calcula las estadísticas por estado
 * Single Responsibility: Solo calcula estadísticas
 */
const calcularEstadisticasPorEstado = (
  resultados: ComparacionResult[]
): EstadisticasPorEstado[] => {
  const estadisticasPorEstado = new Map<
    EstadoPermitido,
    EstadisticasPorEstado
  >();

  ESTADOS_PERMITIDOS.forEach((estado) => {
    const filasEstado = resultados.filter((r) => r.estadoExcel === estado);
    const total = filasEstado.length;
    const encontrados = filasEstado.filter(
      (r) => r.coincidencia === "encontrado"
    ).length;
    const noEncontrados = total - encontrados;
    const porcentajeEncontrados =
      total > 0 ? Math.round((encontrados / total) * 100 * 100) / 100 : 0;

    estadisticasPorEstado.set(estado, {
      estado,
      total,
      encontrados,
      noEncontrados,
      porcentajeEncontrados,
    });
  });

  return Array.from(estadisticasPorEstado.values());
};

/**
 * Calcula las estadísticas generales
 * Single Responsibility: Solo calcula estadísticas generales
 */
const calcularEstadisticasGenerales = (
  resultados: ComparacionResult[],
  porEstado: EstadisticasPorEstado[]
): Estadisticas => {
  const totalExcel = resultados.length;
  const totalEncontrados = resultados.filter(
    (r) => r.coincidencia === "encontrado"
  ).length;
  const totalNoEncontrados = totalExcel - totalEncontrados;
  const porcentajeEncontrados =
    totalExcel > 0
      ? Math.round((totalEncontrados / totalExcel) * 100 * 100) / 100
      : 0;

  return {
    totalExcel,
    totalEncontrados,
    totalNoEncontrados,
    porcentajeEncontrados,
    porEstado,
  };
};

const Inventario = () => {
  const [rows, setRows] = useState<InventarioRow[]>([
    { id: "1", serial: "", observacion: "" },
    { id: "2", serial: "", observacion: "" },
    { id: "3", serial: "", observacion: "" },
    { id: "4", serial: "", observacion: "" },
    { id: "5", serial: "", observacion: "" },
    { id: "6", serial: "", observacion: "" },
    { id: "7", serial: "", observacion: "" },
    { id: "8", serial: "", observacion: "" },
    { id: "9", serial: "", observacion: "" },
  ]);

  const [excelData, setExcelData] = useState<ExcelRow[]>([]);
  const [rightTableData, setRightTableData] = useState<ComparacionResult[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCellChange = (
    id: string,
    field: "serial" | "observacion",
    value: string
  ) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Obtener la primera hoja
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Parsear datos desde la fila 3
      const jsonData = parseExcelData(worksheet);

      // Extraer y filtrar filas válidas
      const filasExcel = extraerFilasExcel(jsonData);

      if (filasExcel.length === 0) {
        alert(
          "No se encontraron filas válidas con los estados permitidos (Available, Awaiting Disposal, Reserved, Preparación)."
        );
        return;
      }

      setExcelData(filasExcel);
      console.log("Datos extraídos del Excel:", filasExcel);
    } catch (error) {
      console.error("Error al procesar el archivo Excel:", error);
      const mensajeError =
        error instanceof Error
          ? error.message
          : "Error al procesar el archivo Excel. Por favor, verifica que el archivo sea válido.";
      alert(mensajeError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnviar = () => {
    if (excelData.length === 0) {
      alert("Por favor, carga primero un archivo Excel con los datos.");
      return;
    }

    // Obtener los seriales de la tabla izquierda (filtrar vacíos)
    const serialesTabla = rows
      .map((row) => row.serial.trim())
      .filter((serial) => serial !== "");

    if (serialesTabla.length === 0) {
      alert("Por favor, ingresa al menos un serial en la tabla.");
      return;
    }

    // Realizar la comparación usando función pura
    const resultados = compararSeriales(excelData, serialesTabla);

    // Agregar observaciones a los resultados encontrados
    const resultadosConObservaciones = resultados.map((resultado) => {
      if (resultado.coincidencia === "encontrado") {
        const filaEncontrada = rows.find((row) =>
          serialCoincide(row.serial, resultado.serial)
        );
        return {
          ...resultado,
          observacion: filaEncontrada?.observacion || "",
        };
      }
      return resultado;
    });

    // Calcular estadísticas por estado
    const estadisticasPorEstado = calcularEstadisticasPorEstado(
      resultadosConObservaciones
    );

    // Calcular estadísticas generales
    const estadisticasGenerales = calcularEstadisticasGenerales(
      resultadosConObservaciones,
      estadisticasPorEstado
    );

    setEstadisticas(estadisticasGenerales);
    setRightTableData(resultadosConObservaciones);
  };

  const handleExportar = () => {
    if (rightTableData.length === 0) {
      alert(
        "No hay datos para exportar. Por favor, realiza primero la comparación."
      );
      return;
    }

    try {
      // Crear un nuevo workbook
      const workbook = XLSX.utils.book_new();

      // Preparar los datos para exportar
      const datosExportar = rightTableData.map((item) => ({
        "Número de serie": item.serial,
        "Estado Excel": item.estadoExcel,
        Coincidencia:
          item.coincidencia === "encontrado" ? "Encontrado" : "No Encontrado",
        Observación: item.observacion || "",
      }));

      // Crear la hoja de trabajo
      const worksheet = XLSX.utils.json_to_sheet(datosExportar);

      // Agregar la hoja al workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Comparación");

      // Generar el archivo Excel
      XLSX.writeFile(
        workbook,
        `inventario_comparacion_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Error al exportar:", error);
      alert("Error al exportar el archivo. Por favor, intenta nuevamente.");
    }
  };

  // Columnas para la tabla de la derecha
  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "Serial",
        cell: ({ row }: { row: any }) => (
          <div className="font-medium">{row.getValue("serial")}</div>
        ),
      },
      {
        accessorKey: "estadoExcel",
        header: "Estado Excel",
        cell: ({ row }: { row: any }) => {
          const estado = row.getValue("estadoExcel") as EstadoPermitido;
          return <div className="font-medium text-gray-700">{estado}</div>;
        },
      },
      {
        accessorKey: "coincidencia",
        header: "Coincidencia",
        cell: ({ row }: { row: any }) => {
          const coincidencia = row.getValue("coincidencia") as string;
          const isEncontrado = coincidencia === "encontrado";
          return (
            <div className="flex items-center gap-2">
              {isEncontrado ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">Encontrado</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">
                    No Encontrado
                  </span>
                </>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "observacion",
        header: "Observación",
        cell: ({ row }: { row: any }) => (
          <div className="text-gray-600">
            {row.getValue("observacion") || "-"}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="h-full flex gap-4 p-4">
      {/* Columna izquierda */}
      <div className="w-2/5 flex flex-col gap-2">
        {/* Botón CARGAR ARCHIVO */}
        <ExcelUploadButton
          onUpload={handleFileUpload}
          buttonText="CARGAR ARCHIVO"
        />

        {/* Tabla editable */}
        <div className="rounded-md border flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">serial</TableHead>
                  <TableHead className="w-1/2">observación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Input
                        value={row.serial}
                        onChange={(e) =>
                          handleCellChange(row.id, "serial", e.target.value)
                        }
                        className="w-full"
                        placeholder="Ingrese serial"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.observacion}
                        onChange={(e) =>
                          handleCellChange(
                            row.id,
                            "observacion",
                            e.target.value
                          )
                        }
                        className="w-full"
                        placeholder="Ingrese observación"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Botón enviar */}
        <Button
          onClick={handleEnviar}
          className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
        >
          enviar
        </Button>
      </div>

      {/* Columna derecha */}
      <div className="w-2/3 flex flex-col gap-4">
        {/* Estadísticas Generales */}
        {estadisticas && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {estadisticas.totalExcel}
                </div>
                <div className="text-sm text-gray-600">Total en Excel</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {estadisticas.totalEncontrados}
                </div>
                <div className="text-sm text-gray-600">Encontrados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {estadisticas.totalNoEncontrados}
                </div>
                <div className="text-sm text-gray-600">No Encontrados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {estadisticas.porcentajeEncontrados}%
                </div>
                <div className="text-sm text-gray-600">Porcentaje</div>
              </div>
            </div>

            {/* Estadísticas por Estado */}
            {estadisticas.porEstado.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Estadísticas por Estado
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {estadisticas.porEstado
                      .filter((est) => est.total > 0)
                      .map((est) => (
                        <div
                          key={est.estado}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="font-semibold text-gray-700 mb-2">
                            {est.estado}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <div className="font-bold text-gray-900">
                                {est.total}
                              </div>
                              <div className="text-xs text-gray-500">Total</div>
                            </div>
                            <div>
                              <div className="font-bold text-green-600">
                                {est.encontrados}
                              </div>
                              <div className="text-xs text-gray-500">
                                Encontrados
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-blue-600">
                                {est.porcentajeEncontrados}%
                              </div>
                              <div className="text-xs text-gray-500">%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Gráfica de Torta - Distribución por Estado */}
                <div className="p-4 bg-white rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Distribución de Equipos por Estado
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={estadisticas.porEstado
                            .filter((est) => est.total > 0)
                            .map((est) => ({
                              name: est.estado,
                              value: est.total,
                              porcentaje: est.porcentajeEncontrados,
                              encontrados: est.encontrados,
                            }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({
                            name,
                            value,
                            porcentaje,
                          }: {
                            name: string;
                            value: number;
                            porcentaje: number;
                          }) =>
                            `${name}: ${value} (${porcentaje.toFixed(
                              1
                            )}% encontrados)`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {estadisticas.porEstado
                            .filter((est) => est.total > 0)
                            .map((est, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORES_POR_ESTADO[est.estado]}
                              />
                            ))}
                        </Pie>
                        <Tooltip
                          formatter={(
                            value: number,
                            name: string,
                            props: any
                          ) => [
                            `${value} equipos`,
                            `${
                              props.payload.name
                            } - ${props.payload.porcentaje.toFixed(
                              1
                            )}% encontrados`,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Leyenda personalizada */}
                  <div className="mt-4 flex flex-wrap gap-4 justify-center">
                    {estadisticas.porEstado
                      .filter((est) => est.total > 0)
                      .map((est) => (
                        <div
                          key={est.estado}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-4 h-4 rounded"
                            style={{
                              backgroundColor: COLORES_POR_ESTADO[est.estado],
                            }}
                          />
                          <span className="text-sm text-gray-700">
                            {est.estado}: {est.total} equipos (
                            {est.porcentajeEncontrados.toFixed(1)}% encontrados)
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Área de tabla */}
        <div className="flex-1 min-h-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          ) : (
            <DataTable
              data={rightTableData}
              columns={columns}
              caption={
                rightTableData.length > 0
                  ? "Resultados de la comparación"
                  : "Los resultados aparecerán aquí después de realizar la comparación"
              }
            />
          )}
        </div>

        {/* Botón Exportar */}
        <Button
          onClick={handleExportar}
          disabled={rightTableData.length === 0}
          className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default Inventario;
