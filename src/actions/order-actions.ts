"use server";

import api from "@/libs/axios";
import { OrderType } from "@/models/order/OrderType";
import { CartItemType } from "@/models/cart/CartItemType";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";

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

export { createOrder, updateOrder, deleteOrder };
