import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { allRoutes } from "./routes/index";
import MainLayout from "./layout";
import Login from "./pages/hidden/login";
import Unauthorized from "./pages/hidden/unauthorized";
import NotFound from "./pages/hidden/notfound";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes with MainLayout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {allRoutes.map((route) => {
            if (route.roles) {
              return (
                <Route
                  key={route.id}
                  path={route.path.replace("/", "")}
                  element={
                    <ProtectedRoute>
                      {React.cloneElement(route.element, {
                        roles: route.roles,
                      })}
                    </ProtectedRoute>
                  }
                />
              );
            }
            return null;
          })}

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
