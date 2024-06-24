/* REACT */
import { FC } from "react";

/* COMPONENTS */
import FormModal from "../../../components/formModal";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useVoxelGrid from "../../../hooks/preProcessing/useVoxelGrid";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const VoxelGridModal: FC = () => {
  const { t } = useTranslation();
  const { sessionId, cloudId } = useCloud();
  const { modalOpen, closeModal } = useVoxelGrid();

  const blockCondition: boolean = !!!sessionId || !!!cloudId;

  const submitHandler = () => {
    if (blockCondition) {
      notification.warning({
        message: t("modals.voxelGrid.blockDescription"),
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
      title={t("modals.voxelGrid.title")}
      blockConditionDescription={t("modals.voxelGrid.blockDescription")}
    >
      Teste
    </FormModal>
  );
};

export default VoxelGridModal;
