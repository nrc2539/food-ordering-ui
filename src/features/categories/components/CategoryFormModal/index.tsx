import { Button, Form, Input, Modal } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

import { CategoryFormModalProps } from "./interface";

export default function CategoryFormModal({
  className,
  open,
  initialValue,
  isEdit,
  onOk,
  onCancel,
}: CategoryFormModalProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required."),
  });

  return (
    <Modal
      title={isEdit ? "Edit Category" : "Create New Category"}
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
              label="Category name"
              layout="vertical"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name}
            >
              <Input
                name="name"
                placeholder="Category name"
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
