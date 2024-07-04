/* REACT */
import { FC, ReactNode, createContext, useContext, useState } from "react";

/* UTILS */
import { TTabs } from "../utils/types/tabs";

interface IApplicationStateContext {
  activeTab: TTabs;
  setActiveTab: (tb: TTabs) => void;
}

const ApplicationStateContext = createContext<IApplicationStateContext | undefined>(undefined);

interface IApplicationStateProviderProps {
  children: ReactNode;
}

export const ApplicationStateProvider: FC<IApplicationStateProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.FILES);
  const handleTabChange = (tab: TTabs) => setActiveTab(tab);

  return (
    <ApplicationStateContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      {children}
    </ApplicationStateContext.Provider>
  );
}

const useApplicationState = (): IApplicationStateContext => {
  const context = useContext(ApplicationStateContext);
  if (!context)
    throw new Error("useApplicationState must be used within an ApplicationStateProvider");
  return context;
}

export default useApplicationState;
