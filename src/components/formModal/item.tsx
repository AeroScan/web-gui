/* COMPONENTS */
import { Controller } from "react-hook-form";
import { Col, InputNumber, Row, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

/* UTILS */
import type { FieldValues } from "react-hook-form";
import type { ParameterProps } from "./types";

function FormParameter<T extends FieldValues>({
  name,
  label,
  error,
  tooltip,
  control,
  required,
  placeholder,
  allowNegative,
}: ParameterProps<T>): JSX.Element {
  return (
    <Row gutter={16} align="middle" className="w-4/5 my-2">
      <Col span={6} className="flex justify-end">
        <label className="text-right w-full" htmlFor={name}>
          {required && <span className="text-red-500">*</span>}{" "}
          <span>{`${label}:`}</span>
        </label>
      </Col>
      <Col span={16}>
        <Controller
          name={name}
          control={control}
          rules={
            required
              ? {
                  required: required,
                }
              : undefined
          }
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder={placeholder}
              min={allowNegative ? undefined : 0}
              className={`w-full ${error ? "border border-red-500" : ""}`}
            />
          )}
        />
      </Col>
      <Col span={2}>
        <Tooltip placement="right" title={tooltip}>
          <QuestionCircleOutlined className="cursor-help text-lg" />
        </Tooltip>
      </Col>
      {error && (
        <span className="error text-xs text-red-500 w-full text-center mt-1 ml-12">
          {error}
        </span>
      )}
    </Row>
  );
}

export default FormParameter;
