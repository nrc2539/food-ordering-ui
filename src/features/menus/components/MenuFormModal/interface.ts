import { SelectType } from "@/interfaces/SelectType";
import { MenuFormType } from "@/models/menu/MenuFormType";

export interface MenuFormModalProps {
  className?: string;
  open: boolean;
  title?: string;
  isEdit?: boolean;
  initialValue: MenuFormType;
  categoryOptions: SelectType<number>[];
  onOk: (values: MenuFormType) => void;
  onCancel?: () => void;
}
