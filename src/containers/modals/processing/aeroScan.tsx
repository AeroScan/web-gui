/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyAeroScan from "../../../api/services/processing/aeroScan";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useAeroScan from "../../../hooks/processing/useAeroScan";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const AeroScanModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useAeroScan();
  const { mutateAsync: applyAeroScan } = useApplyAeroScan();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.aeroscan.blockDescription"),
      });
      return;
    }
    applyAeroScan({});
    closeModal();
  };

  return (
    <FormModal
      parameters={[]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.aeroscan.title")}
      subtitle={t("modals.aeroscan.subtitle")}
      blockDescription={t("modals.aeroscan.blockDescription")}
    />
  );
};

export default AeroScanModal;

