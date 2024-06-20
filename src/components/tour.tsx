/* REACT */
import { FC, ReactNode } from "react";

/* TOUR */
import { TourProvider } from "@reactour/tour";

/* UTILS */
import { useTranslation } from "react-i18next";
import { TSteps } from "../utils/types/steps";

interface TourProviderProps {
  children: ReactNode;
}

const Tour: FC<TourProviderProps> = ({ children }) => {

  const { t } = useTranslation();

  const tourConfig: TSteps[] = [
    {
      selector: ".first-step",
      content: t("Let's start the tour by te main page!"),
    },
    // {
    //   selector: "[data-tut='second-step']",
    //   content: () => (
    //     <p style={{ fontSize: "1.6rem" }}>
    //       So right here you have the tabs where you can navigate through it. Starting with
    //       the files tab, here you will find the functionalities of: <br /> ● Load Cloud <br />
    //       ● Save Cloud <br /> ● Save CAD <br />
    //     </p>
    //   )
    // },
    // {
    //   selector: "[data-tut='third-step']",
    //   content: ({ goTo }: any) => (
    //     <div>
    //       <p style={{ fontSize: "1.6rem" }}>
    //         Each tab has some buttons whose functionality is described in the guide. If you
    //         already know the functions that each tab present, you can go straight to step 7
    //         by clicking the button below.
    //       </p>
    //       <button onClick={() => goTo(7)}> d</button>
    //       {/* <StepButton style={{ textAlign: 'center' }} onClick={() => goTo(7)}> Step 7 </StepButton> */}
    //     </div>
    //   )
    // },
    // {
    //   selector: "[data-tut='fourth-step']",
    //   content: () => (
    //     <p style={{ fontSize: "1.6rem" }}>
    //       This tab presents all pre-processing functions as: <br /> ● Crop Box Filter <br /> ● Voxel Grid Filter
    //       <br /> ● Statistical Removal <br /> ● Normal Estimation <br /> ● Reescale <br /> ● Centralization <br /> ● Alignment
    //     </p>
    //   )
    // },
    {
      selector: ".fifth-step",
      content: t("The processing one shows the Efficient Ransac function."),
    },
    // {
    //   selector: "[data-tut='sixth-step']",
    //   content: () => (
    //     <p style={{ fontSize: "1.6rem" }}>
    //       This tab brings the functions of: <br /> ● Interface Tour <br /> ● About Software
    //     </p>
    //   )
    // },
    {
      selector: ".seventh-step",
      content: t("The last one presents the logout functionality."),
    },
    {
      selector: ".eighth-step",
      content: t("This is the viewer where the point clouds will be loaded and displayed."),
    },
    {
      selector: ".ninth-step",
      content: t("The sidebar has some tools and inside each one of the following menus you are going to find these tools. If you hover the option, it will show you a tooltip with a description of each feature."),
    },
    // {
    //   selector: "[data-tut='tenth-step']",
    //   content: () => (
    //     <div>
    //       <p style={{ fontSize: "1.6rem" }}>
    //         In this menu you are able to change some parameters of the viewer like the background color and the points budget.
    //       </p>
    //       {/* <StepButton style={{ textAlign: 'center' }} onClick={() => goTo(13)}> Step 13 </StepButton> */}
    //     </div>
    //   )
    // },
    {
      selector: ".eleventh-step",
      content: "In this menu we can found some useful tools to measure the cloud parameters like angles, distances, lengths. We also found some navigation tools."
    },
    {
      selector: ".twelfth-step",
      content: t("Do not forget that to end a command, just click with the right mouse button"),
    },
    {
      selector: ".thirteenth-step",
      content: t("Right here we have a tool to export the scene with the desired information."),
    },
    {
      selector: ".fourteenth-step",
      content: t("This one we have a way to filter the efficient ransac results (when they exist)."),
    },
  ]

  return (
    <TourProvider steps={tourConfig}>
      { children }
    </TourProvider>
  );
};

export default Tour;