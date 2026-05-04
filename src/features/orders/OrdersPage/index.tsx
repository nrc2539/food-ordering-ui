"use client";

import Link from "next/link";
import { Button } from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { OrderStatusEnum, orderStatusLabel } from "@/enums/OrderStatusEnum";
import { OrderType } from "@/models/order/OrderType";
import { PaginationType } from "@/interfaces/PaginationType";
import { OrderResponseType } from "@/models/order/OrderResponseType";

import OrderColumn from "../components/OrderColumn";
import { DateTime } from "luxon";
import { useAuthentication } from "@/providers/AuthenticationProvider";

const INTERVAL_POLLING = 5 * 1000; // 5 seconds

async function getOrders(
  params?: PaginationType & {
    status?: OrderStatusEnum;
    startAt?: string; // ISO Date string
    endAt?: string; // ISO Date string
  },
): Promise<OrderResponseType> {
  const response = await axios.get<OrderResponseType>(
    "/api/management/orders",
    { params },
  );

  return response.data;
}

function OrdersPage() {
  const { user } = useAuthentication();
  const isAdmin = user?.role.name === "admin";
  function filterOrderByStatus(
    status: OrderStatusEnum,
    orders: OrderType[],
  ): OrderType[] {
    return orders.filter((v) => v.status === status);
  }

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      getOrders({
        all: true,
        startAt:
          DateTime.fromJSDate(new Date()).startOf("day").toISO() ?? undefined,
        endAt:
          DateTime.fromJSDate(new Date()).endOf("day").toISO() ?? undefined,
      }),
    refetchInterval: INTERVAL_POLLING,
  });

  const orders = data?.data || [];

  return (
    <section className="h-full">
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Orders Management</h1>
        {isAdmin && (
          <Link href={"/management/orders/histories"}>
            <Button type="link" className="underline">
              See histories order
            </Button>
          </Link>
        )}
      </div>
      <div className="h-full max-h-[calc(100%-20px-36px)] grid grid-cols-4 gap-4">
        <OrderColumn
          className="bg-amber-200"
          title={orderStatusLabel[OrderStatusEnum.PENDING]}
          orders={filterOrderByStatus(OrderStatusEnum.PENDING, orders)}
          totalOrder={
            filterOrderByStatus(OrderStatusEnum.PENDING, orders).length
          }
        />
        <OrderColumn
          className="bg-blue-200"
          title={orderStatusLabel[OrderStatusEnum.IN_PROGRESS]}
          orders={filterOrderByStatus(OrderStatusEnum.IN_PROGRESS, orders)}
          totalOrder={
            filterOrderByStatus(OrderStatusEnum.IN_PROGRESS, orders).length
          }
        />
        <OrderColumn
          className="bg-green-200"
          title={orderStatusLabel[OrderStatusEnum.COMPLETED]}
          orders={filterOrderByStatus(OrderStatusEnum.COMPLETED, orders)}
          totalOrder={
            filterOrderByStatus(OrderStatusEnum.COMPLETED, orders).length
          }
        />
        <OrderColumn
          className="bg-red-200"
          title={orderStatusLabel[OrderStatusEnum.CANCELLED]}
          orders={filterOrderByStatus(OrderStatusEnum.CANCELLED, orders)}
          totalOrder={
            filterOrderByStatus(OrderStatusEnum.CANCELLED, orders).length
          }
        />
      </div>
    </section>
  );
}

export default OrdersPage;
