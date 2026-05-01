import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { TableFormType } from "@/models/table/TableFormType";
import { TableSessionType } from "@/models/table/TableSessionType";
import { TableType } from "@/models/table/TableType";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

export interface WithTableCardProps {
  data: TableType;
  className?: string;
}
export interface TableCardProps extends WithTableCardProps {
  modalState: TableCardModalStateType;
  isGeneratingQR: boolean;
  handleModalStateChange: (state: TableCardModalStateType) => void;
  handleCloseModal: () => void;
  handleUpdateTable: UseMutateAsyncFunction<
    void,
    Error,
    {
      id: number;
      form: TableFormType;
    },
    unknown
  >;
  handleDeleteTable: UseMutateAsyncFunction<void, Error, number, unknown>;
  handleGenerateQR: UseMutateAsyncFunction<
    TableSessionType,
    Error,
    {
      tableId: number;
      status: TableSessionStatusEnum;
    },
    unknown
  >;
}

export type TableCardModalStateType = {
  type?: "edit" | "delete";
  value?: TableFormType;
};
