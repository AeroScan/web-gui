/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface INoiseAddContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const NoiseAddContext = createContext<INoiseAddContext | undefined>(undefined);

interface INoiseAddProviderProps {
  children: ReactNode;
}

export const NoiseAddProvider: FC<INoiseAddProviderProps> = ({ children }) => {
  // Crop Box states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  // Crop Box handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <NoiseAddContext.Provider
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
    </NoiseAddContext.Provider>
  );
};

const useNoiseAdd = (): INoiseAddContext => {
  const context = useContext(NoiseAddContext);
  if (!context)
    throw new Error("useNoiseAdd must be used within an NoiseAddProvider");
  return context;
};

export default useNoiseAdd;
