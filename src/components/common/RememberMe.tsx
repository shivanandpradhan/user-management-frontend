interface RememberMeProps {
  id?: string;
}

const RememberMe = ({ id = "remember-me" }: RememberMeProps) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label
        htmlFor={id}
        className="ml-2 block text-sm text-gray-700"
      >
        Remember me
      </label>
    </div>
  );
};

export default RememberMe;