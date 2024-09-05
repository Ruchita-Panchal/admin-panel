import type { FC } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./config";
import LayoutPage from "../layout";

const NotFound = lazy(() => import("../pages/404"));
const LoginPage = lazy(() => import("../pages/login"));
const RegisterPage = lazy(() => import("../pages/register"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const ProjectPage = lazy(() => import("../pages/projects"));
const EstimationPage = lazy(() => import("../pages/estimations"));

const routeList: RouteObject[] = [
  {
    path: "/login",
    element: <WrapperRouteComponent element={<LoginPage />} titleId="login" />,
  },
  {
    path: "/register",
    element: (
      <WrapperRouteComponent element={<RegisterPage />} titleId="login" />
    ),
  },
  {
    path: "/",
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: (
          <WrapperRouteComponent element={<Dashboard />} titleId="dashboard" />
        ),
      },
      {
        path: "projects",
        element: (
          <WrapperRouteComponent element={<ProjectPage />} titleId="projects" />
        ),
      },
      {
        path: "estimations",
        element: (
          <WrapperRouteComponent
            element={<EstimationPage />}
            titleId="estimations"
          />
        ),
      },
      {
        path: "*",
        element: (
          <WrapperRouteComponent element={<NotFound />} titleId="notFound" />
        ),
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
