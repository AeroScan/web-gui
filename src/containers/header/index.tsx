/* REACT */
import { FC, useRef } from "react";

/* COMPONENTS */
import { Tabs } from "antd";

/* CONTAINERS */
import FilesTab from "./tabs/files";
import PreProcessingTab from "./tabs/preProcessing";
import ProcessingTab from "./tabs/processing";
import HelpTab from "./tabs/help";
import AdminTab from "./tabs/admin";
import AccountTab from "./tabs/account";

/* HOOKS */
import useApplicationState from "../../hooks/useApplicationState";
import useInterfaceTour from "../../hooks/useInterfaceTour";

/* UTILS */
import { useTranslation } from "react-i18next";
import { TTabItem, TTabs } from "../../utils/types/tabs";

const Header: FC = () => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useApplicationState();

  const { filesTabRef, preProcessingTabRef, processingTabRef, helpTabRef, accountTabRef } = useInterfaceTour();

  const items: TTabItem[] = [
    {
      key: TTabs.FILES,
      active: true,
      label: t("tabs.files.label"),
      ref: filesTabRef,
      children: <FilesTab />,
    },
    {
      key: TTabs.PRE_PROCESSING,
      active: true,
      label: t("tabs.pre-processing.label"),
      ref: preProcessingTabRef,
      children: <PreProcessingTab />,
    },
    {
      key: TTabs.PROCESSING,
      active: true,
      label: t("tabs.processing.label"),
      ref: processingTabRef,
      children: <ProcessingTab />,
    },
    {
      key: TTabs.HELP,
      active: true,
      label: t("tabs.help.label"),
      ref: helpTabRef,
      children: <HelpTab />,
    },
    {
      key: TTabs.ADMIN,
      // active: localStorage.getItem("authEmail") === "admin@admin.com",
      active: true,
      label: t("tabs.admin.label"),
      children: <AdminTab />,
    },
    {
      key: TTabs.ACCOUNT,
      active: true,
      label: t("tabs.account.label"),
      ref: accountTabRef,
      children: <AccountTab />,
    },
  ];

  return <Tabs type="card" onChange={(key: string) => setActiveTab(key as TTabs)} activeKey={activeTab} items={items.filter((i) => i.active)}> </Tabs>;
};

export default Header;

//ref={items.filter((i) => i.ref))}
