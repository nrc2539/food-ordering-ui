import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { PaginationType } from "@/interfaces/PaginationType";

export interface OrderHistoriesPageProps {
  searchParams: OrderHistoriesSearchParamsType;
}

export interface OrderHistoriesSearchParamsType extends PaginationType {
  status?: OrderStatusEnum;
  startAt?: string;
  endAt?: string;
}
