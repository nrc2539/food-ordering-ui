"use client";

import { IconPencilCog, IconTrashXFilled } from "@tabler/icons-react";
import { Button, Card } from "antd";

import ConfirmModal from "@/components/ConfirmModal";
import { formatNumber } from "@/libs/utils";
import { useAlertNotification } from "@/hooks/useAlertNotification";

import CategoryFormModal from "../CategoryFormModal";
import { CategoryCardProps } from "./interface";

function CategoryCard({
  data,
  modalState,
  handleModalStateChange,
  handleCloseModal,
  handleUpdateCategory,
  handleDeleteCategory,
}: CategoryCardProps) {
  const alertNotification = useAlertNotification();
  return (
    <Card title={data.name} styles={{ body: { padding: 0 } }}>
      <div className="border-t border-gray-100 py-2 px-3 flex items-center justify-between">
        <div className="text-sm font-medium">
          <p className="text-gray-400">Menu items</p>
          <div className=" text-gray-600">
            {formatNumber(data.menuItems?.length || 0)}
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
          onOk={async (form) => {
            if (!modalState.value?.id) return;
            await handleUpdateCategory(
              { id: modalState.value.id, form },
              {
                onSuccess: () => {
                  alertNotification.success({
                    message: "Update category successfully.",
                  });
                  handleCloseModal();
                },
                onError: () => {
                  alertNotification.error({
                    message: "Update category failed.",
                  });
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
          await handleDeleteCategory(modalState.value.id, {
            onSuccess: () => {
              alertNotification.info({
                message: "Delete category successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({ message: "Delete category failed." });
            },
          });
        }}
        onCancel={handleCloseModal}
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
