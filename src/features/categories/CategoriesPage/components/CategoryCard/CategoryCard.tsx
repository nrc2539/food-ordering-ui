"use client";

import { IconPencilCog, IconTrashXFilled } from "@tabler/icons-react";
import { Button, Card } from "antd";

import ConfirmModal from "@/components/ConfirmModal";
import { CategoryCardProps } from "./interface";
import CategoryFormModal from "../CategoryFormModal";
import { formatNumber } from "@/libs/utils";

function CategoryCard({
  data,
  modalState,
  handleModalStateChange,
}: CategoryCardProps) {
  return (
    <Card title={data.name} styles={{ body: { padding: 0 } }}>
      <div className="border-t border-gray-100 py-2 px-3 flex items-center justify-between">
        <div className="text-sm font-medium">
          <p className="text-gray-400">Menu items</p>
          <div className=" text-gray-600">
            {formatNumber(data.menus?.length || 0)}
          </div>
        </div>
        <div className="flex items-center justify-end">
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
      </div>
      {modalState.type === "edit" && !!modalState.value && (
        <CategoryFormModal
          open
          initialValue={modalState.value || { id: undefined, name: "" }}
          isEdit
          onOk={async (values) => {
            console.log("values", values);
            // TODO: call API update category
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
          // TODO: call API delete category
          handleModalStateChange({ type: undefined, value: undefined });
        }}
        onCancel={() =>
          handleModalStateChange({ type: undefined, value: undefined })
        }
      >
        <p>
          Do you want to delete category{" "}
          <span className="text-blue-500">{data.name}</span>
        </p>
      </ConfirmModal>
    </Card>
  );
}

export default CategoryCard;
