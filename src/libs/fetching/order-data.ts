import { OrderResponseType } from "@/models/order/OrderResponseType";
import { OrderType } from "@/models/order/OrderType";
import { PaginationType } from "@/interfaces/PaginationType";
import api from "@/libs/axios";

async function getOrders(
  params?: PaginationType & {
    startAt: string; // ISO Date string
    endAt?: string; // ISO Date string
  },
): Promise<OrderResponseType> {
  const response = await api.get<OrderType[]>("/orders", { params });
  return { data: response.data };
}

async function getOrder(id: number): Promise<OrderType> {
  const response = await api.get<OrderType>(`/orders/${id}`);
  return response.data;
}

async function getOrderByTableSession(
  tableSessionToken: string,
): Promise<OrderResponseType> {
  const res = await api.get<OrderType[]>(
    `/orders/table-sessions/${tableSessionToken}`,
  );
  return { data: res.data };
}

export { getOrders, getOrder, getOrderByTableSession };
