/* REACT */
import { FC, useState } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/* CONTAINERS */
import GeneratePasswordModal from "../../modals/admin/GeneratePasswordModal";

/* UTILS */
import { useTranslation } from "react-i18next";

/* ASSETS */
import generatePasswordIcon from "../../../assets/icons/admin/generate-password.svg";

const AdminTab: FC = () => {
  const { t } = useTranslation();

  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);

  const openPasswordModal = () => setPasswordModalOpen(true);
  const closePasswordModal = () => setPasswordModalOpen(false);

  return (
    <>
      <GeneratePasswordModal
        open={passwordModalOpen}
        onClose={closePasswordModal}
      />
      <HeaderTab
        items={[
          {
            active: true,
            icon: generatePasswordIcon,
            key: "generate-password-button",
            label: t("tabs.admin.generate-password"),
            action: () => openPasswordModal(),
          },
        ]}
      />
    </>
  );
};

export default AdminTab;
