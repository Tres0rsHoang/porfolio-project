import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ErrorNoti } from "./error_noti";

interface TextAreaProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;

  placeholder?: string;
  error?: FieldError;
  required?: string;
  className?: string;
}
export function TextAreaField<T extends FieldValues>(props: TextAreaProps<T>) {
  return (
    <div
      className={props.className ?? "mt-2"}
      style={{
        position: "relative",
      }}
    >
      <textarea
        {...props.register(props.name, { required: props.required })}
        placeholder={`${props.placeholder}${props.required ? "*" : ""}`}
        className="w-full h-full"
      />
      {props.error && <ErrorNoti message={props.error.message} />}
    </div>
  );
}
