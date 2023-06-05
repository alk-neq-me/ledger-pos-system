import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./header";

export default function Layout() {
  return (
    <Box display="flex" flexDir="column" px={20} py={5} gap={10}>
      <Header />
      <Outlet />
    </Box>
  )
}
