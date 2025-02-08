import TeacherDashboard from "./home";
import TeacherProfile from "./profile";

export const teacherRoutes = [
  {
    id: 200,
    path: "/teacher/dashboard",
    element: <TeacherDashboard />,
    label: "Home",
    icon: <span className="fa-solid fa-home" />,
    showInMenu: true,
    roles: ["teacher"],
  },
  {
    id: 201,
    path: "/teacher/profile",
    element: <TeacherProfile />,
    label: "Profile",
    icon: <span className="fa-solid fa-user" />,
    showInMenu: true,
    roles: ["teacher"],
  },
];
