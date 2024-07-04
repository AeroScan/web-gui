/* REACT */
import { FC } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/* HOOKS*/
import useInterfaceTour from "../../../hooks/useInterfaceTour";

/* UTILS */
import { useTranslation } from "react-i18next";
import { TSupportedLanguages } from "../../../utils/constants/languages";
import { useNavigate } from "react-router";

/* ASSETS */
import tourIcon from "../../../assets/icons/help/tour.svg";
import aboutIcon from "../../../assets/icons/help/about.svg";
import tutorialsIcon from "../../../assets/icons/help/tutorials.svg";
import languageIcon from "../../../assets/icons/help/language.svg";

const HelpTab: FC = () => {
  const { t, i18n } = useTranslation();
  const { openTour } = useInterfaceTour();
  const navigate = useNavigate();

  const { helpTabRef } = useInterfaceTour();

  const handleLanguageSwitch = (lng: TSupportedLanguages) => {
    i18n.changeLanguage(lng);
  };

  const handleTour = () => {
    navigate("pointCloud");
    openTour();
  }

  return (
    <div ref={helpTabRef}>
      <HeaderTab
      items={[
        {
          active: true,
          icon: tourIcon,
          key: "tour-button",
          label: t("tabs.help.tour"),
          action: () => handleTour(),
        },
        {
          active: true,
          icon: aboutIcon,
          key: "about-button",
          label: t("tabs.help.about"),
          action: () => console.log(t("tabs.help.about")),
        },
        {
          active: true,
          icon: tutorialsIcon,
          key: "tutorials-button",
          label: t("tabs.help.tutorials"),
          action: () => console.log(t("tabs.help.tutorials")),
        },
        {
          active: true,
          icon: languageIcon,
          key: "language-button",
          label: t("tabs.help.switch-language"),
          action: () =>
            handleLanguageSwitch(i18n.language === "pt" ? "en" : "pt"),
        },
      ]}
    />
    </div>
  );
};

export default HelpTab;
