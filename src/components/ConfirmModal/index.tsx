import { Modal } from "antd";
import { ConfirmModalProps } from "./interface";

function ConfirmModal({
  open,
  title,
  children,
  okText = "Delete",
  okButtonProps,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
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
