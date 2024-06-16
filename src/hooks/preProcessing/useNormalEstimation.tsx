/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface INormalEstimationContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
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

  // Normal Estimation handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <NormalEstimationContext.Provider
      value={{
        openModal,
        closeModal,
        clearApplied,
        setApplied: setAppliedHandler,
        applied: applied,
        modalOpen: modalOpen,
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
