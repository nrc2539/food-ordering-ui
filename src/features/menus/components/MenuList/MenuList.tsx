import { Button, Switch, Table, TableProps } from "antd";
import { IconPencilCog, IconTrashXFilled } from "@tabler/icons-react";

import { formatNumber } from "@/libs/utils";
import ConfirmModal from "@/components/ConfirmModal";
import { useAlertNotification } from "@/hooks/useAlertNotification";
import { MenuType } from "@/models/menu/MenuType";
import { CategoryType } from "@/models/category/CategoryType";

import { MenuListProps } from "./interface";
import MenuFormModal from "../MenuFormModal";

function MenuList({
  className,
  menus,
  categories,
  modalState,
  isUpdatingMenu,
  handleModalStateChange,
  handleCloseModal,
  handleUpdateMenu,
  handleDeleteMenu,
}: MenuListProps) {
  const alertNotification = useAlertNotification();
  const columns: TableProps<MenuType>["columns"] = [
    {
      title: "Menu Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (val) => <p>{val}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "25%",
      render: (val: CategoryType) => <p>{val.name}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: (val: number) => <p>{formatNumber(val, { minFracDigits: 2 })}</p>,
    },
    {
      title: "Status",
      dataIndex: "isAvailable",
      key: "isAvailable",
      width: "5%",
      render: (val: boolean | undefined, record) => (
        <Switch
          checked={val}
          loading={isUpdatingMenu}
          onChange={async (v) => {
            if (!record.id) return;
            await handleUpdateMenu(
              {
                id: record.id,
                form: {
                  name: record.name,
                  price: record.price,
                  isAvailable: v,
                },
              },
              {
                onSuccess: () => {
                  alertNotification.success({
                    message: "Update menu status successfully.",
                  });
                },
                onError: () =>
                  alertNotification.error({
                    message: "Update menu status failed.",
                  }),
              },
            );
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: "20%",
      render: (_, record) => (
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="text"
            onClick={() => {
              handleModalStateChange({
                type: "edit",
                value: {
                  id: record.id,
                  name: record.name,
                  price: record.price,
                  categoryId: record.category.id,
                  isAvailable: record.isAvailable,
                },
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
                value: {
                  id: record.id,
                  name: record.name,
                  price: record.price,
                  isAvailable: record.isAvailable,
                },
              });
            }}
          >
            <IconTrashXFilled className="size-5 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={className}>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={menus}
      />

      {modalState.type === "edit" && !!modalState.value && (
        <MenuFormModal
          open
          isEdit
          initialValue={modalState.value}
          onOk={async (form) => {
            if (!modalState.value?.id) return;
            await handleUpdateMenu(
              { id: modalState.value.id, form },
              {
                onSuccess: () => {
                  alertNotification.success({
                    message: "Update menu successfully.",
                  });
                  handleCloseModal();
                },
                onError: () => {
                  alertNotification.error({ message: "Update menu failed." });
                },
              },
            );
          }}
          categoryOptions={categories.map((v) => ({
            value: v.id,
            label: v.name,
          }))}
          onCancel={handleCloseModal}
        />
      )}
      <ConfirmModal
        open={modalState.type === "delete"}
        onConfirm={async () => {
          if (!modalState.value?.id) return;
          await handleDeleteMenu(modalState.value.id, {
            onSuccess: () => {
              alertNotification.info({
                message: "Delete menu successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({ message: "Delete menu failed." });
            },
          });
        }}
        onCancel={handleCloseModal}
      >
        <p>
          Do you want to delete menu{" "}
          <span className="text-blue-500">{modalState.value?.name}</span>
        </p>
      </ConfirmModal>
    </div>
  );
}

export default MenuList;
