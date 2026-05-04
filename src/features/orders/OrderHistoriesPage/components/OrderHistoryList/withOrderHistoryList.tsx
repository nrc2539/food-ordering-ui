import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { deleteOrder } from "@/libs/actions/order-actions";

import {
  OrderHistoryListModalStateType,
  OrderHistoryListProps,
  WithOrderHistoryListProps,
} from "./interface";

export function withOrderHistoryList(
  Component: React.FC<OrderHistoryListProps>,
) {
  function WithOrderHistoryList(props: WithOrderHistoryListProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [modalState, setModalState] =
      useState<OrderHistoryListModalStateType>({
        type: undefined,
        value: undefined,
      });

    const { mutateAsync: handleDeleteOrder } = useMutation({
      mutationFn: (id: number) => deleteOrder(id),
    });

    function handleChangePage(page: number) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const componentProps: OrderHistoryListProps = {
      ...props,
      modalState,

      handleModalStateChange: setModalState,
      handleCloseModal,

      handleDeleteOrder,
      handleChangePage,
    };
    return <Component {...componentProps} />;
  }
  return WithOrderHistoryList;
}
