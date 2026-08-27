import { useAppSelector } from "@/core/store";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const token = useAppSelector((state) => state.auth.token);
  // useEffect(() => {

  // }, []);

  if (!token) {
    navigate("/login", { replace: true });
    // return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
