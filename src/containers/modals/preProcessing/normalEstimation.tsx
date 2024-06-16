/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useNormalEstimation from "../../../hooks/preProcessing/useNormalEstimation";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const NormalEstimationModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useNormalEstimation();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const submitHandler = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.normalEstimation.blockDescription"),
      });
      return;
    }
  };

  return (
    <FormModal
      open={modalOpen}
      onOk={submitHandler}
      onClose={closeModal}
      onCancel={closeModal}
      okText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      blockCondition={blockCondition}
      title={t("modals.normalEstimation.title")}
      blockConditionDescription={t("modals.normalEstimation.blockDescription")}
    />
  );
};

export default NormalEstimationModal;
