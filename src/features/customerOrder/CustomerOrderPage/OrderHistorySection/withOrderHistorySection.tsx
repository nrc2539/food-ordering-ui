import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/libs/constant";
import { OrderType } from "@/models/order/OrderType";
import { OrderResponseType } from "@/models/order/OrderResponseType";

import {
  OrderHistorySectionProps,
  WithOrderHistorySectionProps,
} from "./interface";

async function getOrderByTableSession(
  tableSessionToken: string,
): Promise<OrderResponseType> {
  const res = await axios.get<OrderType[]>(
    `${API_URL}/orders/table-session/${tableSessionToken}`,
  );
  return { data: res.data };
}

export function withOrderHistorySection(
  Component: React.FC<OrderHistorySectionProps>,
) {
  function WithOrderHistorySection({
    sessionToken,
    ...props
  }: WithOrderHistorySectionProps) {
    const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

    const { data, isLoading } = useQuery({
      queryKey: ["order-histories", sessionToken],
      queryFn: () => getOrderByTableSession(sessionToken),
    });

    const componentProps: OrderHistorySectionProps = {
      ...props,
      sessionToken,
      orderHistory: data?.data || [],
      isLoading,
      isHistoryOpen,
      handleIsHistoryOpen: setIsHistoryOpen,
    };
    return <Component {...componentProps} />;
  }
  return WithOrderHistorySection;
}
