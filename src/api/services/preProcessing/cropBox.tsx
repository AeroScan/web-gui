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
  CropBoxParams,
  PreProcessingPostDto,
  PreProcessingFunctionTypes,
} from "../../types/preProcessing";

const useApplyCropBox = () => {
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

  const applyCropBox = async (params: CropBoxParams) => {
    updateLoadingStatus(t("notifications.loading.crop-box"));
    const body: PreProcessingPostDto<CropBoxParams> = {
      uuid: cloudId,
      session: sessionId,
      function_type: PreProcessingFunctionTypes.CROP_BOX,
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
    updateStatus("crop-box-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    updateEfficientRansacParams(data.params_suggestion);
    notification.success({
      message: t("notifications.success.crop-box"),
    });
  };

  const handleError = (error: unknown) => {
    notification.error({
      message: t("notifications.error.crop-box"),
    });
    updateStatus("crop-box-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.crop-box"), error);
  };

  return useMutation({
    mutationFn: applyCropBox,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyCropBox;
