import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NotifyError } from "../../component/alert";
import useUserStore from "../../stores/userStore";
import { apicall } from "../../utils/apicall";
import "./index.less";
import { LoginParams } from "./Interfaces";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const UserStore = useUserStore();
  const { t, i18n } = useTranslation();
  const ValidationMessage = t("login.requiredFeild");

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language); // Change language dynamically English or Spanish
  };

  const onFinished = async (form: LoginParams) => {
    let payload = {
      username: form.username,
      password: form.password,
    };
    let url = "/api/auth/login";
    let method = "post";
    let apiResponse: any = await apicall({
      payload,
      url,
      method,
    });
    if (apiResponse?.response) {
      localStorage.setItem("token", apiResponse?.response.token);
      localStorage.setItem("username", apiResponse?.response.username);
      let Obj = {
        logged: true,
        username: apiResponse?.response.username,
        token: apiResponse?.response.token,
      };
      UserStore.setUserItem(Obj);
      navigate("/");
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  const NavigateToRegister = () => navigate("/register");

  const onChangeLanguage = (value: string) => {
    changeLanguage(value);
  };

  return (
    <>
      <div className="login-container">
        <Form
          name="trigger"
          className="login-form"
          onFinish={onFinished}
          style={{ maxWidth: 600 }}
          layout="vertical"
          autoComplete="off"
        >
          <div>
            <Space direction="horizontal">
              <Select
                showSearch
                defaultValue="en"
                placeholder="Select Language"
                optionFilterProp="label"
                onChange={onChangeLanguage}
                options={[
                  {
                    value: "en",
                    label: "English",
                  },
                  {
                    value: "es",
                    label: "Español (Spanish)",
                  },
                ]}
              />
            </Space>
          </div>
          <h2>{t("login.LoginToAccount")}</h2>
          <h5>{t("login.PleaseEnterYourUsernameAndPasswordToContinue")}</h5>
          <Form.Item
            hasFeedback
            label={t("login.username")}
            name="username"
            validateTrigger="onBlur"
            rules={[
              { required: true, type: "string", message: ValidationMessage },
            ]}
          >
            <Input placeholder={t("login.username")} />
          </Form.Item>
          <Form.Item
            hasFeedback
            label={t("login.password")}
            name="password"
            validateTrigger="onBlur"
            rules={[{ required: true, message: ValidationMessage }]}
          >
            <Input type="password" placeholder={t("login.password")} />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{t("login.rememberPassword")}</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="login-form_button"
            >
              {t("login.login")}
            </Button>
          </Form.Item>
          <Space direction="horizontal">
            {t("login.dontHaveAnAccount?")}
            <a onClick={NavigateToRegister}>{t("login.createAccount")}</a>
          </Space>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
