/* CONFIGS */
import { useMutation } from "react-query";
import { apiClient } from "../../config/httpCommon";

/* DTOS */
import { CloudDto } from "../../types/cloud";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatus from "../../../hooks/useStatus";
import useEfficientRansac from "../../../hooks/processing/useEfficientRansac";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import {
  ProcessingPostDto,
  EfficientRansacParams,
} from "../../types/processing";

const useApplyEfficientRansac = () => {
  const { t } = useTranslation();
  const { setApplied } = useEfficientRansac();
  const { updateCloudId, cloudId, sessionId } = useCloud();
  const { updateLoadingStatus, updateStatus } = useStatus();

  const applyEfficientRansac = async (params: EfficientRansacParams) => {
    updateLoadingStatus(t("notifications.loading.efficient-ransac"));
    const body: ProcessingPostDto<EfficientRansacParams> = {
      uuid: cloudId,
      session: sessionId,
      values: params,
    };
    const { data: cloud } = await apiClient.post<CloudDto>("/effRansac", body);
    return cloud;
  };

  const handleSuccess = (data: CloudDto) => {
    setApplied();
    updateStatus("efficient-ransac-applied");
    updateCloudId(data.uuid);
    updateLoadingStatus(false);
    notification.success({
      message: t("notifications.success.efficient-ransac"),
    });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.efficient-ransac") });
    updateStatus("efficient-ransac-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.efficient-ransac"), error);
  };

  return useMutation({
    mutationFn: applyEfficientRansac,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyEfficientRansac;
