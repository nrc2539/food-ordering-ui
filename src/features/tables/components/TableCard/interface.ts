import { TableFormType } from "@/models/table/TableFormType";
import { TableType } from "@/models/table/TableType";

export interface WithTableCardProps {
  table: TableType;
  className?: string;
}
export interface TableCardProps extends WithTableCardProps {
  modalState: TableCardModalStateType;
  handleModalStateChange: (state: TableCardModalStateType) => void;
}

export type TableCardModalStateType = {
  type?: "edit" | "delete";
  value?: TableFormType;
};
