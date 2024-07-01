/* CONFIGS */
import { apiClient } from "../../config/httpCommon";

/* HOOKS */
import useStatus from "../../../hooks/useStatus";

/* DTOS */
import { DownloadCloudResponseDto } from "../../types/cloud";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const useDownloadCloud = () => {
  const { t } = useTranslation();
  const { updateLoadingStatus, updateStatus } = useStatus();

  const downloadCloud = async (sessionId: string) => {
    try {
      updateLoadingStatus(t("notifications.loading.download-cloud"));
      const response = await apiClient.get<DownloadCloudResponseDto>(
        `/download/${sessionId}`
      );
      const linkSource = `data:${
        response.headers["content-type"]
      };base64,${btoa(response.data.data)}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = `cloud.${response.data.extension}`;
      downloadLink.target = "self";
      downloadLink.click();
      updateStatus("cloud-downloaded");
      notification.success({
        message: t("notifications.success.download-cloud"),
      });
    } catch (error) {
      updateStatus("download-cloud-failed");
      console.error(t("notifications.error.download-cloud"), error);
      notification.error({ message: t("notifications.error.download-cloud") });
    } finally {
      updateLoadingStatus(false);
    }
  };

  return { downloadCloud };
};

export default useDownloadCloud;
