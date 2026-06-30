interface MfaInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  description: string;
  error?: string | null;
}

const MfaInput = ({
  value,
  onChange,
  label,
  placeholder,
  description,
  error,
}: MfaInputProps) => {
  return (
    <div>
      <label
        htmlFor="mfaCode"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id="mfaCode"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-opacity-50 transition-all"
        placeholder={placeholder}
      />
      <p className="mt-1 text-xs text-gray-500">{description}</p>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default MfaInput;