import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { TableType } from "./TableType";

export interface TableSessionType {
  id: number;
  sessionToken: string;
  table: TableType;
  status: TableSessionStatusEnum;
}
