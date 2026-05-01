"use server";

import { revalidatePath } from "next/cache";

import api from "@/libs/axios";
import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { TableSessionType } from "@/models/table/TableSessionType";

async function createTableSession(bodyReq: {
  tableId: number;
  status: TableSessionStatusEnum;
}): Promise<TableSessionType> {
  const response = await api.post<TableSessionType>("/table-sessions", bodyReq);
  revalidatePath("/management/tables");
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

export { getTableSessionByToken, createTableSession, updateTableSession };
