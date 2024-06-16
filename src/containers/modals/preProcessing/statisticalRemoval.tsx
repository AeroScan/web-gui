/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatisticalRemoval from "../../../hooks/preProcessing/useStatisticalRemoval";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const StatisticalRemovalModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useStatisticalRemoval();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const submitHandler = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.statisticalRemoval.blockDescription"),
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
      title={t("modals.statisticalRemoval.title")}
      blockConditionDescription={t(
        "modals.statisticalRemoval.blockDescription"
      )}
    />
  );
};

export default StatisticalRemovalModal;
