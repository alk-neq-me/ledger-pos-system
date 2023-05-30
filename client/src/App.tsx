import { Provider } from "react-redux"
import { useRoutes } from "react-router-dom"
import routers from "./router"
import configureStore from "./context/configureStore";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from './theme';
import AuthProvider from "./helpers/authProvider";

const store = configureStore();

function App() {
  const content = useRoutes(routers);

  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider>
            {content}
          </AuthProvider>
        </Provider>
      </ChakraProvider>
    </>
  )
}

export default App
