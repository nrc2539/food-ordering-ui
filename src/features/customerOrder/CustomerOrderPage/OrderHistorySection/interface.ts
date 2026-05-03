import { OrderType } from "@/models/order/OrderType";

export interface WithOrderHistorySectionProps {
  sessionToken: string;
}
export interface OrderHistorySectionProps extends WithOrderHistorySectionProps {
  orderHistory: OrderType[];
  isLoading: boolean;
  isHistoryOpen: boolean;
  handleIsHistoryOpen: (isOpen: boolean) => void;
}
