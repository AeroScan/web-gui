/* REACT */
import { FC } from "react";

/* COMPONENTS */
import { Modal } from "antd";

/* UTILS */
import { useTranslation } from "react-i18next";

// Props interface
interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal: FC<AboutModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      footer={null}
      open={open}
      onClose={onClose}
      onCancel={onClose}
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
  );
};

export default AboutModal;
