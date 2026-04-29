import { OrderType } from "@/models/order/OrderType";

export interface OrderColumnProps {
  className?: string;
  title: React.ReactNode;
  orders: OrderType[];
  totalOrder?: number;
}
