import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  const { token } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ResetPasswordForm token={token || ""} />
    </div>
  );
};

export default ResetPasswordPage;
