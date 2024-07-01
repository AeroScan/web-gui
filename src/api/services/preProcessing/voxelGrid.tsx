/* CONFIGS */
import { useMutation } from "react-query";
import { apiClient } from "../../config/httpCommon";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatus from "../../../hooks/useStatus";
import useVoxelGrid from "../../../hooks/preProcessing/useVoxelGrid";
import useEfficientRansac from "../../../hooks/processing/useEfficientRansac";
import useNormalEstimation from "../../../hooks/preProcessing/useNormalEstimation";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import {
  VoxelGridParams,
  PreProcessingPostDto,
  PreProcessingResponseDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyVoxelGrid = () => {
  const { t } = useTranslation();
  const { updateCloudId, cloudId, sessionId } = useCloud();
  const { updateLoadingStatus, updateStatus } = useStatus();
  const { updateSuggestedParams: updateVoxelGridParams } = useVoxelGrid();
  const { updateSuggestedParams: updateNormalEstimationParams } =
    useNormalEstimation();
  const {
    clearApplied: clearEfficientRansacApplied,
    updateSuggestedParams: updateEfficientRansacParams,
  } = useEfficientRansac();

  const applyVoxelGrid = async (params: VoxelGridParams) => {
    updateLoadingStatus(t("notifications.loading.voxel-grid"));
    const body: PreProcessingPostDto<VoxelGridParams> = {
      uuid: cloudId,
      session: sessionId,
      function_type: PreProcessingFunctionTypes.VOXEL_GRID,
      values: params,
    };
    const { data: cloud } = await apiClient.post<PreProcessingResponseDto>(
      "/preProcessing",
      body
    );
    return cloud;
  };

  const handleSuccess = (data: PreProcessingResponseDto) => {
    clearEfficientRansacApplied();
    updateStatus("voxel-grid-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({ message: t("notifications.success.voxel-grid") });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.voxel-grid") });
    updateStatus("voxel-grid-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.voxel-grid"), error);
  };

  return useMutation({
    mutationFn: applyVoxelGrid,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyVoxelGrid;
