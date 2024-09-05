import { Button, Checkbox, Form, Input } from "antd";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { NotifyError, NotifySuccess } from "../../component/alert";
import { apicall } from "../../utils/apicall";
import "./index.less";
import { RegisterParams } from "./Interfaces";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [SignupButtonDisabled, setSignupButtonDisabled] =
    useState<boolean>(true);

  const onFinished = async (form: RegisterParams) => {
    let payload = {
      email: form.email,
      username: form.username,
      password: form.password,
    };
    let url = "/api/auth/register";
    let method = "post";
    let apiResponse = await apicall({ payload, url, method });
    if (apiResponse?.response) {
      NotifySuccess("User registered successfully!");
      navigate("/login");
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  const NavigateToLogin = () => navigate("/login");

  return (
    <div className="register-container">
      <Form
        name="trigger"
        className="register-form"
        onFinish={onFinished}
        style={{ maxWidth: 600 }}
        layout="vertical"
        autoComplete="off"
      >
        <h2>Create an Account</h2>
        <h5>Create an account to continue</h5>
        <Form.Item
          hasFeedback
          label="Email"
          name="email"
          validateTrigger="onBlur"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Username"
          name="username"
          validateTrigger="onBlur"
          rules={[{ required: true, type: "string" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Password"
          name="password"
          validateTrigger="onBlur"
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="Enter password" />
        </Form.Item>
        <Form.Item name="terms" valuePropName="checked">
          <Checkbox
            checked={SignupButtonDisabled}
            onChange={(e) => setSignupButtonDisabled(e.target.checked)}
          >
            I accept terms and conditions
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="register-form_button"
            disabled={!SignupButtonDisabled}
          >
            Sign up
          </Button>
        </Form.Item>
        Already have an account? <a onClick={NavigateToLogin}>Login</a>
      </Form>
    </div>
  );
};

export default RegisterPage;
