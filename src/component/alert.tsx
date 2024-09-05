import { message } from "antd";

type ComponentProps = string;

export const NotifyInfo = (text: ComponentProps) => {
  message.info(text);
};

export const NotifySuccess = (text: ComponentProps) => {
  message.success(text);
};

export const NotifyError = (text: ComponentProps) => {
  message.error(text);
};
