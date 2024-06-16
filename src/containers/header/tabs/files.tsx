/* REACT */
import { FC, useRef } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";
import UploadButton from "../../../components/uploadButton";

/* HOOKS */
import useCloud from "../../../hooks/useCloud";

/* API */
import useUploadCloud from "../../../api/services/clouds/upload";

/* UTILS */
import { useTranslation } from "react-i18next";

/* ASSETS */
import saveCadIcon from "../../../assets/icons/files/save-cad.svg";
import viewMeshIcon from "../../../assets/icons/files/view-mesh.svg";
import saveMeshIcon from "../../../assets/icons/files/save-mesh.svg";
import loadCloudIcon from "../../../assets/icons/files/load-cloud.svg";
import viewCloudIcon from "../../../assets/icons/files/view-cloud.svg";
import saveCloudIcon from "../../../assets/icons/files/save-cloud.svg";
import saveResultsIcon from "../../../assets/icons/files/save-results.svg";

const FilesTab: FC = () => {
  const { t } = useTranslation();
  const { isLoaded: isCloudLoaded } = useCloud();
  const { mutateAsync: uploadCloud } = useUploadCloud();
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleLoadCloudClick = () => {
    if (uploadButtonRef.current) {
      uploadButtonRef.current.click();
    }
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
            active: isCloudLoaded,
            icon: viewCloudIcon,
            key: "view-cloud-button",
            label: t("tabs.files.view-cloud"),
            action: () => console.log(t("tabs.files.view-cloud")),
          },
          {
            active: isCloudLoaded,
            icon: viewMeshIcon,
            key: "view-mesh-button",
            label: t("tabs.files.view-mesh"),
            action: () => console.log(t("tabs.files.view-mesh")),
          },
          {
            active: isCloudLoaded,
            icon: saveCloudIcon,
            key: "save-cloud-button",
            label: t("tabs.files.save-cloud"),
            action: () => console.log(t("tabs.files.save-cloud")),
          },
          {
            active: isCloudLoaded,
            icon: saveMeshIcon,
            key: "save-mesh-button",
            label: t("tabs.files.save-mesh"),
            action: () => console.log(t("tabs.files.save-mesh")),
          },
          {
            active: isCloudLoaded,
            icon: saveCadIcon,
            key: "save-cad-button",
            label: t("tabs.files.save-cad"),
            action: () => console.log(t("tabs.files.save-cad")),
          },
          {
            active: isCloudLoaded,
            icon: saveResultsIcon,
            key: "save-results-button",
            label: t("tabs.files.save-results"),
            action: () => console.log(t("tabs.files.save-results")),
          },
        ]}
      />
    </>
  );
};

export default FilesTab;
