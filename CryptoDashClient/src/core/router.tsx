import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Login,
  Portfolio,
  Register,
  Settings,
  Subjects,
  Workbook,
} from "./components";
import ProtectedRoute from "./guards/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Workbook />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/portfolio",
            element: <Portfolio />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/subjects",
            element: <Subjects />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
