/* REACT */
import { FC, useState } from "react";

/* COMPONENTS */
import { Modal } from "antd";
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
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);

  const openAboutModal = () => setAboutModalOpen(true);
  const closeAboutModal = () => setAboutModalOpen(false);

  const handleLanguageSwitch = (lng: TSupportedLanguages) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Modal
        footer={null}
        open={aboutModalOpen}
        onClose={closeAboutModal}
        onCancel={closeAboutModal}
        title={
          <div className="w-full text-center text-xl mb-6">
            {t("tabs.help.about")}
          </div>
        }
      >
        <div className="flex flex-col w-full gap-2">
          <p className="text-justify">{t("about.line1")}</p>
          <p className="text-justify">{t("about.line2")}</p>
          <p className="text-center mt-2 font-semibold">{t("about.credits")}</p>
          <p className="text-justify">
            Beatriz Bernardo, Christian Froes, Felipe Saadi, Guilherme de
            Oliveira, Igor Maurell, Jardel Dyonisio, Luis Henrique Reichow, Luis
            Felipe Milczarek, Mauro Lilles, Miguel dos Santos, Paulo Drews Jr.,
            Pedro Corçaque, Ricardo Grando
          </p>
          <p className="text-left italic">
            Coordenação Petrobras: CENPES/PDIDP/ESUP/TIS, Cesar Luiz Silva
          </p>
        </div>
      </Modal>
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
