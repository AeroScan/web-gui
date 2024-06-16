import { ReactNode } from "react";

export type TTabItem = {
  key: string;
  active: boolean;
  label: ReactNode;
  children: ReactNode;
};

export type TTabChildItem = {
  key: string;
  active: boolean;
  icon: string;
  label: string;
  action: () => void;
};
