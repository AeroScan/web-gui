/* REACT */
import { FC } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/* CONTAINERS */
import EfficientRansacModal from "../../modals/processing/efficientRansac";

/* UTILS */
import { useTranslation } from "react-i18next";

/* HOOKS */
import useEfficientRansac from "../../../hooks/processing/useEfficientRansac";

/* ASSETS */
import aeroScanIcon from "../../../assets/images/logo.png";
import efficientRansacIcon from "../../../assets/icons/processing/efficient-ransac.svg";

const ProcessingTab: FC = () => {
  const { t } = useTranslation();
  const { openModal: openRansacModal } = useEfficientRansac();

  return (
    <>
      <EfficientRansacModal />
      <HeaderTab
        items={[
          {
            active: true,
            icon: efficientRansacIcon,
            key: "efficient-ransac-button",
            label: t("tabs.processing.efficient-ransac"),
            action: openRansacModal,
          },
          {
            active: false,
            icon: aeroScanIcon,
            key: "aeroscan-button",
            label: t("tabs.processing.aeroscan"),
            action: () => console.log(t("tabs.processing.aeroscan")),
          },
        ]}
      />
    </>
  );
};

export default ProcessingTab;
