"use client";
import { useState } from "react";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/libs/utils";
import { createCategory } from "@/libs/actions/category-actions";
import { CategoryFormType } from "@/models/category/CategoryFormType";
import { useAlertNotification } from "@/hooks/useAlertNotification";

import CategoryFormModal from "../CategoryFormModal";
import { CreateCategoryButtonProps } from "./interface";

function CreateCategoryButton({ className }: CreateCategoryButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const alertNotification = useAlertNotification();

  const { mutateAsync: handleCreateCategory } = useMutation({
    mutationFn: (form: CategoryFormType) => createCategory(form),
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
        <span>Create New Category</span>
      </Button>
      <CategoryFormModal
        open={openModal}
        initialValue={{ name: "" }}
        onOk={async (values) => {
          await handleCreateCategory(values, {
            onSuccess: () => {
              alertNotification.success({
                message: "Create new category successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({
                message: "Cannot create new category.",
              });
            },
          });
        }}
        onCancel={handleCloseModal}
      />
    </>
  );
}

export default CreateCategoryButton;
