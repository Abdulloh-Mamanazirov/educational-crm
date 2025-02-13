import DirectorDashboard from "./home";
import DirectorTeachers from "./teachers";
import DirectorStudents from "./students";
import DirectorEmployees from "./employees";
import DirectorGroups from "./groups";
import DirectorGroupDetails from "./groupDetails";

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
  {
    id: 501,
    path: "/director/teachers",
    element: <DirectorTeachers />,
    label: "Teachers",
    icon: <span className="fa-solid fa-chalkboard-user" />,
    showInMenu: true,
    roles: ["director"],
  },
  {
    id: 502,
    path: "/director/students",
    element: <DirectorStudents />,
    label: "Students",
    icon: <span className="fa-solid fa-user-graduate" />,
    showInMenu: true,
    roles: ["director"],
  },
  {
    id: 503,
    path: "/director/employees",
    element: <DirectorEmployees />,
    label: "Employees",
    icon: <span className="fa-solid fa-user-tie" />,
    showInMenu: true,
    roles: ["director"],
  },
  {
    id: 504,
    path: "/director/groups",
    element: <DirectorGroups />,
    label: "Groups",
    icon: <span className="fa-solid fa-people-group" />,
    showInMenu: true,
    roles: ["director"],
  },
  {
    id: 505,
    path: "/director/groups/:group_id",
    element: <DirectorGroupDetails />,
    showInMenu: false,
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
