import { CategoryFormType } from "@/models/category/CategoryFormType";

export interface CategoryFormModalProps {
  className?: string;
  open: boolean;
  title?: string;
  isEdit?: boolean;
  onOk: (values: CategoryFormType) => void;
  onCancel?: () => void;
  initialValue: CategoryFormType;
}
