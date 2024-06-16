/* REACT */
import { FC, ReactNode, createContext, useState, useContext } from "react";

interface IStatusContext {
  status: string;
  loading: string | false;
  updateStatus: (_status: string) => void;
  updateLoadingStatus: (_loading: string | false) => void;
}

const StatusContext = createContext<IStatusContext | undefined>(undefined);

interface IStatusProviderProps {
  children: ReactNode;
}

export const StatusProvider: FC<IStatusProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<string | false>(false);
  const updateStatus = (_status: string) => setStatus(_status);
  const updateLoadingStatus = (_loading: string | false) =>
    setLoading(_loading);

  return (
    <StatusContext.Provider
      value={{ status, loading, updateStatus, updateLoadingStatus }}
    >
      {children}
    </StatusContext.Provider>
  );
};

const useStatus = (): IStatusContext => {
  const context = useContext(StatusContext);
  if (!context)
    throw new Error("useStatus must be used within an StatusProvider");
  return context;
};

export default useStatus;
