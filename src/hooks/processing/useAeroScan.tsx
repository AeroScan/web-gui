/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

/* UTILS */
import { extractParam } from "../../utils/functions/extractParams";
import { AeroScanFormData } from "../../utils/types/processing";

interface IAeroScanContext {
  applied: boolean;
  modalOpen: boolean;
  suggestedParams: AeroScanFormData;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
  clearSuggestedParams: () => void;
  updateSuggestedParams: (strObj: string) => void;
}

const AeroScanContext = createContext<IAeroScanContext | undefined>(undefined);

interface IAeroScanProviderProps {
  children: ReactNode;
}

export const AeroScanProvider: FC<IAeroScanProviderProps> = ({ children }) => {
  // Efficient Ransac states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [suggestedParams, setSuggestedParams] = useState<AeroScanFormData>({});

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
    });
  const updateSuggestedParams = (strObj: string) => {
    setSuggestedParams({
      ...suggestedParams,
      clusterEpsilon: extractParam(strObj, "ransac_cepsilon") || 0,
      epsilon: extractParam(strObj, "ransac_epsilon") || 0,
    });
  };

  return (
    <AeroScanContext.Provider
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
    </AeroScanContext.Provider>
  );
};

const useAeroScan = (): IAeroScanContext => {
  const context = useContext(AeroScanContext);
  if (!context)
    throw new Error("useAeroScan must be used within an AeroScanProvider");
  return context;
};

export default useAeroScan;

