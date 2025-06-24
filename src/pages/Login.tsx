import LoginForm from "../components/auth/LoginForm";
import AuthWrapper from "./wrappers/AuthWrapper";

const LoginPage = () => {
  return (
    <AuthWrapper
      title="Sign in to your account"
      subtitle="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkPath="/signup"
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
