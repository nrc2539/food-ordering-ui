"use server";

import api from "@/libs/axios";
import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { PaginationType } from "@/interfaces/PaginationType";
import { TableResponseType } from "@/models/table/TableResponseType";
import { TableSessionType } from "@/models/table/TableSessionType";
import { TableType } from "@/models/table/TableType";

async function getTableSessions(
  params?: PaginationType,
): Promise<TableResponseType> {
  const response = await api.get<TableType[]>("/table-sessions", { params });
  return {
    data: response.data,
  };
}

async function getTableSession(id: number): Promise<TableSessionType> {
  const response = await api.get(`/table-sessions/${id}`);
  return response.data;
}

async function createTableSession(bodyReq: {
  tableId: number;
  status: TableSessionStatusEnum;
}): Promise<TableSessionType> {
  const response = await api.post<TableSessionType>("/table-sessions", bodyReq);
  return response.data;
}

async function updateTableSession(params: {
  id: number;
  status: TableSessionStatusEnum;
}): Promise<void> {
  const updateData = {
    status: params.status,
  };
  await api.patch(`/table-sessions/${params.id}`, updateData);
}

async function getTableSessionByToken(
  token: string,
): Promise<TableSessionType> {
  const response = await api.get<TableSessionType>(
    `/table-sessions/session-tokens/${token}`,
  );
  return response.data;
}

export {
  getTableSessions,
  getTableSession,
  getTableSessionByToken,
  createTableSession,
  updateTableSession,
};
