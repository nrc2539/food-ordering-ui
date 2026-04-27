import { LoginFormType } from "@/models/authentication/LoginFormType";
import { LoginFormProps } from "./interface";
import { FormikHelpers } from "formik";

export function withLoginForm(Component: React.FC<LoginFormProps>) {
  function WithLoginForm() {
    const initialValues: LoginFormType = {
      email: "",
      password: "",
    };

    function handleSubmit(
      values: LoginFormType,
      formikHelpers: FormikHelpers<LoginFormType>,
    ) {
      console.log(values, formikHelpers);
      formikHelpers.setFieldError("submitError", "wrong");
    }

    const componentProps: LoginFormProps = {
      initialValues,
      handleSubmit,
    };
    return <Component {...componentProps} />;
  }
  return WithLoginForm;
}
