"use client";

import { useState, useEffect } from "react";
import DataTable from "../ui/datatable";
import { columns } from "../../app/columns";
import { getUsers } from "../../app/users";
import { User } from "../../app/users";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, X } from "lucide-react";

interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const Proceso1 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const addFilter = () => {
    const newFilter: Filter = {
      id: Date.now().toString(),
      field: "nombre",
      operator: "contains",
      value: "",
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const updateFilter = (id: string, field: keyof Filter, value: string) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, [field]: value } : filter
      )
    );
  };

  const fieldOptions = [
    { value: "nombre", label: "Nombre" },
    { value: "cedula_empleado", label: "Cédula Empleado" },
    { value: "service_req_number", label: "Service Req Number" },
    { value: "tipo_de_contrato", label: "Tipo De Contrato" },
    { value: "estado_del_caso", label: "Estado Del Caso" },
    { value: "fecha_creacion", label: "Fecha Creación" },
    { value: "fecha_cierre", label: "Fecha Cierre" },
    { value: "kpi", label: "KPI" },
  ];

  const operatorOptions = [
    { value: "contains", label: "contiene el siguiente valor:" },
    { value: "not_contains", label: "no contiene el siguiente valor:" },
    { value: "equals", label: "es el siguiente valor:" },
    { value: "not_equals", label: "no es el siguiente valor:" },
    { value: "starts_with", label: "comienza con el siguiente valor:" },
    { value: "not_starts_with", label: "no comienza con el siguiente valor:" },
    { value: "ends_with", label: "termina con el siguiente valor:" },
    { value: "not_ends_with", label: "no termina con el siguiente valor:" },
    { value: "empty", label: "está vacío" },
  ];

  if (isLoading) {
    return (
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[70vw] rounded-md border p-4"
      role="region"
      aria-label="Tabla de usuarios con filtros avanzados"
      tabIndex={0}
    >
      {/* Filtros dinámicos */}
      <div className="mb-4 space-y-3">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center gap-2 bg-gray-50 p-3 rounded-md"
          >
            <select
              value={filter.field}
              onChange={(e) => updateFilter(filter.id, "field", e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            >
              {fieldOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filter.operator}
              onChange={(e) =>
                updateFilter(filter.id, "operator", e.target.value)
              }
              className="px-3 py-1 border rounded text-sm"
            >
              {operatorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {filter.operator !== "empty" && (
              <Input
                placeholder="Introducir..."
                value={filter.value}
                onChange={(e) =>
                  updateFilter(filter.id, "value", e.target.value)
                }
                className="flex-1"
              />
            )}

            <Button
              onClick={() => removeFilter(filter.id)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Botón Aplicar filtros */}
        {filters.length > 0 && (
          <div className="flex justify-end">
            <Button className="bg-[#ee2b7b] hover:bg-[#ee2b7b] text-white">
              Aplicar
            </Button>
          </div>
        )}
      </div>

      {/* Tabla de datos */}
      <div className="h-[80vh]">
        <DataTable
          data={users}
          columns={columns}
          caption="Lista de usuarios"
          globalFilterColumn="nombre"
          searchButton={
            <Button
              onClick={addFilter}
              className="bg-[#ee2b7b] hover:bg-[#ee2b7b] text-white rounded-full w-8 h-8 p-0 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Proceso1;
