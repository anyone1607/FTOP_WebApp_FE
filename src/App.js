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
import AboutUs from "./pages/AboutUs/AboutUs";
import Work from "./pages/Work/Work";
import Info from "./pages/Info/Info";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/work" element={<Work />} />
        <Route path="/info" element={<Info />} />

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
