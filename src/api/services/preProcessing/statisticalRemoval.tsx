/* CONFIGS */
import { useMutation } from "react-query";
import { apiClient } from "../../config/httpCommon";

/* DTOS */
import { CloudDto } from "../../types/cloud";

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
  StatisticalRemovalParams,
  PreProcessingPostDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyStatisticalRemoval = () => {
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

  const applyStatisticalRemoval = async (params: StatisticalRemovalParams) => {
    updateLoadingStatus(t("notifications.loading.statistical-removal"));
    const body: PreProcessingPostDto<StatisticalRemovalParams> = {
      uuid: cloudId,
      session: sessionId,
      function_type: PreProcessingFunctionTypes.STATISTICAL_REMOVAL,
      values: params,
    };
    const { data: cloud } = await apiClient.post<CloudDto>(
      "/preProcessing",
      body
    );
    return cloud;
  };

  const handleSuccess = (data: CloudDto) => {
    clearEfficientRansacApplied();
    updateStatus("statistical-removal-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({
      message: t("notifications.success.statistical-removal"),
    });
  };

  const handleError = (error: unknown) => {
    notification.error({
      message: t("notifications.error.statistical-removal"),
    });
    updateStatus("statistical-removal-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.statistical-removal"), error);
  };

  return useMutation({
    mutationFn: applyStatisticalRemoval,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyStatisticalRemoval;
