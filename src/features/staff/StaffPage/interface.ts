import { PaginationType } from "@/interfaces/PaginationType";

export interface StaffPageProps {
  searchParams: PaginationType & { roleIds?: number[] };
}
