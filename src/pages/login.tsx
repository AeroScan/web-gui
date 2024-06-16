/* REACT */
import { FC, useEffect } from "react";

/* CONTAINERS */
import LoginForm from "../containers/forms/LoginForm";

/* UTILS */
import md5 from "md5";
import { notification } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { TLoginFormValues } from "../utils/types/login";

/* ASSETS */
import logo from "../assets/images/logo.png";

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = (data: TLoginFormValues) => {
    const emailHash = md5(data.email.split("@")[0]);
    const correctPassword = `${emailHash.slice(0, 5)}${emailHash.slice(
      emailHash.length - 5,
      emailHash.length
    )}`;
    if (data.password !== correctPassword) {
      notification.error({ message: t("login.error") });
      return;
    }
    localStorage.setItem("authEmail", data.email);
    navigate("/viewer");
  };

  useEffect(() => {
    if (localStorage.getItem("authEmail")) navigate("/viewer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ecedec] via-[#cdcdcc] to-[#acadac] flex items-center justify-center px-6">
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img src={logo} alt="AeroScan Logo" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 shadow-lg rounded-lg w-96 min-h-[450px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center w-full">
            <img src={logo} alt="Logo" className="h-24 lg:hidden mb-4" />
            <h2 className="text-2xl text-green font-bold mb-6">
              {t("login.title")}
            </h2>
          </div>
          <LoginForm onFinish={onFinish} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
