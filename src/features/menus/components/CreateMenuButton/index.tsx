"use client";
import { useState } from "react";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/libs/utils";
import { MenuFormType } from "@/models/menu/MenuFormType";
import { createMenu } from "@/libs/actions/menu-actions";
import { useAlertNotification } from "@/hooks/useAlertNotification";

import MenuFormModal from "../MenuFormModal";
import { CreateMenuButtonProps } from "./interface";

function CreateMenuButton({ className, categories }: CreateMenuButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const alertNotification = useAlertNotification();

  function handleCloseModal() {
    setOpenModal(false);
  }

  const { mutateAsync: handleCreateMenu } = useMutation({
    mutationFn: (form: MenuFormType) => createMenu(form),
  });

  return (
    <>
      <Button
        type="primary"
        size="large"
        className={cn("flex items-center font-medium bg-orange-700", className)}
        onClick={() => setOpenModal(true)}
      >
        <IconCirclePlusFilled className="size-5" />
        <span>Create New Menu</span>
      </Button>
      <MenuFormModal
        open={openModal}
        initialValue={{
          name: "",
          price: 0,
          categoryId: undefined,
          isAvailable: true,
        }}
        categoryOptions={categories.map((v) => ({
          value: v.id,
          label: v.name,
        }))}
        onOk={async (form) => {
          await handleCreateMenu(form, {
            onSuccess: () => {
              alertNotification.success({
                message: "Create new menu successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({ message: "Create new menu failed." });
            },
          });
        }}
        onCancel={handleCloseModal}
      />
    </>
  );
}

export default CreateMenuButton;
