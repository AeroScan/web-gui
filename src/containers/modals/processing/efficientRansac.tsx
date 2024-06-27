/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyEfficientRansac from "../../../api/services/processing/efficientRansac";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useEfficientRansac from "../../../hooks/processing/useEfficientRansac";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { EfficientRansacFormData } from "../../../utils/types/processing";

const EfficientRansacModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { mutate: applyEfficientRansac } = useApplyEfficientRansac();
  const { modalOpen, suggestedParams, closeModal } = useEfficientRansac();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: EfficientRansacFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.efficientRansac.blockDescription"),
      });
      return;
    }
    applyEfficientRansac({
      epsilon: data.epsilon,
      min_points: data.minPoints,
      probability: data.probability,
      cluster_epsilon: data.clusterEpsilon,
      normal_threshold: data.normalThreshold,
    });
    closeModal();
  };

  return (
    <FormModal<EfficientRansacFormData>
      parameters={[
        {
          id: "probability",
          name: "probability",
          placeholder: suggestedParams.probability.toString(),
          label: t("modals.efficientRansac.parameters.probability.label"),
          tooltip: t("modals.efficientRansac.parameters.probability.tooltip"),
        },
        {
          id: "minPoints",
          name: "minPoints",
          placeholder: suggestedParams.minPoints.toString(),
          label: t("modals.efficientRansac.parameters.minPoints.label"),
          tooltip: t("modals.efficientRansac.parameters.minPoints.tooltip"),
        },
        {
          id: "epsilon",
          name: "epsilon",
          placeholder: suggestedParams.epsilon.toString(),
          label: t("modals.efficientRansac.parameters.epsilon.label"),
          tooltip: t("modals.efficientRansac.parameters.epsilon.tooltip"),
        },
        {
          id: "clusterEpsilon",
          name: "clusterEpsilon",
          placeholder: suggestedParams.clusterEpsilon.toString(),
          label: t("modals.efficientRansac.parameters.clusterEpsilon.label"),
          tooltip: t(
            "modals.efficientRansac.parameters.clusterEpsilon.tooltip"
          ),
        },
        {
          id: "normalThreshold",
          name: "normalThreshold",
          placeholder: suggestedParams.normalThreshold.toString(),
          label: t("modals.efficientRansac.parameters.normalThreshold.label"),
          tooltip: t(
            "modals.efficientRansac.parameters.normalThreshold.tooltip"
          ),
        },
      ]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.efficientRansac.title")}
      subtitle={t("modals.efficientRansac.subtitle")}
      blockDescription={t("modals.efficientRansac.blockDescription")}
    />
  );
};

export default EfficientRansacModal;
