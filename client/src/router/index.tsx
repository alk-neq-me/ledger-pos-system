import { RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";


const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />
    }
  ]
}

const routers: RouteObject[] = [normalRoutes];

export default routers;
