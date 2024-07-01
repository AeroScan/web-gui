/* REACT */
import { FC, ReactNode, createContext, useState, useContext } from "react";

/* DTOS */
import { AnnotationDto } from "../api/types/annotations";

/* UTILS */
import { CloudViewType } from "../utils/types/cloud";

interface ICloudContext {
  cloudId: string;
  sessionId: string;
  isLoaded: boolean;
  plansCount: number;
  conesCount: number;
  spheresCount: number;
  cylindersCount: number;
  viewType: CloudViewType;
  annotations: AnnotationDto[];
  clearCloud: () => void;
  toggleViewType: () => void;
  updateCloudId: (_cloudId: string) => void;
  updateSessionId: (_sessionId: string) => void;
  updateAnnotations: (_annotations: AnnotationDto[]) => void;
}

const CloudContext = createContext<ICloudContext | undefined>(undefined);

interface ICloudProviderProps {
  children: ReactNode;
}

export const CloudProvider: FC<ICloudProviderProps> = ({ children }) => {
  // File identifiers for retrieval on the static server
  const [cloudId, setCloudId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  // Cloud view type
  const [viewType, setViewType] = useState<CloudViewType>("types");

  // Annotations
  const [annotations, setAnnotations] = useState<AnnotationDto[]>([]);

  // Counting primitive types
  const [plansCount, setPlansCount] = useState<number>(0);
  const [conesCount, setConesCount] = useState<number>(0);
  const [spheresCount, setSpheresCount] = useState<number>(0);
  const [cylindersCount, setCylindersCount] = useState<number>(0);

  // Handlers
  const clearCloud = () => {
    setCloudId("");
    setSessionId("");
    setPlansCount(0);
    setConesCount(0);
    setSpheresCount(0);
    setCylindersCount(0);
  };
  const updateCloudId = (_cloudId: string) => {
    setCloudId(_cloudId);
  };
  const updateSessionId = (_sessionId: string) => {
    setSessionId(_sessionId);
  };
  const updateAnnotations = (_annotations: AnnotationDto[]) => {
    setAnnotations(_annotations);
    setPlansCount(_annotations.filter((a) => a.title.includes("Plane")).length);
    setConesCount(_annotations.filter((a) => a.title.includes("Cone")).length);
    setSpheresCount(
      _annotations.filter((a) => a.title.includes("Sphere")).length
    );
    setCylindersCount(
      _annotations.filter((a) => a.title.includes("Cylinder")).length
    );
  };
  const toggleViewType = () => {
    setViewType((prev) => (prev === "instances" ? "types" : "instances"));
  };

  return (
    <CloudContext.Provider
      value={{
        cloudId,
        viewType,
        sessionId,
        plansCount,
        conesCount,
        annotations,
        spheresCount,
        cylindersCount,
        isLoaded: sessionId && cloudId ? true : false,
        clearCloud,
        updateCloudId,
        toggleViewType,
        updateSessionId,
        updateAnnotations,
      }}
    >
      {children}
    </CloudContext.Provider>
  );
};

const useCloud = (): ICloudContext => {
  const context = useContext(CloudContext);
  if (!context)
    throw new Error("useCloud must be used within an CloudProvider");
  return context;
};

export default useCloud;
