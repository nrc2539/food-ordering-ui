import { CustomerOrderPage } from "@/features/customerOrder/CustomerOrderPage";
import { getTableSessionByToken } from "@/libs/actions/table-sessions-actions";
import { getCategories } from "@/libs/fetching/category-data";
import { getMenus } from "@/libs/fetching/menu-data";
import { notFound } from "next/navigation";

export default async function CustomerOrder({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const sessionToken = (query["session-token"] || "") as string;

  // check session token is empty string
  if (!sessionToken) {
    notFound();
  }

  const responseCategories = await getCategories();
  const categories = responseCategories.data;
  const responseMenus = await getMenus();
  const menus = responseMenus.data;
  const tableSession = await getTableSessionByToken(sessionToken);

  if (!tableSession) {
    notFound();
  }

  return (
    <CustomerOrderPage
      categories={categories}
      menus={menus}
      tableSession={tableSession}
    />
  );
}
