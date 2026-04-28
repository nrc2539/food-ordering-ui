"use client";

import {
  IconPencilCog,
  IconQrcode,
  IconTrashXFilled,
} from "@tabler/icons-react";
import { Button, Card, Tag } from "antd";

import { TableCardProps } from "./interface";
import TableFormModal from "../TableFormModal";
import ConfirmModal from "@/components/ConfirmModal";

function TableCard({
  data,
  modalState,
  handleModalStateChange,
}: TableCardProps) {
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
      <div className="p-4 flex items-center justify-center">
        <Button
          htmlType="button"
          type="primary"
          disabled={!data.isAvailable}
          className=" not-disabled:bg-orange-700 font-medium"
          onClick={() => {
            // TODO: handle generate QR (Call API create table session)
          }}
        >
          <IconQrcode className="size-4" />
          <span>Generate QR code</span>
        </Button>
      </div>
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
      {modalState.type === "edit" && !!modalState.value && (
        <TableFormModal
          open
          initialValue={modalState.value || { id: undefined, name: "" }}
          isEdit
          onOk={async (values) => {
            console.log("values", values);
            // TODO: call API update table
            handleModalStateChange({ type: undefined, value: undefined });
          }}
          onCancel={() => {
            handleModalStateChange({ type: undefined, value: undefined });
          }}
        />
      )}
      <ConfirmModal
        open={modalState.type === "delete"}
        onConfirm={() => {
          // TODO: call API delete table
          handleModalStateChange({ type: undefined, value: undefined });
        }}
        onCancel={() =>
          handleModalStateChange({ type: undefined, value: undefined })
        }
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
