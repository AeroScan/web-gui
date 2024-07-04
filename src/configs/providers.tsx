/* REACT */
import { FC, ReactNode } from "react";

/* PROVIDERS */
import { CloudProvider } from "../hooks/useCloud";
import { StatusProvider } from "../hooks/useStatus";
import { CropBoxProvider } from "../hooks/preProcessing/useCropBox";
import { VoxelGridProvider } from "../hooks/preProcessing/useVoxelGrid";
import { StatisticalRemovalProvider } from "../hooks/preProcessing/useStatisticalRemoval";
import { NormalEstimationProvider } from "../hooks/preProcessing/useNormalEstimation";
import { ReescaleProvider } from "../hooks/preProcessing/useReescale";
import { CentralizationProvider } from "../hooks/preProcessing/useCentralization";
import { AlignmentProvider } from "../hooks/preProcessing/useAlignment";
import { NoiseAddProvider } from "../hooks/preProcessing/useNoiseAdd";
import { EfficientRansacProvider } from "../hooks/processing/useEfficientRansac";
import { InterfaceTourProvider } from "../hooks/useInterfaceTour";
import { ApplicationStateProvider } from "../hooks/useApplicationState";

// Props interface
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProviders: FC<GlobalProviderProps> = ({ children }) => (
  <ApplicationStateProvider>
    <InterfaceTourProvider>
      <CloudProvider>
        <CropBoxProvider>
          <VoxelGridProvider>
            <StatisticalRemovalProvider>
              <NormalEstimationProvider>
                <ReescaleProvider>
                  <CentralizationProvider>
                    <AlignmentProvider>
                      <NoiseAddProvider>
                        <EfficientRansacProvider>
                          <StatusProvider>{children}</StatusProvider>
                        </EfficientRansacProvider>
                      </NoiseAddProvider>
                    </AlignmentProvider>
                  </CentralizationProvider>
                </ReescaleProvider>
              </NormalEstimationProvider>
            </StatisticalRemovalProvider>
          </VoxelGridProvider>
        </CropBoxProvider>
      </CloudProvider>
    </InterfaceTourProvider>
  </ApplicationStateProvider>
);

export default GlobalProviders;
