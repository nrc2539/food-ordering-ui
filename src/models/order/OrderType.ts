import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { TableSessionType } from "../table/TableSessionType";
import { OrderItemType } from "./OrderItemType";

export interface OrderType {
  id: number;
  tableSession: TableSessionType;
  orderItems: OrderItemType[];
  totalPrice: number;
  status: OrderStatusEnum;
  createdAt: string; // ISO datetime strimg
}
