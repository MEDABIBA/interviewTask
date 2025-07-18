"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Message } from "../../types/types";

export type Column = {
  id: string;
  message: string;
};
export const getColumns = (
  onDelete: (id: number) => Promise<void>,
  onEdit: (id: number) => Promise<void>
): ColumnDef<Message>[] => [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "message",
    header: "message",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const message = row.original;
      // console.log(message);
      // const payment = row.original
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
                onEdit(message.id);
              }}>
              Edit message
            </DropdownMenuItem>
            <DropdownMenuItem
              style={{ color: "red" }}
              onClick={() => {
                onDelete(message.id);
              }}>
              Delete message
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
