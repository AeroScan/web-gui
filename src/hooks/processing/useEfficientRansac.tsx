/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

/* UTILS */
import { extractParam } from "../../utils/functions/extractParams";
import { EfficientRansacFormData } from "../../utils/types/processing";

interface IEfficientRansacContext {
  applied: boolean;
  modalOpen: boolean;
  suggestedParams: EfficientRansacFormData;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
  clearSuggestedParams: () => void;
  updateSuggestedParams: (strObj: string) => void;
}

const EfficientRansacContext = createContext<
  IEfficientRansacContext | undefined
>(undefined);

interface IEfficientRansacProviderProps {
  children: ReactNode;
}

export const EfficientRansacProvider: FC<IEfficientRansacProviderProps> = ({
  children,
}) => {
  // Efficient Ransac states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [suggestedParams, setSuggestedParams] =
    useState<EfficientRansacFormData>({
      probability: 0,
      clusterEpsilon: 0,
      epsilon: 0,
      minPoints: 0,
      normalThreshold: 0,
      primitive: [""],
    });

  // Efficient Ransac handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const clearSuggestedParams = () =>
    setSuggestedParams({
      probability: 0,
      clusterEpsilon: 0,
      epsilon: 0,
      minPoints: 0,
      normalThreshold: 0,
      primitive: [""],
    });
  const updateSuggestedParams = (strObj: string) => {
    setSuggestedParams({
      ...suggestedParams,
      clusterEpsilon: extractParam(strObj, "ransac_cepsilon") || 0,
      epsilon: extractParam(strObj, "ransac_epsilon") || 0,
    });
  };

  return (
    <EfficientRansacContext.Provider
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
    </EfficientRansacContext.Provider>
  );
};

const useEfficientRansac = (): IEfficientRansacContext => {
  const context = useContext(EfficientRansacContext);
  if (!context)
    throw new Error(
      "useEfficientRansac must be used within an EfficientRansacProvider"
    );
  return context;
};

export default useEfficientRansac;
