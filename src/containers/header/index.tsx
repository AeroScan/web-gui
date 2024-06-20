/* REACT */
import { FC } from "react";

/* COMPONENTS */
import { Tabs } from "antd";

/* CONTAINERS */
import FilesTab from "./tabs/files";
import PreProcessingTab from "./tabs/preProcessing";
import ProcessingTab from "./tabs/processing";
import HelpTab from "./tabs/help";
import AdminTab from "./tabs/admin";
import AccountTab from "./tabs/account";

/* UTILS */
import { useTranslation } from "react-i18next";
import { TTabItem } from "../../utils/types/tabs";

const Header: FC = () => {
  const { t } = useTranslation();

  const items: TTabItem[] = [
    {
      key: "files",
      active: true,
      label: t("tabs.files.label"),
      step: "second-step",
      children: <FilesTab />,
    },
    {
      active: true,
      key: "pre-processing",
      label: t("tabs.pre-processing.label"),
      step: "third-step",
      children: <PreProcessingTab />,
    },
    {
      active: true,
      key: "processing",
      label: t("tabs.processing.label"),
      step: "fourth-step",
      children: <ProcessingTab />,
    },
    {
      key: "help",
      active: true,
      label: t("tabs.help.label"),
      step: "fifth-step",
      children: <HelpTab />,
    },
    {
      key: "admin",
      // active: localStorage.getItem("authEmail") === "admin@admin.com",
      active: true,
      label: t("tabs.admin.label"),
      step: "sixth-step",
      children: <AdminTab />,
    },
    {
      active: true,
      key: "account",
      label: t("tabs.account.label"),
      step: "seventh-step",
      children: <AccountTab />,
    },
  ];

  return <Tabs type="card" items={items.filter((i) => i.active)} className={`${items.filter((i) => i.step)}`} />;
};

export default Header;
