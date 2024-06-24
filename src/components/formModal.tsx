/* REACT */
import { FC, useRef, useState } from "react";

/* COMPONENTS */
import { Modal, ModalProps } from "antd";
import Draggable from "react-draggable";

/* TYPES */
import type { DraggableBounds, DraggableEventHandler } from "react-draggable";

// Props type
export type FormModalProps = Pick<
  ModalProps,
  | "open"
  | "onOk"
  | "title"
  | "okText"
  | "onClose"
  | "onCancel"
  | "children"
  | "cancelText"
> & {
  blockCondition?: boolean;
  blockConditionDescription?: string;
};

const FormModal: FC<FormModalProps> = ({
  children,
  blockCondition = false,
  blockConditionDescription = "",
  ...modalProps
}) => {
  const draggleRef = useRef<any>(null);
  const [bounds, setBounds] = useState<
    string | false | DraggableBounds | undefined
  >({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart: DraggableEventHandler = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      {...modalProps}
      modalRender={(modal) => (
        <Draggable
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      {blockCondition ? blockConditionDescription : children}
    </Modal>
  );
};

export default FormModal;
