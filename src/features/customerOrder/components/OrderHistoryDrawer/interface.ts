import { OrderType } from "@/models/order/OrderType";

export interface OrderHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderType[];
}
