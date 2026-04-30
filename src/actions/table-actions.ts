"use server";

import api from "@/libs/axios";
import { TableType } from "@/models/table/TableType";
import { TableFormType } from "@/models/table/TableFormType";
import { PaginationType } from "@/interfaces/PaginationType";
import { TableResponseType } from "@/models/table/TableResponseType";

async function getAllTables(
  params?: PaginationType,
): Promise<TableResponseType> {
  const response = await api.get<TableType[]>("/tables", {
    params,
  });
  return { data: response.data };
}

async function getTable(id: number): Promise<TableType> {
  const response = await api.get<TableType>(`/tables/${id}`);
  return response.data;
}

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

export { getAllTables, getTable, createTable, updateTable, deleteTable };
