import { PaginationType } from "@/interfaces/PaginationType";
import { TableType } from "@/models/table/TableType";
import { TableResponseType } from "@/models/table/TableResponseType";
import api from "@/libs/axios";

async function getTables(params?: PaginationType): Promise<TableResponseType> {
  const response = await api.get<TableType[]>("/tables", {
    params,
  });
  return { data: response.data };
}

async function getTable(id: number): Promise<TableType> {
  const response = await api.get<TableType>(`/tables/${id}`);
  return response.data;
}

export { getTables, getTable };
