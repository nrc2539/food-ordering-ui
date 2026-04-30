import { FormikHelpers } from "formik";
import { useMutation } from "@tanstack/react-query";

import { LoginFormType } from "@/models/authentication/LoginFormType";
import { login } from "@/actions/auth-actions";
import { useAuthentication } from "@/providers/AuthenticationProvider";

import { LoginFormProps } from "./interface";

export function withLoginForm(Component: React.FC<LoginFormProps>) {
  function WithLoginForm() {
    const initialValues: LoginFormType = {
      email: "",
      password: "",
    };

    const { refetchProfile } = useAuthentication();

    const { mutateAsync: handleSubmit } = useMutation({
      mutationFn: (params: {
        values: LoginFormType;
        formikHelpers: FormikHelpers<LoginFormType>;
      }) => login(params.values),
      onSuccess: () => {
        refetchProfile();
      },
      onError: (_, { formikHelpers }) => {
        formikHelpers.setFieldError("submitError", "submit error");
      },
    });

    async function onSubmit(
      values: LoginFormType,
      formikHelpers: FormikHelpers<LoginFormType>,
    ) {
      await handleSubmit({ values, formikHelpers });
    }

    const componentProps: LoginFormProps = {
      initialValues,
      onSubmit,
    };
    return <Component {...componentProps} />;
  }
  return WithLoginForm;
}
