/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

/* UTILS */
import { extractParam } from "../../utils/functions/extractParams";
import { NormalEstimationFormData } from "../../utils/types/preProcessing";

interface INormalEstimationContext {
  applied: boolean;
  modalOpen: boolean;
  suggestedParams: NormalEstimationFormData;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
  clearSuggestedParams: () => void;
  updateSuggestedParams: (strObj: string) => void;
}

const NormalEstimationContext = createContext<
  INormalEstimationContext | undefined
>(undefined);

interface INormalEstimationProviderProps {
  children: ReactNode;
}

export const NormalEstimationProvider: FC<INormalEstimationProviderProps> = ({
  children,
}) => {
  // Normal Estimation states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [suggestedParams, setSuggestedParams] =
    useState<NormalEstimationFormData>({
      radius: 0,
    });

  // Normal Estimation handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const clearSuggestedParams = () =>
    setSuggestedParams({
      radius: 0,
    });
  const updateSuggestedParams = (strObj: string) => {
    setSuggestedParams({
      radius: extractParam(strObj, "normal") || 0,
    });
  };

  return (
    <NormalEstimationContext.Provider
      value={{
        openModal,
        closeModal,
        clearApplied,
        clearSuggestedParams,
        updateSuggestedParams,
        setApplied: setAppliedHandler,
        applied: applied,
        modalOpen: modalOpen,
        suggestedParams: suggestedParams,
      }}
    >
      {children}
    </NormalEstimationContext.Provider>
  );
};

const useNormalEstimation = (): INormalEstimationContext => {
  const context = useContext(NormalEstimationContext);
  if (!context)
    throw new Error(
      "useNormalEstimation must be used within an NormalEstimationProvider"
    );
  return context;
};

export default useNormalEstimation;
