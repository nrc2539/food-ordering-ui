import { Button, Form, Input, Modal } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

import { TableFormModalProps } from "./interface";

export default function TableFormModal({
  className,
  open,
  initialValue,
  isEdit,
  onOk,
  onCancel,
}: TableFormModalProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Table name is required."),
  });

  return (
    <Modal
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
          handleSubmit,
        }) => (
          <Form initialValues={initialValue} onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Table name"
              layout="vertical"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name}
            >
              <Input
                name="name"
                placeholder="Table name"
                value={values.name}
                onChange={handleChange}
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
