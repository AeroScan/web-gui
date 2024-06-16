/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useCropBox from "../../../hooks/preProcessing/useCropBox";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const CropBoxModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useCropBox();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const submitHandler = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.cropBox.blockDescription"),
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
      title={t("modals.cropBox.title")}
      blockConditionDescription={t("modals.cropBox.blockDescription")}
    />
  );
};

export default CropBoxModal;
