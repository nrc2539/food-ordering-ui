"use client";

import {
  IconPencilCog,
  IconQrcode,
  IconTrashXFilled,
} from "@tabler/icons-react";
import { Button, Card, QRCode, Tag } from "antd";
import Link from "next/link";
import Text from "antd/es/typography/Text";

import { cn } from "@/libs/utils";
import { BASE_URL } from "@/libs/constant";
import ConfirmModal from "@/components/ConfirmModal";
import { useAlertNotification } from "@/hooks/useAlertNotification";
import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { useAuthentication } from "@/providers/AuthenticationProvider";

import { TableCardProps } from "./interface";
import TableFormModal from "../TableFormModal";

function TableCard({
  data,
  modalState,
  isGeneratingQR,
  handleModalStateChange,
  handleCloseModal,
  handleUpdateTable,
  handleDeleteTable,
  handleGenerateQR,
  handleUpdateTableSession,
}: TableCardProps) {
  const alertNotification = useAlertNotification();
  const { user } = useAuthentication();
  const isAdmin = user?.role.name === "admin";

  const activeSession = data.activeSession;

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
      <div className="p-4 h-64 flex flex-col space-y-2 items-center justify-center">
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
          <>
            <QRCode
              size={150}
              className={cn({ hidden: !activeSession })}
              value={`${BASE_URL}/customer-order?session-token=${activeSession.sessionToken}`}
            />
            <Link
              href={`${BASE_URL}/customer-order?session-token=${activeSession.sessionToken}`}
              target="_blank"
              className="space-x-1"
            >
              <span>Session Link</span>
              <Text
                copyable={{
                  text: `${BASE_URL}/customer-order?session-token=${activeSession.sessionToken}`,
                }}
              />
            </Link>
            <Button
              className="text-red-500 hover:border-red-500"
              onClick={() => {
                handleModalStateChange({
                  type: "update-table-session",
                  value: {
                    id: activeSession.id,
                    name: data.name,
                  },
                });
              }}
            >
              Close table session
            </Button>
          </>
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
        open={
          modalState.type === "delete" ||
          modalState.type === "update-table-session"
        }
        okText={
          modalState.type === "update-table-session"
            ? "Close session"
            : "Delete"
        }
        onConfirm={async () => {
          if (!modalState.value?.id) return;

          if (modalState.type === "delete") {
            await handleDeleteTable(modalState.value.id, {
              onSuccess: () => {
                alertNotification.info({
                  message: "Delete table successfully.",
                });
                handleCloseModal();
              },
              onError: () => {
                alertNotification.error({ message: "Cannot delete table." });
              },
            });
          } else if (modalState.type === "update-table-session") {
            await handleUpdateTableSession(
              {
                id: modalState.value.id,
                status: TableSessionStatusEnum.CLOSED,
              },
              {
                onSuccess: () => {
                  alertNotification.info({
                    message: "Update table session successfully.",
                  });
                  handleCloseModal();
                },
                onError: () => {
                  alertNotification.error({
                    message: "Update table session failed.",
                  });
                },
              },
            );
          }
        }}
        onCancel={handleCloseModal}
      >
        <p>
          {modalState.type === "update-table-session"
            ? "Do you want to close session"
            : "Do you want to delete table"}
          &nbsp;
          <span className="text-blue-500">{data.name}</span>
        </p>
      </ConfirmModal>
    </Card>
  );
}

export default TableCard;
