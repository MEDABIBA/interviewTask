"use client";
import {
  useDeleteMessageMutation,
  useGetAMessageByIdQuery,
} from "@/app/services/messages";
import MessageForm from "../MessageForm/MessageForm";
import { getColumns } from "../MessageTable/columns";
import MessageTable from "../MessageTable/MessageTable";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";

export const TableClient = () => {
  const [editId, setEditId] = useState<number>();
  const [deleteMessage] = useDeleteMessageMutation();
  const { data }: { data?: { id: number; message: string } } =
    useGetAMessageByIdQuery(editId as unknown as number, {
      skip: editId === null,
    });
  const handleEdit = async (id: number) => {
    setEditId(id);
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await deleteMessage(id);
      console.log("response is:", response);
      console.log("response data is:", response.data);
      if (response) {
        toast.success(response.data.message);
        // console.log(response.data);
      }
    } catch (error) {
      toast.error("Failed to delete message");
      console.error("Error");
    }
  };
  const columns = useMemo(
    () => getColumns(handleDelete, handleEdit),
    [handleDelete]
  );
  return (
    <main>
      <MessageForm data={data} />
      <MessageTable columns={columns} />
    </main>
  );
};
