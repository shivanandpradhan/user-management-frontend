import { ErrorIcon } from "../icons";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start">
      <div className="flex-shrink-0">
        <ErrorIcon className="h-5 w-5 text-red-400" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">{message}</h3>
      </div>
    </div>
  );
};

export default ErrorAlert;