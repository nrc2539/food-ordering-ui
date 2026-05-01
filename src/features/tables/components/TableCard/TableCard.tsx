"use client";

import {
  IconPencilCog,
  IconQrcode,
  IconTrashXFilled,
} from "@tabler/icons-react";
import { Button, Card, QRCode, Tag } from "antd";
import { useMutation } from "@tanstack/react-query";

import ConfirmModal from "@/components/ConfirmModal";
import { deleteTable, updateTable } from "@/libs/actions/table-actions";
import { TableFormType } from "@/models/table/TableFormType";
import { useAlertNotification } from "@/hooks/useAlertNotification";

import { TableCardProps } from "./interface";
import TableFormModal from "../TableFormModal";
import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { createTableSession } from "@/libs/actions/table-sessions-actions";
import { BASE_URL } from "@/libs/constant";
import { cn } from "@/libs/utils";
import { useAuthentication } from "@/providers/AuthenticationProvider";

function TableCard({
  data,
  modalState,
  handleModalStateChange,
  handleCloseModal,
}: TableCardProps) {
  const alertNotification = useAlertNotification();
  const { user } = useAuthentication();
  const isAdmin = user?.role.name === "admin";
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

  const activeSession = data.sessions?.find(
    (v) => v.status === TableSessionStatusEnum.ACTIVE,
  );
  return (
    <Card
      title={data.name}
      extra={
        <Tag color={data.isAvailable ? "blue" : "red"}>
          <span>{data.isAvailable ? "Available" : "Occupied"}</span>
        </Tag>
      }
      styles={{ body: { padding: 0 } }}
    >
      <div className="p-4 h-50 flex flex-col space-y-2 items-center justify-center">
        <Button
          htmlType="button"
          type="primary"
          disabled={!data.isAvailable}
          loading={isGeneratingQR}
          className={cn("not-disabled:bg-orange-700 font-medium", {
            hidden: !!activeSession,
          })}
          onClick={async () => {
            await handleGenerateQR({
              tableId: data.id,
              status: TableSessionStatusEnum.ACTIVE,
            });
          }}
        >
          <IconQrcode className="size-4" />
          <span>Generate QR code</span>
        </Button>
        {!!activeSession && (
          <QRCode
            size={160}
            className={cn({ hidden: !activeSession })}
            value={`${BASE_URL}/customer-order?sesstion-token=${activeSession.sessionToken}`}
          />
        )}
      </div>
      {isAdmin && (
        <div className="border-t border-gray-100 py-2 px-3 flex items-center justify-end">
          <Button
            type="text"
            onClick={() => {
              handleModalStateChange({
                type: "edit",
                value: { id: data.id, name: data.name },
              });
            }}
          >
            <IconPencilCog className="size-5 text-blue-500" />
          </Button>
          <Button
            type="text"
            onClick={() => {
              handleModalStateChange({
                type: "delete",
                value: { id: data.id, name: data.name },
              });
            }}
          >
            <IconTrashXFilled className="size-5 text-red-500" />
          </Button>
        </div>
      )}
      {modalState.type === "edit" && !!modalState.value && (
        <TableFormModal
          open
          initialValue={modalState.value || { id: undefined, name: "" }}
          isEdit
          onOk={async (values) => {
            if (!modalState.value?.id) return;
            await handleUpdateTable(
              { id: modalState.value.id, form: values },
              {
                onSuccess: () => {
                  alertNotification.success({
                    message: "Update table successfully.",
                  });
                  handleCloseModal();
                },
                onError: () => {
                  alertNotification.error({ message: "Cannot update table." });
                },
              },
            );
          }}
          onCancel={handleCloseModal}
        />
      )}
      <ConfirmModal
        open={modalState.type === "delete"}
        onConfirm={async () => {
          if (!modalState.value?.id) return;
          await handleDeleteTable(modalState.value.id, {
            onSuccess: () => {
              alertNotification.info({ message: "Delete table successfully." });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({ message: "Cannot delete table." });
            },
          });
        }}
        onCancel={handleCloseModal}
      >
        <p>
          Do you want to delete table{" "}
          <span className="text-blue-500">{data.name}</span>
        </p>
      </ConfirmModal>
    </Card>
  );
}

export default TableCard;
