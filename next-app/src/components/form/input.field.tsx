import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  Validate,
  ValidationRule,
} from "react-hook-form";
import { ErrorNoti } from "./error_noti";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;

  autoFocus?: boolean;
  label?: string;
  required?: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  className?: string;
  pattern?: ValidationRule<RegExp>;
  validate?: Validate<FieldPathValue<T, Path<T>>, T>;
}

export function InputField<T extends FieldValues>(props: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={props.className ?? "mt-2"}
      style={{
        position: "relative",
      }}
    >
      {props.label != null && (
        <h3>
          <span>{props.label}</span>
          {props.required && <span className="text-(--red)">*</span>}
        </h3>
      )}
      <input
        {...props.register(props.name, {
          required: props.required,
          pattern: props.pattern,
          validate: props.validate,
        })}
        placeholder={`${props.placeholder}${props.required ? "*" : ""}`}
        type={props.type == "password" && showPassword ? "text" : props.type}
        className="w-full"
        autoFocus={props.autoFocus}
      />
      {props.type == "password" && (
        <button
          tabIndex={-1}
          style={{
            position: "absolute",
            paddingBlock: "13px",
            border: "none",
            right: "0",
          }}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {showPassword ? (
              <motion.span
                key="eye-off"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <EyeOff size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="eye"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Eye size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}
      {props.error && <ErrorNoti message={props.error.message} />}
    </div>
  );
}
