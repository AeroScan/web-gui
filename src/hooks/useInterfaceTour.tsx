/* REACT */
import { FC, ReactNode, createContext, useRef, useContext, useState } from "react";

/* COMPONENTS */
import { Tour, Button } from "antd";

/* HOOKS */
import useApplicationState from "./useApplicationState";

/* UTILS */
import type { TourProps } from "antd";
import { TTabs } from "../utils/types/tabs";
import { useTranslation } from "react-i18next";

interface IInterfaceTourContext {
  mainPageRef: any;
  filesTabRef: any;
  fileButtonRef: any;
  preProcessingTabRef: any;
  processingTabRef: any;
  helpTabRef: any;
  accountTabRef: any;
  viewerRef : any;
  sidebarRef: any;
  statusRef: any;
  openTour: () => void;
}

const InterfaceTourContext = createContext<IInterfaceTourContext | undefined>(undefined);

interface IInterfaceTourProviderProps {
  children: ReactNode;
}

export const InterfaceTourProvider: FC<IInterfaceTourProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const { setActiveTab } = useApplicationState();
  const [currentStep, setCurrentStep] = useState<boolean>();

  const mainPageRef = useRef<any>();
  const filesTabRef = useRef<any>();
  const fileButtonRef = useRef<any>();
  const preProcessingTabRef = useRef<any>();
  const processingTabRef = useRef<any>();
  const helpTabRef = useRef<any>();
  const accountTabRef = useRef<any>();
  const viewerRef = useRef<any>();
  const sidebarRef = useRef<any>();
  const statusRef = useRef<any>();
  
  const [open, setOpen] = useState<boolean>(false);

  const handleStepChange = (current: number) => {
    if(current === 1){
      setActiveTab(TTabs.FILES);
    }else if(current === 3){
      setActiveTab(TTabs.PRE_PROCESSING);
      current = 6
    }else if(current === 4){
      setActiveTab(TTabs.PROCESSING);
    }else if(current === 5){
      setActiveTab(TTabs.HELP);
    }else if(current === 6){
      setActiveTab(TTabs.ACCOUNT);
    }
  }

  const steps: TourProps['steps'] = [
    {
      title: t("steps.first-step.title"),
      description: t("steps.first-step.description"),
      target: () => mainPageRef.current,
    },
    {
      title: t("steps.second-step.title"),
      description: (<p>
        {t("steps.second-step.description")} 
        <br /> 
        {t("tabs.files.load-cloud")} <br />
        {t("tabs.files.view-cloud")} <br />
        {t("tabs.files.view-mesh")} <br />
        {t("tabs.files.save-cloud")} <br />
        {t("tabs.files.save-mesh")} <br /> 
        {t("tabs.files.save-cad")} <br />
        {t("tabs.files.save-results")} <br />
      </p>),
      target: () => filesTabRef.current,
    },
    {
      title: t("steps.third-step.title"),
      description: (
        <div>
          <p>
            {t("steps.third-step.description")}
          </p>
          {/* <Button type="primary" className="flex">{t("button-step")}</Button> */}
          
        </div>
      ),
      target: () => fileButtonRef.current,
    },
    {
      title: t("steps.fourth-step.title"),
      description: (
        <p>
          {t("steps.fourth-step.description")}<br /> 
          {t("tabs.pre-processing.crop-box")} <br />
          {t("tabs.pre-processing.voxel-grid")} <br />
          {t("tabs.pre-processing.statistical-removal")} <br />
          {t("tabs.pre-processing.normal-estimation")} <br />
          {t("tabs.pre-processing.reescale")} <br />
          {t("tabs.pre-processing.centralization")} <br />
          {t("tabs.pre-processing.alignment")}
          {t("tabs.pre-processing.noise-add")}
        </p>
      ),
      target: () => preProcessingTabRef.current,
    },
    {
      title: t("steps.fifth-step.title"),
      description: t("steps.fifth-step.description"),
      target: () => processingTabRef.current,
    },
    {
      title: t("steps.sixth-step.title"),
      description: (
        <p>
          {t("steps.sixth-step.description")}<br />
          {t("tabs.help.tour")} <br />
          {t("tabs.help.about")} <br />
          {t("tabs.help.tutorials")} <br />
          {t("tabs.help.switch-language")} <br />
        </p>
      ),
      target: () => helpTabRef.current,
    },
    {
      title: t("steps.seventh-step.title"),
      description: t("steps.seventh-step.description"),
      target: () => accountTabRef.current,
    },
    {
      title: t("steps.eighth-step.title"),
      description: t("steps.eighth-step.description"),
      target: () => viewerRef.current,
    },
    {
      title: t("steps.ninth-step.title"),
      description: t("steps.ninth-step.description"),
      target: () => sidebarRef.current,
    },
    {
      title: t("steps.tenth-step.title"),
      description: t("steps.tenth-step.description"),
      target: () => statusRef.current,
    },
  ];

  return (
    <InterfaceTourContext.Provider 
      value={{ 
        mainPageRef: mainPageRef,
        filesTabRef: filesTabRef, 
        fileButtonRef: fileButtonRef,
        preProcessingTabRef: preProcessingTabRef,
        processingTabRef: processingTabRef,
        helpTabRef: helpTabRef,
        accountTabRef: accountTabRef,
        viewerRef: viewerRef,
        sidebarRef: sidebarRef, 
        statusRef: statusRef,
        openTour: () => setOpen(true) 
      }}>
      <Tour open={open} onChange={handleStepChange} onClose={() => setOpen(false)} steps={steps}/>
      {children}
    </InterfaceTourContext.Provider>
  );
}

const useInterfaceTour = (): IInterfaceTourContext => {
  const context = useContext(InterfaceTourContext);
  if (!context)
    throw new Error("useInterfaceTour must be used within an InterfaceTourProvider");
  return context;
}

export default useInterfaceTour;
