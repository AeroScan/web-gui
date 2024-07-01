/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useCropBox from "../../../hooks/preProcessing/useCropBox";

/* API */
import useApplyCropBox from "../../../api/services/preProcessing/cropBox";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { CropBoxFormData } from "../../../utils/types/preProcessing";

const CropBoxModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useCropBox();
  const { mutate: applyCropBox } = useApplyCropBox();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: CropBoxFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.cropBox.blockDescription"),
      });
      return;
    }
    applyCropBox({
      min_x: data.startingX,
      min_y: data.startingY,
      min_z: data.startingZ,
      max_x: data.endingX,
      max_y: data.endingY,
      max_z: data.endingZ,
    });
    closeModal();
  };

  return (
    <FormModal<CropBoxFormData>
      parameters={[
        {
          id: "startingX",
          name: "startingX",
          placeholder: "0",
          allowNegative: true,
          label: t("modals.cropBox.parameters.startingX.label"),
          tooltip: t("modals.cropBox.parameters.startingX.tooltip"),
          required: t("modals.cropBox.parameters.startingX.required"),
        },
        {
          id: "startingY",
          name: "startingY",
          placeholder: "0",
          allowNegative: true,
          label: t("modals.cropBox.parameters.startingY.label"),
          tooltip: t("modals.cropBox.parameters.startingY.tooltip"),
          required: t("modals.cropBox.parameters.startingY.required"),
        },
        {
          id: "startingZ",
          name: "startingZ",
          placeholder: "0",
          allowNegative: true,
          label: t("modals.cropBox.parameters.startingZ.label"),
          tooltip: t("modals.cropBox.parameters.startingZ.tooltip"),
          required: t("modals.cropBox.parameters.startingZ.required"),
        },
        {
          id: "endingX",
          name: "endingX",
          placeholder: "0",
          allowNegative: true,
          label: t("modals.cropBox.parameters.endingX.label"),
          tooltip: t("modals.cropBox.parameters.endingX.tooltip"),
          required: t("modals.cropBox.parameters.endingX.required"),
        },
        {
          id: "endingY",
          name: "endingY",
          placeholder: "0",
          allowNegative: true,
          label: t("modals.cropBox.parameters.endingY.label"),
          tooltip: t("modals.cropBox.parameters.endingY.tooltip"),
          required: t("modals.cropBox.parameters.endingY.required"),
        },
        {
          id: "endingZ",
          name: "endingZ",
          placeholder: "0",
          allowNegative: true,
          label: t("modals.cropBox.parameters.endingZ.label"),
          tooltip: t("modals.cropBox.parameters.endingZ.tooltip"),
          required: t("modals.cropBox.parameters.endingZ.required"),
        },
      ]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.cropBox.title")}
      subtitle={t("modals.cropBox.subtitle")}
      blockDescription={t("modals.cropBox.blockDescription")}
    />
  );
};

export default CropBoxModal;
