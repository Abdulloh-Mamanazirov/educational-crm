import DirectorDashboard from "./home";

export const directorRoutes = [
  {
    id: 500,
    path: "/director/dashboard",
    element: <DirectorDashboard />,
    label: "Home",
    icon: <span className="fa-solid fa-home" />,
    showInMenu: true,
    roles: ["director"],
  },
  // {
  //   id: 501,
  //   path: "/director/reports",
  //   element: <DirectorReports />,
  //   label: "Home",
  //   icon: <span className="fa-solid fa-home" />,
  //   showInMenu: true,
  //   roles: ["director"],
  // },
];
