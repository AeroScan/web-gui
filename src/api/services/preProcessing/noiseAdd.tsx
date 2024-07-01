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
  NoiseAddParams,
  PreProcessingPostDto,
  PreProcessingResponseDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyNoiseAdd = () => {
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

  const applyNoiseAdd = async (params: NoiseAddParams) => {
    updateLoadingStatus(t("notifications.loading.noise-add"));
    const body: PreProcessingPostDto<NoiseAddParams> = {
      uuid: cloudId,
      session: sessionId,
      function_type: PreProcessingFunctionTypes.NOISE_ADD,
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
    updateStatus("noise-add-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({ message: t("notifications.success.noise-add") });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.noise-add") });
    updateStatus("noise-add-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.noise-add"), error);
  };

  return useMutation({
    mutationFn: applyNoiseAdd,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyNoiseAdd;
