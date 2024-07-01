/* REACT */
import { FC, useState } from "react";

/* COMPONENTS */
import { Controller } from "react-hook-form";
import { Button, Col, Input, Modal, Row, notification } from "antd";

/* UTILS */
import md5 from "md5";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// Props interface
interface GeneratePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const GeneratePasswordModal: FC<GeneratePasswordModalProps> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const onSubmit = (data: { email: string }) => {
    const emailHash = md5(data.email.split("@")[0]);
    const password = `${emailHash.slice(0, 5)}${emailHash.slice(
      emailHash.length - 5,
      emailHash.length
    )}`;
    setGeneratedPassword(password);
    navigator.clipboard.writeText(password).then(() => {
      notification.success({
        message: t("notifications.success.password-generated"),
      });
    });
  };

  const localCloseHandler = () => {
    reset();
    setGeneratedPassword("");
    onClose();
  };

  return (
    <Modal
      width={500}
      open={open}
      footer={null}
      onClose={localCloseHandler}
      onCancel={localCloseHandler}
      title={
        <div className="w-full text-center text-xl mb-6">
          {t("tabs.admin.generate-password")}
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full"
      >
        <Row gutter={16} align="middle" className="w-4/5 my-2">
          <Col span={6} className="flex justify-end">
            <label className="text-right w-full" htmlFor="email">
              <span className="text-red-500">*</span> <span>Email:</span>
            </label>
          </Col>
          <Col span={18}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: t("modals.email-required"),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t("modals.email-valid"),
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email"
                  className={`w-full ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                />
              )}
            />
          </Col>
          {errors.email && (
            <span className="error text-xs text-red-500 w-full text-center mt-1">
              {errors.email.message}
            </span>
          )}
          {generatedPassword && (
            <span className="error text-base text-green w-full text-center mt-4">
              {generatedPassword}
            </span>
          )}
        </Row>
        <div className="w-full flex justify-center gap-4 mt-4">
          <Button onClick={localCloseHandler}>{t("modals.cancel")}</Button>
          <Button htmlType="submit" type="primary">
            {t("tabs.admin.generate-password")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GeneratePasswordModal;
