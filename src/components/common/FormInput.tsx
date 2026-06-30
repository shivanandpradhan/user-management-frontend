import type { UseFormRegister, FieldError } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { ErrorIcon } from "../icons";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: FieldError | null;
  register: UseFormRegister<any>;
  name: string;
  validation?: any;
  type?: string;
  placeholder?: string;
  className?: string;
}

const FormInput = ({
  id,
  label,
  error,
  register,
  name,
  validation,
  type = "text",
  placeholder,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          {...register(name, validation)}
          className={`block w-full px-4 py-3 rounded-lg border ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
            error ? "pr-12" : ""
          } ${className}`}
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ErrorIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;