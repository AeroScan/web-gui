/* REACT */
import { FC } from "react";

/* COMPONENTS */
import { Modal, ModalProps } from "antd";

// Props type
export type FormModalProps = Pick<
  ModalProps,
  "title" | "cancelText" | "okText" | "onCancel" | "onClose" | "onOk" | "open"
> & {
  blockCondition?: boolean;
  blockConditionDescription?: string;
};

const FormModal: FC<FormModalProps> = ({
  blockCondition = false,
  blockConditionDescription = "",
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      {blockCondition ? blockConditionDescription : null}
    </Modal>
  );
};

export default FormModal;
