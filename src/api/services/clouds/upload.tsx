/* CONFIGS */
import { useMutation } from "react-query";
import { apiClient } from "../../config/httpCommon";

/* DTOS */
import { CloudDto } from "../../types/cloud";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatus from "../../../hooks/useStatus";

/* UTILS */
import { notification } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const useUploadCloud = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCloudIds } = useCloud();
  const { updateLoadingStatus, updateStatus } = useStatus();

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
    updateCloudIds(data.session, data.uuid);
    updateStatus("cloud-loaded");
    updateLoadingStatus(false);
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
