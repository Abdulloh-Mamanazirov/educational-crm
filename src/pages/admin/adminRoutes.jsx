import AdminDashboard from "./home";

export const adminRoutes = [
  {
    id: 400,
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    label: "Home",
    icon: <span className="fa-solid fa-home" />,
    showInMenu: true,
    roles: ["admin"],
  },
  //   {
  //     id: 401,
  //     path: "/admin/users",
  //     element: <UserManagement />,
  //     label: "",
  //     icon: <span className="" />,
  //     showInMenu: true,
  //     roles: ["admin"],
  //   },
];
