import { useForm } from "react-hook-form";
import { useApiMutation } from "../../../hooks/useApi";
import { verifyMfa } from "../../../api/auth";
import Error from "../../common/Error";

const MfaVerify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>();
  const { mutate, isPending, error } = useApiMutation(verifyMfa, {}, []);

  const onSubmit = (data: { code: string }) => {
    mutate(data);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-4">Verify MFA Code</h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter the 6-digit code from your authenticator app.
      </p>
      {error && <Error message={error.message} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              {...register("code", {
                required: "Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Code must be 6 digits",
                },
              })}
              className={`mt-1 block w-full rounded-md ${
                errors.code ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              placeholder="123456"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isPending ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MfaVerify;
