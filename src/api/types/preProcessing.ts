import { CloudDto, ErrorStatusDto } from "./cloud";

export enum PreProcessingFunctionTypes {
  ALIGNMENT = "alignment",
  CENTRALIZATION = "centralization",
  CROP_BOX = "crop_box",
  NOISE_ADD = "noise_add",
  NORMAL_ESTIMATION = "normal_estimation",
  REESCALE = "reescale",
  STATISTICAL_REMOVAL = "statistical_removal",
  VOXEL_GRID = "voxel_grid",
}

export type PreProcessingPostDto<T> = CloudDto & {
  function_type: PreProcessingFunctionTypes;
  values: T;
};

export type PreProcessingResponseDto = Pick<CloudDto, "uuid"> &
  ErrorStatusDto & {
    params_suggestion: string;
  };

export type AlignmentParams = {};
export type CentralizationParams = {};

export type CropBoxParams = {
  min_x: number;
  min_y: number;
  min_z: number;
  max_x: number;
  max_y: number;
  max_z: number;
};

export type NoiseAddParams = {
  limit: number;
};

export type NormalEstimationParams = {
  radius: number;
};

export type ReescaleParams = {
  factor: number;
};

export type StatisticalRemovalParams = {
  mean: number;
  std: number;
};

export type VoxelGridParams = {
  leaf: number;
};
