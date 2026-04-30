import { Formik } from "formik";
import { Alert, Button, Form, Input } from "antd";
import isEmailValidator from "validator/lib/isEmail";
import * as Yup from "yup";

import { LoginFormProps } from "./interface";

function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test("email", "Email is invalid format.", (value) => {
        if (value) {
          return isEmailValidator(value, { allow_utf8_local_part: false });
        }
        return false;
      })
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
    submitError: Yup.string(),
  });

  return (
    <div className="w-full tablet:max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              className="w-full"
              name="email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email}
            >
              <Input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              name="password"
              validateStatus={
                touched.password && errors.password ? "error" : ""
              }
              help={touched.password && errors.password}
            >
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              type="primary"
              className="w-full"
              htmlType="submit"
            >
              Login
            </Button>

            {!!errors.submitError && (
              <Alert
                className="mt-5"
                title="Email or password is incorrect. Please try again."
                type="error"
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
