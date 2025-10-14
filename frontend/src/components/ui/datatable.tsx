"use client";

import React, { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// eslint-disable-next-line import/no-unresolved
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: any[];
  caption?: string;
  globalFilterColumn?: string;
}

export default function DataTable<TData, TValue>({
  data,
  columns,
  caption,
  globalFilterColumn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
  const tableRef = React.useRef<HTMLTableElement | null>(null);
  const bottomScrollRef = React.useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = React.useState<number>(0);
  const isSyncingRef = React.useRef<boolean>(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
  });

  React.useEffect(() => {
    const updateWidth = () => {
      const tbl = tableRef.current;
      if (!tbl) return;
      const scrollWidth = tbl.scrollWidth;
      setContentWidth(scrollWidth);
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (tableRef.current) {
      ro.observe(tableRef.current);
    }
    return () => ro.disconnect();
  }, []);

  const handleBottomScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = (
        e.target as HTMLDivElement
      ).scrollLeft;
    }
    isSyncingRef.current = false;
  };

  return (
    <div className="space-y-4">
      {globalFilterColumn && (
        <Input
          placeholder="Buscar..."
          value={
            (table.getColumn(globalFilterColumn)?.getFilterValue() as string) ??
            ""
          }
          onChange={(e) =>
            table.getColumn(globalFilterColumn)?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      )}
      <div className="rounded-md border">
        <div
          ref={tableContainerRef}
          className="max-h-[70vh] overflow-y-auto overflow-x-hidden"
        >
          <Table ref={tableRef} className="min-w-[1600px]">
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: any) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Bottom horizontal scrollbar - sticky & always visible */}
      <div className="sticky bottom-0 z-10 bg-background">
        <div
          ref={bottomScrollRef}
          className="w-full overflow-x-scroll h-6"
          onScroll={handleBottomScroll}
          aria-hidden
          style={{ scrollbarGutter: "stable both-edges" as any }}
        >
          <div style={{ width: contentWidth }} />
        </div>
      </div>
    </div>
  );
}
