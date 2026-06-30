import { LoadingSpinnerIcon } from "../icons";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <>
      <LoadingSpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
      {text}
    </>
  );
};

export default LoadingSpinner;