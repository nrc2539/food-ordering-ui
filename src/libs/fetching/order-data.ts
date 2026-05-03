import { OrderType } from "@/models/order/OrderType";
import api from "@/libs/axios";

async function getOrder(id: number): Promise<OrderType> {
  const response = await api.get<OrderType>(`/orders/${id}`);
  return response.data;
}

export { getOrder };
