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
  CentralizationParams,
  PreProcessingPostDto,
  PreProcessingResponseDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyCentralization = () => {
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

  const applyCentralization = async (params: CentralizationParams) => {
    updateLoadingStatus(t("notifications.loading.centralization"));
    const body: PreProcessingPostDto<CentralizationParams> = {
      uuid: cloudId,
      session: sessionId,
      function_type: PreProcessingFunctionTypes.ALIGNMENT,
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
    updateStatus("centralization-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({
      message: t("notifications.success.centralization"),
    });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.centralization") });
    updateStatus("centralization-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.centralization"), error);
  };

  return useMutation({
    mutationFn: applyCentralization,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyCentralization;
