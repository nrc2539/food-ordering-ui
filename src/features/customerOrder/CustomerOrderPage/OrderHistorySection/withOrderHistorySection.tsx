import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/libs/constant";
import { OrderResponseType } from "@/models/order/OrderResponseType";

import {
  OrderHistorySectionProps,
  WithOrderHistorySectionProps,
} from "./interface";

async function getOrderByTableSession(
  tableSessionToken: string,
): Promise<OrderResponseType> {
  const res = await axios.get<OrderResponseType>(
    `${API_URL}/orders/table-session/${tableSessionToken}`,
  );
  return res.data;
}

export function withOrderHistorySection(
  Component: React.FC<OrderHistorySectionProps>,
) {
  function WithOrderHistorySection({
    sessionToken,
    ...props
  }: WithOrderHistorySectionProps) {
    const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

    const { data, isLoading, refetch } = useQuery({
      queryKey: ["order-histories", sessionToken],
      queryFn: () => getOrderByTableSession(sessionToken),
    });

    useEffect(() => {
      if (isHistoryOpen) {
        refetch();
      }
    }, [isHistoryOpen, refetch]);

    const componentProps: OrderHistorySectionProps = {
      ...props,
      sessionToken,
      orderHistories: data?.data || [],
      isLoading,
      isHistoryOpen,
      handleIsHistoryOpen: setIsHistoryOpen,
    };
    return <Component {...componentProps} />;
  }
  return WithOrderHistorySection;
}
