import { Button, Table, TableProps } from "antd";
import { IconPencilCog, IconTrashXFilled } from "@tabler/icons-react";

import { RoleType } from "@/models/user/RoleType";
import { UserType } from "@/models/user/UserType";
import ConfirmModal from "@/components/ConfirmModal";
import { useAlertNotification } from "@/hooks/useAlertNotification";

import MenuFormModal from "../UserFormModal";
import { UserListProps } from "./interface";

function UserList({
  className,
  users,
  roles,
  modalState,
  handleModalStateChange,
  handleCloseModal,
  handleUpdateUser,
  handleDeleteUser,
}: UserListProps) {
  const alertNotification = useAlertNotification();
  const columns: TableProps<UserType>["columns"] = [
    {
      title: "Staff Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (val) => <p>{val}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "25%",
      render: (val: RoleType) => <p>{val.name}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      render: (val) => <p>{val}</p>,
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
                  email: record.email,
                  roleId: record.role.id,
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
                  email: record.email,
                  roleId: record.role.id,
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
        dataSource={users}
      />

      {modalState.type === "edit" && !!modalState.value && (
        <MenuFormModal
          open
          isEdit
          initialValue={modalState.value}
          onOk={async (form) => {
            if (!modalState.value?.id) return;
            await handleUpdateUser(
              { id: modalState.value.id, form },
              {
                onSuccess: () => {
                  alertNotification.success({
                    message: "Update staff information successfully.",
                  });
                  handleCloseModal();
                },
                onError: () => {
                  alertNotification.error({
                    message: "Update staff information failed.",
                  });
                },
              },
            );
          }}
          roleOptions={roles.map((v) => ({
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
          await handleDeleteUser(modalState.value.id, {
            onSuccess: () => {
              alertNotification.success({
                message: "Delete staff information successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({
                message: "Delete staff information failed.",
              });
            },
          });
        }}
        onCancel={handleCloseModal}
      >
        <p>
          Do you want to delete staff{" "}
          <span className="text-blue-500">{modalState.value?.name}</span>
        </p>
      </ConfirmModal>
    </div>
  );
}

export default UserList;
