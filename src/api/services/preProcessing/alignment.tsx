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
  AlignmentParams,
  PreProcessingPostDto,
  PreProcessingResponseDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyAlignment = () => {
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

  const applyAlignment = async (params: AlignmentParams) => {
    updateLoadingStatus(t("notifications.loading.alignment"));
    const body: PreProcessingPostDto<AlignmentParams> = {
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
    updateStatus("alignment-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({ message: t("notifications.success.alignment") });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.alignment") });
    updateStatus("alignment-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.alignment"), error);
  };

  return useMutation({
    mutationFn: applyAlignment,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyAlignment;
