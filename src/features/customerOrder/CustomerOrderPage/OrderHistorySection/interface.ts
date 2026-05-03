import { OrderType } from "@/models/order/OrderType";

export interface WithOrderHistorySectionProps {
  sessionToken: string;
}
export interface OrderHistorySectionProps extends WithOrderHistorySectionProps {
  orderHistories: OrderType[];
  isLoading: boolean;
  isHistoryOpen: boolean;
  handleIsHistoryOpen: (isOpen: boolean) => void;
}
