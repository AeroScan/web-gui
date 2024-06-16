/* REACT */
import { FC } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/* UTILS */
import { useTranslation } from "react-i18next";
import { TSupportedLanguages } from "../../../utils/constants/languages";

/* ASSETS */
import tourIcon from "../../../assets/icons/help/tour.svg";
import aboutIcon from "../../../assets/icons/help/about.svg";
import tutorialsIcon from "../../../assets/icons/help/tutorials.svg";
import languageIcon from "../../../assets/icons/help/language.svg";

const HelpTab: FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageSwitch = (lng: TSupportedLanguages) => {
    i18n.changeLanguage(lng);
  };

  return (
    <HeaderTab
      items={[
        {
          active: true,
          icon: tourIcon,
          key: "tour-button",
          label: t("tabs.help.tour"),
          action: () => console.log(t("tabs.help.tour")),
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
  );
};

export default HelpTab;
