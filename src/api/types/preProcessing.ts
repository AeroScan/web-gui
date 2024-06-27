export enum PreProcessingFunctionTypes {
  ALIGNMENT = "alignment",
  CENTRALIZATION = "centralization",
  NOISE_ADD = "noise_add",
  NORMAL_ESTIMATION = "normal_estimation",
  VOXEL_GRID = "voxel_grid",
}

export type PreProcessingPostDto<T> = {
  uuid: string;
  session: string;
  function_type: PreProcessingFunctionTypes;
  values: T;
};

export type AlignmentParams = {};
export type CentralizationParams = {};

export type NoiseAddParams = {
  limit: number;
};

export type NormalEstimationParams = {
  radius: number;
};

export type VoxelGridParams = {
  leaf: number;
};
