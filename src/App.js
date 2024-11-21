// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
// import { routes } from "./router";
// import { Fragment } from "react";
// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           {routes.map((route) => {
//             const Page = route.page;
//             const Layout = route.isShowSidebar ? DefaultComponent : Fragment;
//             if (!route.path || typeof route.path !== "string") {
//               console.log("Invailid path for route: ", route);
//               return null;
//             }
//             return (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={
//                   <Layout>
//                     <Page />
//                   </Layout>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

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
