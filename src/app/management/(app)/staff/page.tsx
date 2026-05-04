import StaffPage from "@/features/staff/StaffPage";
import { PaginationType } from "@/interfaces/PaginationType";

export default async function Staff({
  searchParams,
}: {
  searchParams: Promise<PaginationType>;
}) {
  const pageSearchParams = await searchParams;
  return <StaffPage searchParams={pageSearchParams} />;
}
