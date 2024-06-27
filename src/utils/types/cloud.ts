export interface I3DSpace {
  x: number;
  y: number;
  z: number;
}

export interface IRangeOnly {
  min: number;
  max: number;
}

export interface IRangeValue extends IRangeOnly {
  value: number;
}

export type CloudViewType = "types" | "instances";
