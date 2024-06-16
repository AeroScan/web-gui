/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IVoxelGridContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const VoxelGridContext = createContext<IVoxelGridContext | undefined>(
  undefined
);

interface IVoxelGridProviderProps {
  children: ReactNode;
}

export const VoxelGridProvider: FC<IVoxelGridProviderProps> = ({
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
    <VoxelGridContext.Provider
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
    </VoxelGridContext.Provider>
  );
};

const useVoxelGrid = (): IVoxelGridContext => {
  const context = useContext(VoxelGridContext);
  if (!context)
    throw new Error("useVoxelGrid must be used within an VoxelGridProvider");
  return context;
};

export default useVoxelGrid;
