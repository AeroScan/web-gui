export type CropBoxFormData = {
  startingX: number;
  startingY: number;
  startingZ: number;
  endingX: number;
  endingY: number;
  endingZ: number;
};

export type NoiseAddFormData = {
  limit: number;
};

export type NormalEstimationFormData = {
  radius: number;
};

export type ReescaleFormData = {
  factor: number;
};

export type StatisticalRemovalFormData = {
  mean: number;
  standardDeviation: number;
};

export type VoxelGridFormData = {
  leafSize: number;
};
