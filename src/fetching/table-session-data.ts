import { PaginationType } from "@/interfaces/PaginationType";
import { TableSessionType } from "@/models/table/TableSessionType";
import { TableSessionResponseType } from "@/models/table/TableSessionResponseType";
import api from "@/libs/axios";

async function getTableSessions(
  params?: PaginationType,
): Promise<TableSessionResponseType> {
  const response = await api.get<TableSessionType[]>("/table-sessions", {
    params,
  });
  return {
    data: response.data,
  };
}

async function getTableSession(id: number): Promise<TableSessionType> {
  const response = await api.get(`/table-sessions/${id}`);
  return response.data;
}

export { getTableSessions, getTableSession };
