import OrderHistoriesPage from "@/features/orders/OrderHistoriesPage";
import { OrderHistoriesSearchParamsType } from "@/features/orders/OrderHistoriesPage/interface";

export default async function OrderHistories({
  searchParams,
}: {
  searchParams: Promise<OrderHistoriesSearchParamsType>;
}) {
  const pageSearchParams = await searchParams;
  return <OrderHistoriesPage searchParams={pageSearchParams} />;
}
