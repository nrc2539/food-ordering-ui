"use server";

import api from "@/libs/axios";
import { TableType } from "@/models/table/TableType";
import { TableFormType } from "@/models/table/TableFormType";

async function createTable(form: TableFormType): Promise<TableType> {
  const createData = {
    name: form.name,
  };

  const response = await api.post<TableType>("/tables", createData);
  return response.data;
}

async function updateTable({
  id,
  form,
}: {
  id: number;
  form: TableFormType;
}): Promise<void> {
  const updateData = {
    name: form.name,
  };

  await api.patch(`/tables/${id}`, updateData);
}

async function deleteTable(id: number): Promise<void> {
  await api.delete(`/tables/${id}`);
}

export { createTable, updateTable, deleteTable };
