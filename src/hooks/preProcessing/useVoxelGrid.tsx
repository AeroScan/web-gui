/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

/* UTILS */
import { extractParam } from "../../utils/functions/extractParams";
import { VoxelGridFormData } from "../../utils/types/preProcessing";

interface IVoxelGridContext {
  applied: boolean;
  modalOpen: boolean;
  suggestedParams: VoxelGridFormData;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
  clearSuggestedParams: () => void;
  updateSuggestedParams: (strObj: string) => void;
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
  // Voxel grid states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [suggestedParams, setSuggestedParams] = useState<VoxelGridFormData>({
    leafSize: 0,
  });

  // Voxel grid handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const clearSuggestedParams = () =>
    setSuggestedParams({
      leafSize: 0,
    });
  const updateSuggestedParams = (strObj: string) => {
    setSuggestedParams({
      leafSize: extractParam(strObj, "voxel") || 0,
    });
  };

  return (
    <VoxelGridContext.Provider
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
