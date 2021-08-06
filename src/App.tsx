import React, { useState } from "react";
import { AuthContext, AuthDispatch } from "./Context";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthLayout from "./Layouts/AuthLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Context/index";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <ChakraProvider>
      <AuthProvider>
        <AuthContext.Provider value={authenticated}>
          <AuthDispatch.Provider value={setAuthenticated}>
            <Router>
              <Switch>
                <Route path="/auth" component={AuthLayout} />
                <Route path="/" component={DashboardLayout} />
                {/* <ProtectedRoute path="/" component={DashboardLayout} /> */}
              </Switch>
            </Router>
          </AuthDispatch.Provider>
        </AuthContext.Provider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
