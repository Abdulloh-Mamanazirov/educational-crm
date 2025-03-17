import ConsultantDashboard from "./home";

export const consultantRoutes = [
  {
    id: 300,
    path: "/consultant/dashboard",
    element: <ConsultantDashboard />,
    label: "Home",
    icon: <span className="fa-solid fa-home" />,
    showInMenu: true,
    roles: ["consultant"],
  },
  // {
  //   id: 301,
  //   path: "/consultant/courses",
  //   element: <>Consultant Courses</>,
  //   label: "Courses",
  //   icon: <span className="fa-solid fa-book" />,
  //   showInMenu: true,
  //   roles: ["consultant"],
  // },
];
