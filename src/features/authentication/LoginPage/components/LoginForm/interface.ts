import { LoginFormType } from "@/models/authentication/LoginFormType";
import { FormikHelpers } from "formik";

export interface LoginFormProps {
  initialValues: LoginFormType;
  onSubmit: (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ) => Promise<void>;
}
