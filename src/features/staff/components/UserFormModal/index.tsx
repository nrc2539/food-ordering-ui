import { Button, Form, Input, Modal, Select } from "antd";
import { Formik } from "formik";
import isEmailValidator from "validator/lib/isEmail";
import * as Yup from "yup";

import { UserFormModalProps } from "./interface";

export default function UserFormModal({
  className,
  open,
  initialValue,
  isEdit,
  roleOptions,
  onOk,
  onCancel,
}: UserFormModalProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Menu name is required."),
    roleId: Yup.number().required("Please select role."),
    email: Yup.string()
      .test("email", "Email is invalid format.", (value) => {
        if (value) {
          return isEmailValidator(value, { allow_utf8_local_part: false });
        }
        return false;
      })
      .required("Email is required."),
  });

  return (
    <Modal
      title={isEdit ? "Edit User" : "Invite New User"}
      className={className}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onOk}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
        }) => (
          <Form
            initialValues={initialValue}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Staff name"
              layout="vertical"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name}
            >
              <Input
                name="name"
                placeholder="Staff name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email}
            >
              <Input
                name="email"
                placeholder="Email"
                value={values.email}
                disabled={isEdit}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              name="roleId"
              label="Role"
              validateStatus={touched.roleId && errors.roleId ? "error" : ""}
              help={touched.roleId && errors.roleId}
            >
              <Select
                value={values.roleId}
                placeholder="Select role"
                onChange={(v) => {
                  setFieldValue("roleId", v);
                }}
                options={roleOptions}
                onBlur={handleBlur}
              />
            </Form.Item>

            <div className="flex items-center space-x-2 justify-end">
              <Button
                htmlType="submit"
                type="primary"
                disabled={!isValid || isSubmitting}
              >
                {isEdit ? "Save" : "Create"}
              </Button>
              {onCancel && (
                <Button htmlType="button" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
