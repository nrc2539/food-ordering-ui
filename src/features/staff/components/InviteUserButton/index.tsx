"use client";
import { useState } from "react";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";

import { cn } from "@/libs/utils";
import MenuFormModal from "../UserFormModal";
import { InviteUserButtonProps } from "./interface";
import { useAlertNotification } from "@/hooks/useAlertNotification";

function InviteUserButton({ className, roles }: InviteUserButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const { success, contextHolder } = useAlertNotification();

  return (
    <>
      {contextHolder}
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
        onOk={() => {
          // TODO: call API create User
          setOpenModal(false);
          success({ message: "Invite user success" });
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
}

export default InviteUserButton;
