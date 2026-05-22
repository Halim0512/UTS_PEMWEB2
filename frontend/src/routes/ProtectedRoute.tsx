import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthstore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return children;
}
