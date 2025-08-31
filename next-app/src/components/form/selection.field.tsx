import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ErrorNoti } from "./error_noti";

export interface SelectionOption {
  value: string;
  label: string;
}

interface SelectionFieldProps<T extends FieldValues> {
  name: Path<T>;
  required?: string;
  label?: string;
  options: SelectionOption[];
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}
export default function SelectionField<T extends FieldValues>(
  props: SelectionFieldProps<T>,
) {
  return (
    <div className={(props.className ?? "mt-2") + " relative"}>
      {props.label != null && (
        <label className="block mb-1">
          {props.label}
          {props.required ? <span className="align-top">*</span> : ""}
        </label>
      )}
      <select
        className="border-2 rounded-md px-2"
        {...props.register(props.name, {
          required: props.required,
        })}
      >
        {props.options.map((value: SelectionOption) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </select>
      {props.error && <ErrorNoti message={props.error.message} />}
    </div>
  );
}
