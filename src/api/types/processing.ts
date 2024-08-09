import { AnnotationDto } from "./annotations";
import { CloudDto, ErrorStatusDto } from "./cloud";

export type ProcessingPostDto<T> = CloudDto & {
  values: T;
};

export type ProcessingResponseDto = Pick<CloudDto, "uuid"> &
  ErrorStatusDto & {
    annotations: AnnotationDto[];
  };

export type EfficientRansacParams = {
  probability: number;
  min_points: number;
  epsilon: number;
  cluster_epsilon: number;
  normal_threshold: number;
};

export type RansacResultsDto = {
  data: string;
  error: boolean;
  message: string;
};

export type AeroScanParams = {};

export type AeroScanResultsDto = {
  data: string;
  error: boolean;
  message: string;
};
