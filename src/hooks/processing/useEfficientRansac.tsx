/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IEfficientRansacContext {
  applied: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setApplied: () => void;
  clearApplied: () => void;
}

const EfficientRansacContext = createContext<
  IEfficientRansacContext | undefined
>(undefined);

interface IEfficientRansacProviderProps {
  children: ReactNode;
}

export const EfficientRansacProvider: FC<IEfficientRansacProviderProps> = ({
  children,
}) => {
  // Efficient Ransac states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  // Efficient Ransac handlers
  const setAppliedHandler = () => setApplied(true);
  const clearApplied = () => setApplied(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <EfficientRansacContext.Provider
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
    </EfficientRansacContext.Provider>
  );
};

const useEfficientRansac = (): IEfficientRansacContext => {
  const context = useContext(EfficientRansacContext);
  if (!context)
    throw new Error(
      "useEfficientRansac must be used within an EfficientRansacProvider"
    );
  return context;
};

export default useEfficientRansac;
