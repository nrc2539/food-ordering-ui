import { TableFormType } from "@/models/table/TableFormType";

export interface TableFormModalProps {
  className?: string;
  open: boolean;
  title?: string;
  isEdit?: boolean;
  onOk: (values: TableFormType) => void;
  onCancel?: () => void;
  initialValue: TableFormType;
}
