"use client";
import { CreateTableButtonProps } from "./interface";
import { Button } from "antd";
import { IconPlusFilled } from "@tabler/icons-react";
import { cn } from "@/libs/utils";
import { useState } from "react";
import TableFormModal from "../CategoryFormModal";

function CreateTableButton({ className }: CreateTableButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        type="primary"
        size="large"
        className={cn("flex items-center font-medium bg-orange-700", className)}
        onClick={() => setOpenModal(true)}
      >
        <IconPlusFilled />
        <span>Create New Table</span>
      </Button>
      <TableFormModal
        open={openModal}
        initialValue={{ name: "" }}
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

export default CreateTableButton;
