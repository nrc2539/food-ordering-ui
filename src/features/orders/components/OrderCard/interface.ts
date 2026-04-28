import { OrderType } from "@/models/order/OrderType";

export interface WithOrderCardProps {
  className?: string;
  order: OrderType;
}

export interface OrderCardProps extends WithOrderCardProps {
  markCancelled: () => void;
  markInProgress: () => void;
  markComplete: () => void;
}
