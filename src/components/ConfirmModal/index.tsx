import { Modal } from "antd";
import { ConfirmModalProps } from "./interface";

function ConfirmModal({
  open,
  title = "Confirm action",
  children,
  okText = "Delete",
  okButtonProps,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      destroyOnHidden
      open={open}
      title={title}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      okButtonProps={okButtonProps || { className: "bg-red-500" }}
    >
      {children}
    </Modal>
  );
}

export default ConfirmModal;
