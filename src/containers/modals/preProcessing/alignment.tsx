/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyAlignment from "../../../api/services/preProcessing/alignment";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useAlignment from "../../../hooks/preProcessing/useAlignment";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const AlignmentModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useAlignment();
  const { mutateAsync: applyAlignment } = useApplyAlignment();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.alignment.blockDescription"),
      });
      return;
    }
    applyAlignment({});
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
      title={t("modals.alignment.title")}
      subtitle={t("modals.alignment.subtitle")}
      blockDescription={t("modals.alignment.blockDescription")}
    />
  );
};

export default AlignmentModal;
