import MenusPage from "@/features/menus/MenusPage";
import { PaginationType } from "@/interfaces/PaginationType";

export default async function Menus({
  searchParams,
}: {
  searchParams: Promise<PaginationType>;
}) {
  const pageSearchParams = await searchParams;
  return <MenusPage searchParams={pageSearchParams} />;
}
