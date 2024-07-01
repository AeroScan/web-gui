/* REACT */
import { FC, useRef } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";
import UploadButton from "../../../components/uploadButton";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";
import useEfficientRansac from "../../../hooks/processing/useEfficientRansac";

/* API */
import useUploadCloud from "../../../api/services/files/uploadCloud";

/* UTILS */
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

/* ASSETS */
import saveCadIcon from "../../../assets/icons/files/save-cad.svg";
import viewMeshIcon from "../../../assets/icons/files/view-mesh.svg";
import saveMeshIcon from "../../../assets/icons/files/save-mesh.svg";
import loadCloudIcon from "../../../assets/icons/files/load-cloud.svg";
import viewCloudIcon from "../../../assets/icons/files/view-cloud.svg";
import saveCloudIcon from "../../../assets/icons/files/save-cloud.svg";
import saveResultsIcon from "../../../assets/icons/files/save-results.svg";
import useDownloadCloud from "../../../api/services/files/saveCloud";
import useSaveRansacResults from "../../../api/services/files/saveResults";

const FilesTab: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { downloadCloud } = useDownloadCloud();
  const { saveRansacResults } = useSaveRansacResults();
  const { mutateAsync: uploadCloud } = useUploadCloud();
  const { applied: isEfficientRansacApplied } = useEfficientRansac();
  const {
    viewType,
    sessionId,
    toggleViewType,
    isLoaded: isCloudLoaded,
  } = useCloud();

  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleLoadCloudClick = () => {
    if (uploadButtonRef.current) {
      uploadButtonRef.current.click();
    }
  };

  const handleViewCloudClick = () => {
    navigate("pointCloud");
  };

  const handleViewTypesCloudClick = () => {
    toggleViewType();
  };

  const handleViewInstancesCloudClick = () => {
    toggleViewType();
  };

  const handleViewMeshClick = () => {
    navigate("mesh");
  };

  const handleSaveCloudClick = () => {
    downloadCloud(sessionId);
  };

  const handleSaveMeshClick = () => {
    console.log(t("tabs.files.save-mesh"));
  };

  const handleSaveCadClick = () => {
    console.log(t("tabs.files.save-cad"));
  };

  const handleSaveResultsClick = () => {
    saveRansacResults(sessionId);
  };

  const handleUploadCloud = async (file: File) => {
    const dataForm = new FormData();
    dataForm.append("name", file.name);
    dataForm.append("file", file);
    dataForm.append("url_type", file.type);
    uploadCloud(dataForm);
  };

  return (
    <>
      <UploadButton
        className="hidden"
        inputRef={uploadButtonRef}
        handleUpload={handleUploadCloud}
      />
      <HeaderTab
        items={[
          {
            active: true,
            icon: loadCloudIcon,
            key: "load-cloud-button",
            label: t("tabs.files.load-cloud"),
            action: handleLoadCloudClick,
          },
          {
            active: false,
            // active: isCloudLoaded && pathname.includes("mesh"),
            icon: viewCloudIcon,
            key: "view-cloud-button",
            label: t("tabs.files.view-cloud"),
            action: handleViewCloudClick,
          },
          {
            active: false,
            // active:
            //   isCloudLoaded &&
            //   isEfficientRansacApplied &&
            //   pathname.includes("pointCloud"),
            icon: viewMeshIcon,
            key: "view-mesh-button",
            label: t("tabs.files.view-mesh"),
            action: handleViewMeshClick,
          },
          {
            active:
              isCloudLoaded &&
              isEfficientRansacApplied &&
              viewType === "instances" &&
              pathname.includes("pointCloud"),
            icon: viewCloudIcon,
            key: "view-types-cloud-button",
            label: t("tabs.files.view-types-cloud"),
            action: handleViewTypesCloudClick,
          },
          {
            active:
              isCloudLoaded &&
              isEfficientRansacApplied &&
              viewType === "types" &&
              pathname.includes("pointCloud"),
            icon: viewCloudIcon,
            key: "view-instances-cloud-button",
            label: t("tabs.files.view-instances-cloud"),
            action: handleViewInstancesCloudClick,
          },
          {
            active: isCloudLoaded && pathname.includes("pointCloud"),
            icon: saveCloudIcon,
            key: "save-cloud-button",
            label: t("tabs.files.save-cloud"),
            action: handleSaveCloudClick,
          },
          {
            active: false,
            // active:
            //   isCloudLoaded &&
            //   isEfficientRansacApplied &&
            //   pathname.includes("mesh"),
            icon: saveMeshIcon,
            key: "save-mesh-button",
            label: t("tabs.files.save-mesh"),
            action: handleSaveMeshClick,
          },
          {
            active: false,
            // active: isCloudLoaded && isEfficientRansacApplied,
            icon: saveCadIcon,
            key: "save-cad-button",
            label: t("tabs.files.save-cad"),
            action: handleSaveCadClick,
          },
          {
            active: isCloudLoaded && isEfficientRansacApplied,
            icon: saveResultsIcon,
            key: "save-results-button",
            label: t("tabs.files.save-results"),
            action: handleSaveResultsClick,
          },
        ]}
      />
    </>
  );
};

export default FilesTab;
