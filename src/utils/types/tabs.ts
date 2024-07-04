import { ReactNode } from "react";

export enum TTabs {
  FILES = "files",
  PRE_PROCESSING = "preProcessing",
  PROCESSING =  "processing",
  HELP = "help",
  ADMIN = "admin",
  ACCOUNT = "account",
};

export type TTabItem = {
  key: string;
  active: boolean;
  label: ReactNode;
  ref?: any;
  children: ReactNode;
};

export type TTabChildItem = {
  key: string;
  active: boolean;
  icon: string;
  label: string;
  ref?: any;
  action: () => void;
};
