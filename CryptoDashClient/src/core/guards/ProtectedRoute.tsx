import { useAppSelector } from "@/core/store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const { t } = useTranslation();
  const token = useAppSelector((state) => state.auth.token);
  // useEffect(() => {

  // }, [])

  if (!token) {
    // navigate("/login", { replace: true });
    // return redirect("/login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
