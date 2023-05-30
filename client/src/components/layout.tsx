import { Outlet } from "react-router-dom";
import Header from "./header";
import { Box } from "@chakra-ui/react";

function Layout() {
  return (
    <Box display="flex" flexDir="column" px={20} py={5} gap={10}>
      <Header />
      <Outlet />
    </Box>
  )
}

export default Layout;
