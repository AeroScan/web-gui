/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IStatisticalRemovalContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const StatisticalRemovalContext = createContext<
  IStatisticalRemovalContext | undefined
>(undefined);

interface IStatisticalRemovalProviderProps {
  children: ReactNode;
}

export const StatisticalRemovalProvider: FC<
  IStatisticalRemovalProviderProps
> = ({ children }) => {
  // Crop Box states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  // Crop Box handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <StatisticalRemovalContext.Provider
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
    </StatisticalRemovalContext.Provider>
  );
};

const useStatisticalRemoval = (): IStatisticalRemovalContext => {
  const context = useContext(StatisticalRemovalContext);
  if (!context)
    throw new Error(
      "useStatisticalRemoval must be used within an StatisticalRemovalProvider"
    );
  return context;
};

export default useStatisticalRemoval;
