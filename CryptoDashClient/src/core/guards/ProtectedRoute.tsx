import { useAppSelector } from "@/core/store";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const token = useAppSelector((state) => state.auth.token);
  // const [isChecking, setIsChecking] = useState(!token);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     if (!token) {
  //       try {
  //         // const result = await dispatch(
  //         //   authApiEndpoints.endpoints.refresh.initiate(),
  //         // ).unwrap();
  //         // if (result) {
  //         //   dispatch(setNewToken({ accessToken: result }));
  //         // }
  //       } catch (error) {
  //         // dispatch(logout());
  //       } finally {
  //         setIsChecking(false);
  //       }
  //     } else {
  //       setIsChecking(false);
  //     }
  //   };

  //   checkSession();
  // }, [token, dispatch]);

  // if (isChecking) {
  //   return <Loading text={t("Utils.CheckingSession")} />;
  // }

  if (!token) {
    navigate("/login", { replace: true });
    // return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
