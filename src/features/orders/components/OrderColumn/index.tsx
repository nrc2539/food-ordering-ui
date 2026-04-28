import React from "react";
import { OrderColumnProps } from "./inteface";
import { OrderCard } from "../OrderCard";
import { cn } from "@/libs/utils";

function OrderColumn({ className, title, orders }: OrderColumnProps) {
  return (
    <div
      className={cn(
        "h-full flex flex-col space-y-2 px-3  py-2 overflow-y-auto rounded-lg",
        className,
      )}
    >
      <h2 className="text-xl font-medium">{title}</h2>
      {orders.map((v) => (
        <OrderCard key={v.id} order={v} />
      ))}
    </div>
  );
}

export default OrderColumn;
