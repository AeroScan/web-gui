/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyNoiseAdd from "../../../api/services/preProcessing/noiseAdd";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useNoiseAdd from "../../../hooks/preProcessing/useNoiseAdd";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { NoiseAddFormData } from "../../../utils/types/preProcessing";

const NoiseAddModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useNoiseAdd();
  const { mutate: applyNoiseAdd } = useApplyNoiseAdd();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: NoiseAddFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.noiseAdd.blockDescription"),
      });
      return;
    }
    applyNoiseAdd({ limit: data.limit });
    closeModal();
  };

  return (
    <FormModal<NoiseAddFormData>
      parameters={[
        {
          id: "limit",
          name: "limit",
          placeholder: "0",
          label: t("modals.noiseAdd.parameters.limit.label"),
          tooltip: t("modals.noiseAdd.parameters.limit.tooltip"),
          required: t("modals.noiseAdd.parameters.limit.required"),
        },
      ]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.noiseAdd.title")}
      subtitle={t("modals.noiseAdd.subtitle")}
      blockDescription={t("modals.noiseAdd.blockDescription")}
    />
  );
};

export default NoiseAddModal;
