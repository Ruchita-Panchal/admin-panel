import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import React from "react";
import { Project, ProjectStatus } from "../constants/constants";
import { AddEstimationProps } from "../pages/estimations/Interfaces";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddEstimationPage: React.FC<AddEstimationProps> = ({
  toggle,
  Mode,
  setMode,
  EditEstimationRecord,
  setEditEstimationRecord,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("values", values);
  };

  return (
    <>
      <h1>{Mode === "EDIT" ? "Edit Estimation" : "Add Estimation"}</h1>
      <Form
        name="dynamic_form_nest_item"
        initialValues={Mode === "EDIT" ? EditEstimationRecord : undefined}
        layout="horizontal"
        // labelCol={{ span: 10 }}
        // wrapperCol={{ span: 14 }}
        form={form}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Version"
          name="version"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="version" />
        </Form.Item>

        <Form.Item
          label="Project"
          name="project"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {Project.map((item) => {
              return <Select.Option value={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Client"
          name="client"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="client" />
        </Form.Item>

        <Form.Item
          label="Created Date"
          name="createdDateVal"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Last Modified"
          name="modifiedDateVal"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {ProjectStatus.map((item) => {
              return <Select.Option value={item}>{item}</Select.Option>;
            })}
          </Select>
        </Form.Item>

        <h3>Add Sections</h3>
        <Form.List name="Items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ width: "100%", display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={`name${key}`}
                    rules={[{ required: true, message: "Missing name" }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={`description${key}`}
                    rules={[{ required: true, message: "Missing description" }]}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={`quantity${key}`}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <Input type="number" min={1} placeholder="Quantity" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={`price${key}`}
                    rules={[{ required: true, message: "Missing price" }]}
                  >
                    <Input type="number" min={1} placeholder="Price" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={`margin${key}`}
                    rules={[{ required: true, message: "Missing margin" }]}
                  >
                    <Input type="number" min={1} placeholder="Margin" />
                  </Form.Item>
                  <Form.Item {...restField} name={`total${key}`}>
                    <Input
                      disabled={true}
                      type="number"
                      min={1}
                      initialValue={0}
                      placeholder="Total"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add New
          </Button>
          <Button onClick={toggle}>Cancel</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddEstimationPage;
