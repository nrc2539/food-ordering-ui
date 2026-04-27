import { LoginFormType } from "@/models/authentication/LoginFormType";
import { FormikHelpers } from "formik";

export interface LoginFormProps {
  initialValues: LoginFormType;
  handleSubmit: (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ) => void;
}
