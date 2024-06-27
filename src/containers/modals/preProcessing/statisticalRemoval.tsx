/* REACT */
import { FC } from "react";

/* COMPONENTS */
// import FormModal from "../../../components/formModal";

// /* HOOKS */
// import useCloud from "../../../hooks/useCloud";
// import useStatisticalRemoval from "../../../hooks/preProcessing/useStatisticalRemoval";

// /* UTILS */
// import { useTranslation } from "react-i18next";

const StatisticalRemovalModal: FC = () => {
  // const { t } = useTranslation();
  // const { sessionId, cloudId } = useCloud();
  // const { modalOpen, closeModal } = useStatisticalRemoval();

  // const blockCondition: boolean = !!!sessionId || !!!cloudId;

  return (
    <></>
    // <FormModal
    //   open={modalOpen}
    //   onClose={closeModal}
    //   blockCondition={blockCondition}
    //   title={t("modals.statisticalRemoval.title")}
    //   blockConditionDescription={t(
    //     "modals.statisticalRemoval.blockDescription"
    //   )}
    // />
  );
};

export default StatisticalRemovalModal;
