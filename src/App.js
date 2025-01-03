import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./router/index";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/auth/system" element={<AdminPage />}>
          {routes
            .filter(
              (route) =>
                route.path !== "/auth/system/login" &&
                route.path !== "/auth/system/register" &&
                route.path !== "/"
            )
            .map((route, index) => (
              <Route key={index} path={route.path} element={<route.page />} />
            ))}
        </Route>

        {routes
          .filter(
            (route) =>
              route.path === "/auth/system/login" ||
              route.path === "/auth/system/register"
          )
          .map((route, index) => (
            <Route key={index} path={route.path} element={<route.page />} />
          ))}

        {routes
          .filter(
            (route) =>
              !route.path.startsWith("/auth/system") && route.path !== "/"
          )
          .map((route, index) => (
            <Route key={index} path={route.path} element={<route.page />} />
          ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
