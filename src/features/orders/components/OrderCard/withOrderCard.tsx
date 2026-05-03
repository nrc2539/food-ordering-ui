import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { updateOrder } from "@/libs/actions/order-actions";
import { useAlertNotification } from "@/hooks/useAlertNotification";
import { CartItemType } from "@/features/customerOrder/components/CartFloatSection/interface";

import { OrderCardProps, WithOrderCardProps } from "./interface";

export function withOrderCard(Component: React.FC<OrderCardProps>) {
  function WithOrderCard({ order, ...props }: WithOrderCardProps) {
    const alertNotification = useAlertNotification();
    const queryClient = useQueryClient();

    function onSuccessUpdate() {
      alertNotification.success({
        message: "Update order successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }

    function onErrorUpdate() {
      alertNotification.success({ message: "Update order failed." });
    }

    const { mutateAsync: handleUpdateOrder } = useMutation({
      mutationFn: (params: {
        id: number;
        status: OrderStatusEnum;
        items?: CartItemType[];
      }) => updateOrder(params),
      onSuccess: onSuccessUpdate,
      onError: onErrorUpdate,
    });

    async function markInProgress() {
      if (order.status !== OrderStatusEnum.PENDING) return;
      await handleUpdateOrder({
        id: order.id,
        status: OrderStatusEnum.IN_PROGRESS,
      });
    }

    async function markComplete() {
      if (order.status !== OrderStatusEnum.IN_PROGRESS) return;
      await handleUpdateOrder({
        id: order.id,
        status: OrderStatusEnum.COMPLETED,
      });
    }

    async function markCancelled() {
      if (order.status !== OrderStatusEnum.PENDING) return;
      await handleUpdateOrder({
        id: order.id,
        status: OrderStatusEnum.CANCELLED,
      });
    }

    const componentProps: OrderCardProps = {
      ...props,
      order,
      markInProgress,
      markComplete,
      markCancelled,
    };
    return <Component {...componentProps} />;
  }
  return WithOrderCard;
}
