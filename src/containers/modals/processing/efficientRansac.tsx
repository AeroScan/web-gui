/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useEfficientRansac from "../../../hooks/processing/useEfficientRansac";
import useNormalEstimation from "../../../hooks/preProcessing/useNormalEstimation";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const EfficientRansacModal: FC = () => {
  const { t } = useTranslation();
  const { modalOpen, closeModal } = useEfficientRansac();
  const { applied: normalEstimationApplied } = useNormalEstimation();

  const blockCondition: boolean = !normalEstimationApplied;

  const submitHandler = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.efficientRansac.blockDescription"),
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
      title={t("modals.efficientRansac.title")}
      blockConditionDescription={t("modals.efficientRansac.blockDescription")}
    />
  );
};

export default EfficientRansacModal;
