/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* API */
import useApplyVoxelGrid from "../../../api/services/preProcessing/voxelGrid";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useVoxelGrid from "../../../hooks/preProcessing/useVoxelGrid";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { VoxelGridFormData } from "../../../utils/types/preProcessing";

const VoxelGridModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { mutate: applyVoxelGrid } = useApplyVoxelGrid();
  const { modalOpen, suggestedParams, closeModal } = useVoxelGrid();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const onSubmit = (data: VoxelGridFormData) => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.voxelGrid.blockDescription"),
      });
      return;
    }
    applyVoxelGrid({ leaf: data.leafSize });
    closeModal();
  };

  return (
    <FormModal<VoxelGridFormData>
      parameters={[
        {
          id: "leaf-size",
          name: "leafSize",
          placeholder: suggestedParams.leafSize.toString(),
          label: t("modals.voxelGrid.parameters.leafSize.label"),
          tooltip: t("modals.voxelGrid.parameters.leafSize.tooltip"),
          required: t("modals.voxelGrid.parameters.leafSize.required"),
        },
      ]}
      open={modalOpen}
      onSubmit={onSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      blockCondition={blockCondition}
      submitText={t("modals.submit")}
      cancelText={t("modals.cancel")}
      title={t("modals.voxelGrid.title")}
      subtitle={t("modals.voxelGrid.subtitle")}
      blockDescription={t("modals.voxelGrid.blockDescription")}
    />
  );
};

export default VoxelGridModal;
