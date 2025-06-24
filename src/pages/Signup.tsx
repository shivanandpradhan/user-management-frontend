import SignupForm from "../components/auth/SignupForm";
import AuthWrapper from "./wrappers/AuthWrapper";

const SignupPage = () => {
  return (
    <AuthWrapper
      title="Create new account"
      subtitle="Already have an account?"
      footerLinkText="Sign in"
      footerLinkPath="/login"
    >
      <SignupForm />
    </AuthWrapper>
  );
};

export default SignupPage;
