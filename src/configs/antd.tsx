/* REACT */
import { FC, ReactNode } from "react";

/* ANTD */
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import enUS from "antd/lib/locale/en_US";

/* UTILS */
import { useTranslation } from "react-i18next";

// Props interface
interface AntdConfigProviderProps {
  children: ReactNode;
}

const AntdConfigProvider: FC<AntdConfigProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();

  const getLocale = () => {
    switch (i18n.language) {
      case "pt":
        return ptBR;
      case "en":
      default:
        return enUS;
    }
  };

  return (
    <ConfigProvider
      locale={getLocale()}
      theme={{
        token: {
          colorPrimary: "#008542",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
