/* REACT */
import { FC } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/*HOOKS*/
import useInterfaceTour from "../../../hooks/useInterfaceTour";

/* UTILS */
import { useTranslation } from "react-i18next";

/* ASSETS */
import logoutIcon from "../../../assets/icons/account/logout.svg";
import { useNavigate } from "react-router";

const AccountTab: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accountTabRef } = useInterfaceTour();

  const handleLogout = () => {
    localStorage.removeItem("authEmail");
    navigate("/");
  };

  return (
    <div ref={accountTabRef}>
      <HeaderTab
      items={[
        {
          active: true,
          icon: logoutIcon,
          key: "logout-button",
          action: handleLogout,
          label: t("tabs.account.logout"),
        },
      ]}
    />
    </div>
  );
};

export default AccountTab;
