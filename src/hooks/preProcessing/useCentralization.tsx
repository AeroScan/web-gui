/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface ICentralizationContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const CentralizationContext = createContext<ICentralizationContext | undefined>(
  undefined
);

interface ICentralizationProviderProps {
  children: ReactNode;
}

export const CentralizationProvider: FC<ICentralizationProviderProps> = ({
  children,
}) => {
  // Crop Box states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  // Crop Box handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <CentralizationContext.Provider
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
    </CentralizationContext.Provider>
  );
};

const useCentralization = (): ICentralizationContext => {
  const context = useContext(CentralizationContext);
  if (!context)
    throw new Error(
      "useCentralization must be used within an CentralizationProvider"
    );
  return context;
};

export default useCentralization;
