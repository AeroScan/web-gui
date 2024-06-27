/* REACT */
import { useRef, useState } from "react";

/* COMPONENTS */
import FormParameter from "./item";
import { Button, Modal } from "antd";
import Draggable from "react-draggable";
import { CloseOutlined } from "@ant-design/icons";

/* UTILS */
import { FormModalProps } from "./types";
import { FieldValues, useForm } from "react-hook-form";
import type { DraggableBounds, DraggableEventHandler } from "react-draggable";

function FormModal<T extends FieldValues>({
  title,
  subtitle,
  submitText,
  cancelText,
  parameters,
  blockCondition = false,
  blockDescription = "",
  onClose,
  onSubmit,
  onCancel,
  ...modalProps
}: FormModalProps<T>): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const draggleRef = useRef<any>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
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
      width={750}
      footer={null}
      destroyOnClose
      closable={false}
      onClose={onClose}
      maskClosable={true}
      title={
        <div
          onMouseOut={() => setDisabled(true)}
          onMouseOver={() => disabled && setDisabled(false)}
          className="cursor-move w-full flex justify-center mb-5"
        >
          <h1 className="text-lg font-bold text-center w-full ml-5">{title}</h1>
          <CloseOutlined
            onClick={onClose}
            className="text-base text-gray-500 p-1 cursor-pointer transition-all duration-200 hover:opacity-60"
          />
        </div>
      }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        {blockCondition ? (
          <h2 className="w-full text-center text-base break-words mb-4">
            {blockDescription}
          </h2>
        ) : (
          <>
            {subtitle && (
              <h2 className="w-full text-justify text-xs break-words mb-4">
                {subtitle}
              </h2>
            )}
            {parameters.map((item) => (
              <FormParameter
                key={item.id}
                control={control}
                error={(errors[item.name]?.message as string) || undefined}
                {...item}
              />
            ))}
          </>
        )}
        <div className="w-full flex justify-center gap-4 mt-4">
          <Button onClick={onCancel}>{cancelText}</Button>
          {!blockCondition && (
            <Button htmlType="submit" type="primary">
              {submitText}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default FormModal;
