import { TableFormType } from "@/models/table/TableFormType";
import { TableType } from "@/models/table/TableType";

export interface WithTableCardProps {
  data: TableType;
  className?: string;
}
export interface TableCardProps extends WithTableCardProps {
  modalState: TableCardModalStateType;
  handleModalStateChange: (state: TableCardModalStateType) => void;
  handleCloseModal: () => void;
}

export type TableCardModalStateType = {
  type?: "edit" | "delete";
  value?: TableFormType;
};
