/* UTILS */
import type { ModalProps } from "antd";
import type { Control, FieldValues, Path } from "react-hook-form";

// Props type
export type FormModalProps<T extends FieldValues> = Pick<
  ModalProps,
  "open" | "title" | "onClose" | "children" | "onCancel" | "cancelText"
> & {
  subtitle?: string;
  submitText: string;
  blockCondition?: boolean;
  blockDescription?: string;
  parameters: ParameterItem<T>[];
  onSubmit: (data: T) => void;
};

export type ParameterItem<T> = {
  id: string;
  name: Path<T>;
  label: string;
  required?: string;
  tooltip?: string;
  placeholder: string;
};

// Parameters type
export type ParameterProps<T extends FieldValues> = ParameterItem<T> & {
  error?: string;
  control: Control<T>;
};
