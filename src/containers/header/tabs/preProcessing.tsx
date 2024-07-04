/* REACT */
import { FC } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/* CONTAINERS */
import CropBoxModal from "../../modals/preProcessing/cropBox";
import VoxelGridModal from "../../modals/preProcessing/voxelGrid";
import NormalEstimationModal from "../../modals/preProcessing/normalEstimation";
import StatisticalRemovalModal from "../../modals/preProcessing/statisticalRemoval";
import ReescaleModal from "../../modals/preProcessing/reescale";
import CentralizationModal from "../../modals/preProcessing/centralization";
import AlignmentModal from "../../modals/preProcessing/alignment";
import NoiseAddModal from "../../modals/preProcessing/noiseAdd";

/* HOOKS */
import useCropBox from "../../../hooks/preProcessing/useCropBox";
import useVoxelGrid from "../../../hooks/preProcessing/useVoxelGrid";
import useStatisticalRemoval from "../../../hooks/preProcessing/useStatisticalRemoval";
import useNormalEstimation from "../../../hooks/preProcessing/useNormalEstimation";
import useReescale from "../../../hooks/preProcessing/useReescale";
import useCentralization from "../../../hooks/preProcessing/useCentralization";
import useAlignment from "../../../hooks/preProcessing/useAlignment";
import useNoiseAdd from "../../../hooks/preProcessing/useNoiseAdd";
import useInterfaceTour from "../../../hooks/useInterfaceTour";

/* UTILS */
import { useTranslation } from "react-i18next";

/* ASSETS */
import cropBoxIcon from "../../../assets/icons/pre-processing/crop-box.svg";
import voxelGridIcon from "../../../assets/icons/pre-processing/voxel-grid.svg";
import statisticalRemovalIcon from "../../../assets/icons/pre-processing/statistical-removal.svg";
import normalEstimationIcon from "../../../assets/icons/pre-processing/normal-estimation.svg";
import reescaleIcon from "../../../assets/icons/pre-processing/reescale.svg";
import centralizationIcon from "../../../assets/icons/pre-processing/centralization.svg";
import alignmentIcon from "../../../assets/icons/pre-processing/alignment.svg";
import noiseAddIcon from "../../../assets/icons/pre-processing/noise-add.png";

const PreProcessingTab: FC = () => {
  const { t } = useTranslation();
  const { openModal: openCropBoxModal } = useCropBox();
  const { openModal: openVoxelGridModal } = useVoxelGrid();
  const { openModal: openStatisticalRemovalModal } = useStatisticalRemoval();
  const { openModal: openNormalEstimationModal } = useNormalEstimation();
  const { openModal: openReescaleModal } = useReescale();
  const { openModal: openCentralizationModal } = useCentralization();
  const { openModal: openAlignmentModal } = useAlignment();
  const { openModal: openNoiseAddModal } = useNoiseAdd();

  const { preProcessingTabRef } = useInterfaceTour();

  return (
    <div ref={preProcessingTabRef}>
      <CropBoxModal />
      <VoxelGridModal />
      <StatisticalRemovalModal />
      <NormalEstimationModal />
      <ReescaleModal />
      <CentralizationModal />
      <AlignmentModal />
      <NoiseAddModal />
      <HeaderTab
        items={[
          {
            active: true,
            icon: cropBoxIcon,
            key: "crop-box-button",
            label: t("tabs.pre-processing.crop-box"),
            action: openCropBoxModal,
          },
          {
            active: true,
            icon: voxelGridIcon,
            key: "voxel-grid-button",
            label: t("tabs.pre-processing.voxel-grid"),
            action: openVoxelGridModal,
          },
          {
            active: true,
            icon: statisticalRemovalIcon,
            key: "statistical-removal-button",
            label: t("tabs.pre-processing.statistical-removal"),
            action: openStatisticalRemovalModal,
          },
          {
            active: true,
            icon: normalEstimationIcon,
            key: "normal-estimation-button",
            label: t("tabs.pre-processing.normal-estimation"),
            action: openNormalEstimationModal,
          },
          {
            active: true,
            icon: reescaleIcon,
            key: "reescale-button",
            label: t("tabs.pre-processing.reescale"),
            action: openReescaleModal,
          },
          {
            active: true,
            icon: centralizationIcon,
            key: "centralization-button",
            label: t("tabs.pre-processing.centralization"),
            action: openCentralizationModal,
          },
          {
            active: true,
            icon: alignmentIcon,
            key: "alignment-button",
            label: t("tabs.pre-processing.alignment"),
            action: openAlignmentModal,
          },
          {
            active: true,
            icon: noiseAddIcon,
            key: "noise-add-button",
            label: t("tabs.pre-processing.noise-add"),
            action: openNoiseAddModal,
          },
        ]}
      />
    </div>
  );
};

export default PreProcessingTab;
