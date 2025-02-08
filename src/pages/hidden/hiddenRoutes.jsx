import Login from "./login";
import NotFound from "./notfound";
import Unauthorized from "./unauthorized";

export const hiddenRoutes = [
  {
    id: 1,
    path: "/login",
    element: <Login />,
    showInMenu: false,
  },
  {
    id: 2,
    path: "/unauthorized",
    element: <Unauthorized />,
    showInMenu: false,
  },
  {
    id: 3,
    path: "/notfound",
    element: <NotFound />,
    showInMenu: false,
  },
];
