import { OrderType } from "@/models/order/OrderType";
import api from "@/libs/axios";
import { OrderResponseType } from "@/models/order/OrderResponseType";
import { PaginationType } from "@/interfaces/PaginationType";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";

async function getOrder(id: number): Promise<OrderType> {
  const response = await api.get<OrderType>(`/orders/${id}`);
  return response.data;
}

async function getOrderManagementHistories(
  params?: PaginationType & {
    status?: OrderStatusEnum;
    startAt?: string; // ISO Date string
    endAt?: string; // ISO Date string
  },
): Promise<OrderResponseType> {
  const response = await api.get<OrderResponseType>("/orders", { params });
  return response.data;
}

export { getOrder, getOrderManagementHistories };
