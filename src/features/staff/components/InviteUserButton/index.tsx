"use client";
import { useState } from "react";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/libs/utils";
import MenuFormModal from "../UserFormModal";
import { useAlertNotification } from "@/hooks/useAlertNotification";
import { createUser } from "@/libs/actions/user-actions";
import { UserFormType } from "@/models/user/UserFormType";

import { InviteUserButtonProps } from "./interface";

function InviteUserButton({ className, roles }: InviteUserButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const alertNotification = useAlertNotification();

  const { mutateAsync: handleCreateUser } = useMutation({
    mutationFn: (form: UserFormType) => createUser(form),
  });

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Button
        type="primary"
        size="large"
        className={cn("flex items-center font-medium bg-orange-700", className)}
        onClick={() => setOpenModal(true)}
      >
        <IconCirclePlusFilled className="size-5" />
        <span>Invite New User</span>
      </Button>
      <MenuFormModal
        open={openModal}
        initialValue={{ id: undefined, name: "", email: "", roleId: undefined }}
        roleOptions={roles.map((v) => ({
          value: v.id,
          label: v.name,
        }))}
        onOk={async (form) => {
          await handleCreateUser(form, {
            onSuccess: () => {
              alertNotification.success({
                message: "Invite new user successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({ message: "Invite new user failed." });
            },
          });
        }}
        onCancel={handleCloseModal}
      />
    </>
  );
}

export default InviteUserButton;
