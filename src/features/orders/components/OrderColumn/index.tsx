import { Badge, Empty } from "antd";

import { cn } from "@/libs/utils";
import { OrderColumnProps } from "./inteface";
import { OrderCard } from "../OrderCard";

function OrderColumn({
  className,
  title,
  orders,
  totalOrder = 0,
}: OrderColumnProps) {
  return (
    <div
      className={cn(
        "h-full flex flex-col space-y-2 px-3  py-2 overflow-y-auto rounded-lg",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <Badge className="bg-blue" count={totalOrder} showZero />
      </div>

      {orders.length ? (
        orders.map((v) => <OrderCard key={v.id} order={v} />)
      ) : (
        <Empty className="mt-5 lowercase" description={`no order ${title}`} />
      )}
    </div>
  );
}

export default OrderColumn;
