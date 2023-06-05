import { RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";
import Other from "../pages/Other";
import Settings from "../pages/Settings";


const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: "other",
      element: <Other />
    },
    {
      path: "settings",
      element: <Settings />
    }
  ]
}

const routers: RouteObject[] = [normalRoutes];

export default routers;
