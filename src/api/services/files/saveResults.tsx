/* CONFIGS */
import { apiClient } from "../../config/httpCommon";

/* HOOKS */
import useStatus from "../../../hooks/useStatus";

/* DTOS */
// import { RansacResultsResponseDto } from "../../types/cloud";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { RansacResultsDto } from "../../types/processing";

const useSaveRansacResults = () => {
  const { t } = useTranslation();
  const { updateLoadingStatus, updateStatus } = useStatus();

  const saveRansacResults = async (sessionId: string) => {
    try {
      updateLoadingStatus(t("notifications.loading.save-results"));
      const response = await apiClient.get<RansacResultsDto>(
        `/getRansacResults/${sessionId}`
      );
      const linkSource = `data:${
        response.headers["content-type"]
      };base64,${btoa(response.data.data)}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = `ransac_results.yaml`;
      downloadLink.target = "self";
      downloadLink.click();
      updateStatus("results-saved");
      notification.success({
        message: t("notifications.success.save-results"),
      });
    } catch (error) {
      updateStatus("save-results-failed");
      console.error(t("notifications.error.save-results"), error);
      notification.error({ message: t("notifications.error.save-results") });
    } finally {
      updateLoadingStatus(false);
    }
  };

  return { saveRansacResults };
};

export default useSaveRansacResults;
