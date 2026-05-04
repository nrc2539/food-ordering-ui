import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

import { isNaNValue } from "@/libs/utils";
import { DEFAULT_PAGE, DEFAULT_PERPAGE } from "@/libs/constant";
import { getOrderManagementHistories } from "@/libs/fetching/order-data";

import { OrderHistoryList } from "./components/OrderHistoryList";
import { OrderHistoriesPageProps } from "./interface";

async function OrderHistoriesPage({ searchParams }: OrderHistoriesPageProps) {
  const page =
    !!searchParams.page && !isNaNValue(searchParams.page)
      ? Number(searchParams.page)
      : DEFAULT_PAGE;
  const limit =
    !!searchParams?.limitPerPage && !isNaNValue(searchParams.limitPerPage)
      ? Number(searchParams.limitPerPage)
      : DEFAULT_PERPAGE;

  const orderHistories = await getOrderManagementHistories({
    limitPerPage: limit,
    page,
  });

  return (
    <section className="h-full">
      <div className="mb-5 flex items-center space-x-4">
        <Link href={"/management/orders"}>
          <IconArrowLeft className="size-8" />
        </Link>
        <h1 className="text-3xl font-medium">Orders Management Histories</h1>
      </div>
      <OrderHistoryList
        className="w-full"
        orderHistories={orderHistories.data}
        currentPage={orderHistories.meta?.currentPage || 1}
        totalItems={orderHistories.meta?.totalItems || 0}
        pageSize={orderHistories.meta?.itemsPerPage || 1}
      />
    </section>
  );
}

export default OrderHistoriesPage;
