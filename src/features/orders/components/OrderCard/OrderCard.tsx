import { Button } from "antd";

import { formatDate } from "@/libs/utils";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { OrderCardProps } from "./interface";

function OrderCard({
  order,
  markInProgress,
  markComplete,
  markCancelled,
}: OrderCardProps) {
  return (
    <div className="bg-white rounded-md p-3">
      <div className="mb-3 text-sm flex flex-col space-y-1">
        <p>Order ID : {order.id}</p>
        <p>
          Created at :&nbsp;
          <span className="text-xs">
            {formatDate(order.createdAt, "dd/MM/yyyy HH:mm")}
          </span>
        </p>
        <p>Table: {order.tableSession.table.name}</p>
        {order.orderItems.map((orderItem) => (
          <p key={orderItem.id}>
            {orderItem.quantity}x {orderItem.menuItem.name}
          </p>
        ))}
      </div>
      {order.status === OrderStatusEnum.PENDING && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={markCancelled}
            className="hover:border-red-500 text-red-600"
          >
            Cancelled
          </Button>
          <Button type="primary" onClick={markInProgress}>
            In progress
          </Button>
        </div>
      )}
      {order.status === OrderStatusEnum.IN_PROGRESS && (
        <Button
          onClick={markComplete}
          type="primary"
          className="w-full bg-green-600 border-green-600"
        >
          Complete
        </Button>
      )}
      {order.status === OrderStatusEnum.COMPLETED && (
        <Button disabled className="w-full bg-green-200">
          Completed
        </Button>
      )}
      {order.status === OrderStatusEnum.CANCELLED && (
        <Button disabled className="w-full bg-red-200">
          Cancelled
        </Button>
      )}
    </div>
  );
}

export default OrderCard;
