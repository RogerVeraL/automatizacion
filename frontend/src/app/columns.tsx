"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { User } from "./users";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { DataPlateColumnHeader } from "@/components/ui/datablate-column-header";

export const columns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: ({ column }) => <DataPlateColumnHeader title="Name" column={column} />,
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return (
        <a
          href={`mailto:${row.getValue("email")}`}
          className="font-medium text-blue-500 hover:underline"
        >
          {row.getValue("email")}
        </a>
      );
    },
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(String(row.original.id))
            }}
          >
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Ver usuario
          </DropdownMenuItem>
          <DropdownMenuItem>
            Editar usuario
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    },
  },
];
