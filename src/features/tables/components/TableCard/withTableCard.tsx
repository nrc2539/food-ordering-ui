import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { TableFormType } from "@/models/table/TableFormType";
import { deleteTable, updateTable } from "@/libs/actions/table-actions";
import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { createTableSession } from "@/libs/actions/table-sessions-actions";

import {
  TableCardModalStateType,
  TableCardProps,
  WithTableCardProps,
} from "./interface";

export function withTableCard(Component: React.FC<TableCardProps>) {
  function WithTableCard(props: WithTableCardProps) {
    const [modalState, setModalState] = useState<TableCardModalStateType>({
      type: undefined,
      value: undefined,
    });

    const { mutateAsync: handleUpdateTable } = useMutation({
      mutationFn: (params: { id: number; form: TableFormType }) =>
        updateTable(params),
    });
    const { mutateAsync: handleDeleteTable } = useMutation({
      mutationFn: (id: number) => deleteTable(id),
    });
    const { mutateAsync: handleGenerateQR, isPending: isGeneratingQR } =
      useMutation({
        mutationFn: (params: {
          tableId: number;
          status: TableSessionStatusEnum;
        }) => createTableSession(params),
      });

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const componentProps: TableCardProps = {
      ...props,
      modalState,
      isGeneratingQR,
      handleModalStateChange: setModalState,
      handleCloseModal,
      handleUpdateTable,
      handleDeleteTable,
      handleGenerateQR,
    };
    return <Component {...componentProps} />;
  }
  return WithTableCard;
}
