/* REACT */
import { FC } from "react";

/* HOOKS */
import useStatus from "../../hooks/useStatus";

/* UTILS */
import { useTranslation } from "react-i18next";

const Footer: FC = () => {
  const { t } = useTranslation();
  const { status } = useStatus();

  return (
    <div className="bg-light-grey h-16 w-full flex items-center justify-end pr-16">
      <span className="text-brown">
        <span className="font-semibold">Status: </span>
        {t(`status.${status}`)}
      </span>
    </div>
  );
};

export default Footer;
