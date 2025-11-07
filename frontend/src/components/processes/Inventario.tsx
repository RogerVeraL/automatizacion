"use client";

import React, { useState } from "react";
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
import { Upload } from "lucide-react";
import DataTable from "../ui/datatable";
import ExcelUploadButton from "../ui/excel-upload-button";
import LoadingSpinner from "../ui/loading-spinner";

interface InventarioRow {
  id: string;
  serial: string;
  observacion: string;
}

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

  const [rightTableData, setRightTableData] = useState<any[]>([]);

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
    // Aquí puedes agregar la lógica para procesar el archivo Excel
    console.log("Procesando archivo:", file.name);
    // TODO: Implementar lógica para procesar el archivo y actualizar los datos
  };

  const handleEnviar = () => {
    // TODO: Implementar lógica para enviar datos
    console.log("Enviar datos:", rows);
  };

  const handleExportar = () => {
    // TODO: Implementar lógica para exportar
    console.log("Exportar datos");
  };

  // Columnas vacías para la tabla de la derecha
  const emptyColumns: any[] = [];

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
        {/* Área de tabla vacía */}
        <div className="flex-1 min-h-0">
          <DataTable data={rightTableData} columns={emptyColumns} />
        </div>

        {/* Botón Exportar */}
        <Button
          onClick={handleExportar}
          className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
        >
          <Upload className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default Inventario;
