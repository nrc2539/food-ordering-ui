import { Button, Form, Input, InputNumber, Modal, Select, Switch } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

import { MenuFormModalProps } from "./interface";

export default function MenuFormModal({
  className,
  open,
  initialValue,
  isEdit,
  categoryOptions,
  onOk,
  onCancel,
}: MenuFormModalProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Menu name is required."),
    categoryId: Yup.number().required("Please select category."),
    price: Yup.number().required("Price is required."),
  });

  return (
    <Modal
      title={isEdit ? "Edit Menu" : "Create New Menu"}
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
              label="Menu name"
              layout="vertical"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name}
            >
              <Input
                name="name"
                placeholder="Menu name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="categoryId"
                label="Category"
                validateStatus={
                  touched.categoryId && errors.categoryId ? "error" : ""
                }
                help={touched.categoryId && errors.categoryId}
              >
                <Select
                  value={values.categoryId}
                  placeholder="Select category"
                  onChange={(v) => {
                    setFieldValue("categoryId", v);
                  }}
                  options={categoryOptions}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                validateStatus={touched.price && errors.price ? "error" : ""}
                help={touched.price && errors.price}
              >
                <InputNumber
                  name="price"
                  className="w-full"
                  min={0}
                  value={values.price}
                  onChange={(v) => {
                    setFieldValue("price", v ?? undefined);
                  }}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </div>
            <Form.Item name="isAvailable" label="Available">
              <Switch
                checked={values.isAvailable}
                onChange={(v) => {
                  setFieldValue("isAvailable", v);
                }}
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
