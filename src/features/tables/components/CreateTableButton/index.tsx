"use client";
import { Button } from "antd";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useState } from "react";

import { cn } from "@/libs/utils";
import TableFormModal from "../TableFormModal";
import { CreateTableButtonProps } from "./interface";
import { createTable } from "@/libs/actions/table-actions";
import { useMutation } from "@tanstack/react-query";
import { TableFormType } from "@/models/table/TableFormType";
import { useAlertNotification } from "@/hooks/useAlertNotification";
import { useAuthentication } from "@/providers/AuthenticationProvider";

function CreateTableButton({ className }: CreateTableButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const alertNotification = useAlertNotification();
  const { user } = useAuthentication();
  const isAdmin = user?.role.name === "admin";

  const { mutateAsync: handleCreateTable } = useMutation({
    mutationFn: (form: TableFormType) => createTable(form),
  });

  return (
    <>
      <Button
        type="primary"
        size="large"
        disabled={!isAdmin}
        className={cn(
          "flex items-center font-medium bg-orange-700",
          className,
          { hidden: !isAdmin },
        )}
        onClick={() => setOpenModal(true)}
      >
        <IconCirclePlusFilled className="size-5" />
        <span>Create New Table</span>
      </Button>
      <TableFormModal
        open={openModal}
        initialValue={{ name: "" }}
        onOk={async (form) => {
          await handleCreateTable(form, {
            onSuccess: () => {
              alertNotification.success({
                message: "Create new table successfully.",
              });
              setOpenModal(false);
            },
            onError: () => {
              alertNotification.error({ message: "Cannot create new table." });
            },
          });
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
}

export default CreateTableButton;
