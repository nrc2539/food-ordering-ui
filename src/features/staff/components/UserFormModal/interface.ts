import { SelectType } from "@/interfaces/SelectType";
import { UserFormType } from "@/models/user/UserFormType";

export interface UserFormModalProps {
  className?: string;
  open: boolean;
  title?: string;
  isEdit?: boolean;
  initialValue: UserFormType;
  roleOptions: SelectType<number>[];
  onOk: (values: UserFormType) => void;
  onCancel?: () => void;
}
