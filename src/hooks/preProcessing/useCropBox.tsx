/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface ICropBoxContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const CropBoxContext = createContext<ICropBoxContext | undefined>(undefined);

interface ICropBoxProviderProps {
  children: ReactNode;
}

export const CropBoxProvider: FC<ICropBoxProviderProps> = ({ children }) => {
  // Crop Box states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  // Crop Box handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <CropBoxContext.Provider
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
    </CropBoxContext.Provider>
  );
};

const useCropBox = (): ICropBoxContext => {
  const context = useContext(CropBoxContext);
  if (!context)
    throw new Error("useCropBox must be used within an CropBoxProvider");
  return context;
};

export default useCropBox;
