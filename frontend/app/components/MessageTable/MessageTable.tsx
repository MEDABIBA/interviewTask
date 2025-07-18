"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllMessagesQuery } from "@/app/services/messages";
import { useMemo, useState } from "react";
import { PaginationLinkDashboard } from "../PaginationLinkDashboard/PaginationLinkDashboard";
import { Message } from "../../types/types";
interface DataTableProps {
  columns: ColumnDef<Message>[];
}

const MessageTable = ({ columns }: DataTableProps) => {
  const [page, setPage] = useState<number>(1);
  let limit = 2;
  const {
    data = [],
    error,
    isLoading,
  } = useGetAllMessagesQuery(undefined, {
    pollingInterval: 2000,
  });
  const totalPages = Math.ceil(data!.length / limit);
  const paginated = useMemo(() => {
    let start = (page - 1) * limit;
    let end = limit + start;
    return data?.slice(start, end);
  }, [data, page]);
  const table = useReactTable({
    data: paginated ? paginated : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No elements
              </TableCell>
            </TableRow>
          )}
          <PaginationLinkDashboard
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </TableBody>
      </Table>
    </div>
  );
};
export default MessageTable;
