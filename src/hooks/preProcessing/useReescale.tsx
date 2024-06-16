/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IReescaleContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const ReescaleContext = createContext<IReescaleContext | undefined>(undefined);

interface IReescaleProviderProps {
  children: ReactNode;
}

export const ReescaleProvider: FC<IReescaleProviderProps> = ({ children }) => {
  // Crop Box states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  // Crop Box handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <ReescaleContext.Provider
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
    </ReescaleContext.Provider>
  );
};

const useReescale = (): IReescaleContext => {
  const context = useContext(ReescaleContext);
  if (!context)
    throw new Error("useReescale must be used within an ReescaleProvider");
  return context;
};

export default useReescale;
