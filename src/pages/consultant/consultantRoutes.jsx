import ConsultantDashboard from "./home";
import ConsultantUniversities from "./universities";

export const consultantRoutes = [
  {
    id: 300,
    path: "/consultant/dashboard",
    element: <ConsultantDashboard />,
    label: "Universities",
    icon: <span className="fa-solid fa-university" />,
    showInMenu: true,
    roles: ["consultant"],
  },
  {
    id: 301,
    path: "/consultant/universities",
    element: <ConsultantUniversities />,
    label: "Find university",
    icon: <span className="fa-solid fa-search" />,
    showInMenu: true,
    roles: ["consultant"],
  },
];
