/* CONFIGS */
import { useMutation } from "react-query";
import { apiClient } from "../../config/httpCommon";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useStatus from "../../../hooks/useStatus";
import useAeroScan from "../../../hooks/processing/useAeroScan";

/* UTILS */
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import {
  ProcessingPostDto,
  AeroScanParams,
  ProcessingResponseDto,
} from "../../types/processing";

const useApplyAeroScan = () => {
  const { t } = useTranslation();
  const { setApplied } = useAeroScan();
  const { updateLoadingStatus, updateStatus } = useStatus();
  const { updateCloudId, updateAnnotations, cloudId, sessionId } = useCloud();

  const applyAeroScan = async (params: AeroScanParams) => {
    updateLoadingStatus(t("notifications.loading.aeroscan"));
    const body: ProcessingPostDto<AeroScanParams> = {
      uuid: cloudId,
      session: sessionId,
      values: params,
    };
    const { data: cloud } = await apiClient.post<ProcessingResponseDto>(
      "/effRansac",
      body
    );
    return cloud;
  };

  const handleSuccess = (data: ProcessingResponseDto) => {
    setApplied();
    updateStatus("aeroscan-applied");
    updateCloudId(data.uuid);
    updateAnnotations(data.annotations || []);
    updateLoadingStatus(false);
    notification.success({
      message: t("notifications.success.aeroscan"),
    });
  };

  const handleError = (error: unknown) => {
    notification.error({ message: t("notifications.error.aeroscan") });
    updateStatus("aeroscan-failed");
    updateLoadingStatus(false);
    console.error(t("notifications.error.aeroscan"), error);
  };

  return useMutation({
    mutationFn: applyAeroScan,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useApplyAeroScan;
