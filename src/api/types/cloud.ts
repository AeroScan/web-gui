export type CloudDto = {
  session: string;
  uuid: string;
};

export type ErrorStatusDto = {
  error: boolean;
  message: string;
};

export type UploadCloudResponseDto = CloudDto &
  ErrorStatusDto & {
    params_suggestion: string;
  };

export type DownloadCloudResponseDto = ErrorStatusDto & {
  data: string;
  extension: string;
};

export type ParamsSuggestionDto = {
  cloud_size_x: number;
  cloud_size_y: number;
  cloud_size_z: number;
  min_points_max: number;
  min_points_min: number;
  normal: number;
  normal_max: number;
  normal_min: number;
  normal_threshold_max: number;
  normal_threshold_min: number;
  probabilty_max: number;
  probability_min: number;
  ransac_cepsilon: number;
  ransac_cepsilon_max: number;
  ransac_cepsilon_min: number;
  ransac_epsilon: number;
  ransac_epsilon_max: number;
  ransac_epsilon_min: number;
  total_points: number;
  voxel: number;
};
