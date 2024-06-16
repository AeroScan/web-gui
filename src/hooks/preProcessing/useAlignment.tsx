/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IAlignmentContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const AlignmentContext = createContext<IAlignmentContext | undefined>(
  undefined
);

interface IAlignmentProviderProps {
  children: ReactNode;
}

export const AlignmentProvider: FC<IAlignmentProviderProps> = ({
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
    <AlignmentContext.Provider
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
    </AlignmentContext.Provider>
  );
};

const useAlignment = (): IAlignmentContext => {
  const context = useContext(AlignmentContext);
  if (!context)
    throw new Error("useAlignment must be used within an AlignmentProvider");
  return context;
};

export default useAlignment;
