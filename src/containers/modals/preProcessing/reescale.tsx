/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useReescale from "../../../hooks/preProcessing/useReescale";

/* API */
import useApplyReescale from "../../../api/services/preProcessing/reescale";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { ReescaleFormData } from "../../../utils/types/preProcessing";

const ReescaleModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useReescale();
  const { mutate: applyReescale } = useApplyReescale();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: ReescaleFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.noiseAdd.blockDescription"),
      });
      return;
    }
    applyReescale({ factor: data.factor });
    closeModal();
  };

  return (
    <FormModal<ReescaleFormData>
      parameters={[
        {
          id: "factor",
          name: "factor",
          placeholder: "0",
          label: t("modals.reescale.parameters.factor.label"),
          tooltip: t("modals.reescale.parameters.factor.tooltip"),
          required: t("modals.reescale.parameters.factor.required"),
        },
      ]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.reescale.title")}
      subtitle={t("modals.reescale.subtitle")}
      blockDescription={t("modals.reescale.blockDescription")}
    />
  );
};

export default ReescaleModal;
