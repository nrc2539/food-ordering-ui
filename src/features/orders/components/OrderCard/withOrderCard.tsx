import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { OrderCardProps, WithOrderCardProps } from "./interface";

export function withOrderCard(Component: React.FC<OrderCardProps>) {
  function WithOrderCard({ order, ...props }: WithOrderCardProps) {
    function markInProgress() {
      if (order.status !== OrderStatusEnum.PENDING) return;
    }

    function markComplete() {
      if (order.status !== OrderStatusEnum.IN_PROGRESS) return;
    }

    function markCancelled() {
      if (order.status !== OrderStatusEnum.PENDING) return;
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
