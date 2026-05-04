import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { OrderType } from "@/models/order/OrderType";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";

export interface WithOrderHistoryListProps {
  className?: string;
  orderHistories: OrderType[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface OrderHistoryListProps extends WithOrderHistoryListProps {
  modalState: OrderHistoryListModalStateType;
  handleModalStateChange: (state: OrderHistoryListModalStateType) => void;
  handleCloseModal: () => void;
  handleDeleteOrder: UseMutateAsyncFunction<void, Error, number, unknown>;
  handleChangePage: (page: number) => void;
}

export type OrderHistoryListModalStateType = {
  type?: "delete";
  value?: { id: number; status: OrderStatusEnum };
};
