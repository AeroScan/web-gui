/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useNoiseAdd from "../../../hooks/preProcessing/useNoiseAdd";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const NoiseAddModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useNoiseAdd();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const submitHandler = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.noiseAdd.blockDescription"),
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
      title={t("modals.noiseAdd.title")}
      blockConditionDescription={t("modals.noiseAdd.blockDescription")}
    />
  );
};

export default NoiseAddModal;
