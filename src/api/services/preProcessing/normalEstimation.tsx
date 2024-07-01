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
  PreProcessingPostDto,
  NormalEstimationParams,
  PreProcessingResponseDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyNormalEstimation = () => {
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

  const applyNormalEstimation = async (params: NormalEstimationParams) => {
    updateLoadingStatus(t("notifications.loading.normal-estimation"));
    const body: PreProcessingPostDto<NormalEstimationParams> = {
      uuid: cloudId,
      session: sessionId,
      function_type: PreProcessingFunctionTypes.NORMAL_ESTIMATION,
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
    updateStatus("normal-estimation-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({
      message: t("notifications.success.normal-estimation"),
    });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.normal-estimation") });
    updateStatus("normal-estimation-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.normal-estimation"), error);
  };

  return useMutation({
    mutationFn: applyNormalEstimation,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyNormalEstimation;
