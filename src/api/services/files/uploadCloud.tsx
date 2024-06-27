/* CONFIGS */
import { useMutation } from "react-query";
import { apiClient } from "../../config/httpCommon";

/* DTOS */
import { CloudDto } from "../../types/cloud";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatus from "../../../hooks/useStatus";
import useVoxelGrid from "../../../hooks/preProcessing/useVoxelGrid";
import useNormalEstimation from "../../../hooks/preProcessing/useNormalEstimation";

/* UTILS */
import { notification } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const useUploadCloud = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCloudId, updateSessionId } = useCloud();
  const { updateLoadingStatus, updateStatus } = useStatus();
  const { updateSuggestedParams: updateVoxelGridParams } = useVoxelGrid();
  const { updateSuggestedParams: updateNormalEstimationParams } =
    useNormalEstimation();

  const uploadCloud = async (file: FormData) => {
    updateLoadingStatus(t("notifications.loading.load-cloud"));
    const { data: cloud } = await apiClient.post<CloudDto>(
      "/uploadCloud",
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return cloud;
  };

  const handleSuccess = (data: CloudDto) => {
    updateCloudId(data.uuid);
    updateSessionId(data.session);
    updateStatus("cloud-loaded");
    updateLoadingStatus(false);
    updateVoxelGridParams(data.params_suggestion);
    updateNormalEstimationParams(data.params_suggestion);
    navigate("pointCloud");
    notification.success({ message: t("notifications.success.load-cloud") });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.load-cloud") });
    updateStatus("load-cloud-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.load-cloud"), error);
  };

  return useMutation({
    mutationFn: uploadCloud,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useUploadCloud;
