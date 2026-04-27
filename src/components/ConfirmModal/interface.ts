import { ButtonProps } from "antd";

export interface ConfirmModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  okText?: string;
  okButtonProps?: ButtonProps;
  onConfirm: () => void;
  onCancel?: () => void;
}
