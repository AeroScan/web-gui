/* REACT */
import { FC, useState } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";
import FormModal from "../../../components/formModal";

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
      <FormModal
        open={passwordModalOpen}
        onClose={closePasswordModal}
        onCancel={closePasswordModal}
        cancelText={t("modals.cancel")}
        title={t("modals.generatePassword.title")}
        okText={t("modals.generatePassword.submit")}
      />
      <HeaderTab
        items={[
          {
            active: true,
            icon: generatePasswordIcon,
            key: "generate-password-button",
            label: t("tabs.admin.generate-password"),
            action: openPasswordModal,
          },
        ]}
      />
    </>
  );
};

export default AdminTab;
