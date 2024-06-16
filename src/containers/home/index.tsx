/* REACT */
import { FC } from "react";

/* UTILS */
import { useTranslation } from "react-i18next";

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[calc(100vh-232px)] flex items-center justify-center bg-black">
      <h1 className="text-white font-semibold">{t("home.text")}</h1>
    </div>
  );
};

export default Home;
