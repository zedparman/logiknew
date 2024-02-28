import { useMessages } from "next-intl";
import SignUpComponent from "../../components/SignUp/SignUpComponent";
import CheckAuthRedirect from "@/app/context/CheckAuthRedirect";

const SignUpPage = () => {
  const t = useMessages("SignUp");
  return (
    <CheckAuthRedirect>
      <SignUpComponent t={t.SignUp} />
    </CheckAuthRedirect>
  );
};

export default SignUpPage;
