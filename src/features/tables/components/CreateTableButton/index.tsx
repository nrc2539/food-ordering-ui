"use client";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useState } from "react";

import { cn } from "@/libs/utils";
import TableFormModal from "../TableFormModal";
import { CreateTableButtonProps } from "./interface";

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
        <IconCirclePlusFilled className="size-5" />
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
