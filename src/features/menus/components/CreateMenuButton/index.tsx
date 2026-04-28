"use client";
import { useState } from "react";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";

import { cn } from "@/libs/utils";
import MenuFormModal from "../MenuFormModal";
import { CreateMenuButtonProps } from "./interface";

function CreateMenuButton({ className, categories }: CreateMenuButtonProps) {
  const [openModal, setOpenModal] = useState(false);

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
        initialValue={{ name: "", price: 0, categoryId: undefined }}
        categoryOptions={categories.map((v) => ({
          value: v.id,
          label: v.name,
        }))}
        onOk={() => {
          // TODO: call API create Table
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
}

export default CreateMenuButton;
