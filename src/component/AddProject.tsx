import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import {
  Customer,
  Manager,
  ProjectStatus,
  Staff,
} from "../constants/constants";
import { NotifyError, NotifySuccess } from "./alert";
import { AddProjectProps } from "../pages/projects/Interfaces";
import dayjs from "dayjs";
import { AddProject, EditProject } from "../helpers/projectHelper";

const AddProjectComponent: React.FC<AddProjectProps> = ({
  toggle,
  Mode,
  setMode,
  EditProjectRecord,
  setEditProjectRecord,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    let apiResponse;
    if (Mode == "ADD") {
      let newObj = {
        ...values,
        dueDate: new Date(values.Dateval).toISOString(),
        customer: Customer.filter((x) => x.id === values.customer)[0],
        manager: Manager.filter((x) => x.id === values.manager)[0],
        staff: Staff.filter((x) => x.id === values.staff)[0],
      };
      apiResponse = await AddProject(newObj);
    } else {
      let newObj = {
        ...EditProjectRecord,
        ...values,
        dueDate: new Date(values.Dateval).toISOString(),
        customer: Customer.filter((x) => x.id === values.customer)[0],
        manager: Manager.filter((x) => x.id === values.manager)[0],
        staff: Staff.filter((x) => x.id === values.staff)[0],
      };
      apiResponse = await EditProject(newObj);
    }
    // console.log("api response", apiResponse);
    if (apiResponse.response) {
      NotifySuccess(apiResponse.response.message);
      setEditProjectRecord(null);
      setMode("ADD");
      toggle();
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  // console.log("data:", EditProjectRecord);

  return (
    <>
      <h1>{Mode === "EDIT" ? "Edit Project" : "Add Project"}</h1>
      <Form
        initialValues={Mode === "EDIT" ? EditProjectRecord : undefined}
        layout="horizontal"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        form={form}
        style={{ maxWidth: "50%" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Customer"
          name="customer"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {Customer.map((item) => {
              return <Select.Option value={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Reference Number"
          name="referenceNumber"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="referenceNumber" />
        </Form.Item>
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="ProjectName" />
        </Form.Item>
        <Form.Item
          label="Project Number"
          name="projectNumber"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="projectNumber" />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="Location" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="address" />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="Dateval"
          rules={[{ required: true, message: "Please input!" }]}
          initialValue={dayjs(EditProjectRecord?.dueDate)}
        >
          <DatePicker
            // defaultValue={dayjs(EditProjectRecord?.dueDate)}
            minDate={dayjs(new Date())}
          />
        </Form.Item>
        <Form.Item
          label="ContactNumber"
          name="contactNumber"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="contactNumber" />
        </Form.Item>
        <Form.Item
          label="Manager"
          name="manager"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {Manager.map((item) => {
              return <Select.Option value={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Staff"
          name="staff"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {Staff.map((item) => {
              return <Select.Option value={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
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
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {Mode === "ADD" ? "Add Now" : "Update Now"}
          </Button>
          <Button onClick={toggle}>Cancel</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProjectComponent;
