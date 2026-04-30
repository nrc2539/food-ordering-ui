import UnAuthenGuard from "@/components/guards/UnAuthenGuard";
import LoginPage from "@/features/authentication/LoginPage";

export default function Login() {
  return (
    <UnAuthenGuard>
      <LoginPage />
    </UnAuthenGuard>
  );
}
