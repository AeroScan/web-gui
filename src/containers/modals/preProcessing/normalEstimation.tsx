/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyNormalEstimation from "../../../api/services/preProcessing/normalEstimation";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useNormalEstimation from "../../../hooks/preProcessing/useNormalEstimation";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { NormalEstimationFormData } from "../../../utils/types/preProcessing";

const NormalEstimationModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { mutate: applyNormalEstimation } = useApplyNormalEstimation();
  const { modalOpen, suggestedParams, closeModal } = useNormalEstimation();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: NormalEstimationFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.normalEstimation.blockDescription"),
      });
      return;
    }
    applyNormalEstimation({ radius: data.radius });
    closeModal();
  };

  return (
    <FormModal<NormalEstimationFormData>
      parameters={[
        {
          id: "radius",
          name: "radius",
          placeholder: suggestedParams.radius.toString(),
          label: t("modals.normalEstimation.parameters.radius.label"),
          tooltip: t("modals.normalEstimation.parameters.radius.tooltip"),
          required: t("modals.normalEstimation.parameters.radius.required"),
        },
      ]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.normalEstimation.title")}
      subtitle={t("modals.normalEstimation.subtitle")}
      blockDescription={t("modals.normalEstimation.blockDescription")}
    />
  );
};

export default NormalEstimationModal;
