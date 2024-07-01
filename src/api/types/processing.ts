export type ProcessingPostDto<T> = {
  uuid: string;
  session: string;
  values: T;
};

export type EfficientRansacParams = {
  probability: number;
  min_points: number;
  epsilon: number;
  cluster_epsilon: number;
  normal_threshold: number;
};
