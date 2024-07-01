/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyCentralization from "../../../api/services/preProcessing/centralization";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useCentralization from "../../../hooks/preProcessing/useCentralization";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const CentralizationModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useCentralization();
  const { mutateAsync: applyCentralization } = useApplyCentralization();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.centralization.blockDescription"),
      });
      return;
    }
    applyCentralization({});
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
      title={t("modals.centralization.title")}
      subtitle={t("modals.centralization.subtitle")}
      blockDescription={t("modals.centralization.blockDescription")}
    />
  );
};

export default CentralizationModal;
