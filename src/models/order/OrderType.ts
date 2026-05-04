import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { TableSessionType } from "../table/TableSessionType";
import { OrderItemType } from "./OrderItemType";
import { UserType } from "../user/UserType";

export interface OrderType {
  id: number;
  tableSession: TableSessionType;
  orderItems: OrderItemType[];
  totalPrice: number;
  status: OrderStatusEnum;
  createdAt: string; // ISO datetime strimg
  updatedAt?: string; // ISO datetime string
  updatedBy?: UserType;
}
