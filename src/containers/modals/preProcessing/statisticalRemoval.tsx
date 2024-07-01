/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatisticalRemoval from "../../../hooks/preProcessing/useStatisticalRemoval";

/* API */
import useApplyStatisticalRemoval from "../../../api/services/preProcessing/statisticalRemoval";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { StatisticalRemovalFormData } from "../../../utils/types/preProcessing";

const StatisticalRemovalModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useStatisticalRemoval();
  const { mutate: applyStatisticalRemoval } = useApplyStatisticalRemoval();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: StatisticalRemovalFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.statisticalRemoval.blockDescription"),
      });
      return;
    }
    applyStatisticalRemoval({ mean: data.mean, std: data.standardDeviation });
    closeModal();
  };

  return (
    <FormModal<StatisticalRemovalFormData>
      parameters={[
        {
          id: "mean",
          name: "mean",
          placeholder: "0",
          label: t("modals.statisticalRemoval.parameters.mean.label"),
          tooltip: t("modals.statisticalRemoval.parameters.mean.tooltip"),
          required: t("modals.statisticalRemoval.parameters.mean.required"),
        },
        {
          id: "standardDeviation",
          name: "standardDeviation",
          placeholder: "0",
          label: t(
            "modals.statisticalRemoval.parameters.standardDeviation.label"
          ),
          tooltip: t(
            "modals.statisticalRemoval.parameters.standardDeviation.tooltip"
          ),
          required: t(
            "modals.statisticalRemoval.parameters.standardDeviation.required"
          ),
        },
      ]}
      width={600}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.statisticalRemoval.title")}
      subtitle={t("modals.statisticalRemoval.subtitle")}
      blockDescription={t("modals.statisticalRemoval.blockDescription")}
    />
  );
};

export default StatisticalRemovalModal;
