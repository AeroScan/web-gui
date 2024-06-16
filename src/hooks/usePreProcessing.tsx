/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IPreProcessingContext {
  isNormalEstimationApplied: boolean;
  setNormalEstimationApplied: () => void;
  clearNormalEstimationState: () => void;
}

const PreProcessingContext = createContext<IPreProcessingContext | undefined>(
  undefined
);

interface IPreProcessingProviderProps {
  children: ReactNode;
}

export const PreProcessingProvider: FC<IPreProcessingProviderProps> = ({
  children,
}) => {
  const [isNormalEstimationApplied, setIsNormalEstimationApplied] =
    useState<boolean>(false);
  const setNormalEstimationApplied = () => setIsNormalEstimationApplied(true);
  const clearNormalEstimationState = () => setIsNormalEstimationApplied(false);

  return (
    <PreProcessingContext.Provider
      value={{
        setNormalEstimationApplied,
        clearNormalEstimationState,
        isNormalEstimationApplied: isNormalEstimationApplied,
      }}
    >
      {children}
    </PreProcessingContext.Provider>
  );
};

const usePreProcessing = (): IPreProcessingContext => {
  const context = useContext(PreProcessingContext);
  if (!context)
    throw new Error(
      "usePreProcessing must be used within an PreProcessingProvider"
    );
  return context;
};

export default usePreProcessing;
