/* REACT */
import { FC } from "react";

/* COMPONENTS */
import { Button, Form, Input } from "antd";

/* UTILS */
import { useTranslation } from "react-i18next";
import { TLoginFormValues } from "../../utils/types/login";

// Props interface
interface LoginFormProps {
  onFinish: (data: TLoginFormValues) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
  const { t } = useTranslation();

  return (
    <Form name="login" layout="vertical" className="w-full" onFinish={onFinish}>
      <Form.Item
        name="email"
        label={t("login.email.label")}
        rules={[{ required: true, message: t("login.email.required") }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        label={t("login.password.label")}
        rules={[{ required: true, message: t("login.password.required") }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          {t("login.button")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
