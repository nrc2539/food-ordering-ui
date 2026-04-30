"use server";

import api from "@/libs/axios";
import { OrderType } from "@/models/order/OrderType";
import { OrderResponseType } from "@/models/order/OrderResponseType";
import { PaginationType } from "@/interfaces/PaginationType";
import { CartItemType } from "@/models/cart/CartItemType";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";

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

async function createOrder(params: {
  tableSessionToken: string;
  items: CartItemType[];
}): Promise<OrderType> {
  const createData = {
    tableSessionToken: params.tableSessionToken,
    items: params.items,
  };

  const response = await api.post<OrderType>("/orders", createData);
  return response.data;
}

async function updateOrder({
  id,
  status,
  items,
}: {
  id: number;
  status: OrderStatusEnum;
  items?: CartItemType[];
}): Promise<void> {
  const updateData = {
    status,
    items: items?.map((v) => ({ menuItemId: v.menu.id, quantity: v.quantity })),
  };

  await api.patch(`/orders/${id}`, updateData);
}

async function deleteOrder(id: number): Promise<void> {
  await api.delete(`/orders/${id}`);
}

async function getOrderByTableSession(
  tableSessionToken: string,
): Promise<OrderResponseType> {
  const res = await api.get<OrderType[]>(
    `/orders/table-sessions/${tableSessionToken}`,
  );
  return { data: res.data };
}

export {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByTableSession,
};
