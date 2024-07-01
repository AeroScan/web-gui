/* REACT */
import { FC, useState } from "react";

/* COMPONENTS */
import HeaderTab from "../../../components/headerTab";

/* CONTAINERS */
import AboutModal from "../../modals/help/AboutModal";

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
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);

  const openAboutModal = () => setAboutModalOpen(true);
  const closeAboutModal = () => setAboutModalOpen(false);

  const handleLanguageSwitch = (lng: TSupportedLanguages) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <AboutModal onClose={closeAboutModal} open={aboutModalOpen} />
      <HeaderTab
        items={[
          {
            active: false,
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
            action: openAboutModal,
          },
          {
            active: false,
            icon: tutorialsIcon,
            key: "tutorials-button",
            label: t("tabs.help.tutorials"),
            action: () => window.open("http://aeroscan.c3.furg.br/tutorials"),
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
    </>
  );
};

export default HelpTab;
