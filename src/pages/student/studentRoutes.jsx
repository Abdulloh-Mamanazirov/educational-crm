import StudentDashboard from "./home";
import StudentProfile from "./profile";

export const studentRoutes = [
  {
    id: 300,
    path: "/student/dashboard",
    element: <StudentDashboard />,
    label: "Home",
    icon: <span className="fa-solid fa-home" />,
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 301,
    path: "/student/courses",
    element: <>Student Courses</>,
    label: "Courses",
    icon: <span className="fa-solid fa-book" />,
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 302,
    path: "/student/profile",
    element: <StudentProfile />,
    label: "Profile",
    icon: <span className="fa-solid fa-user" />,
    showInMenu: true,
    roles: ["student"],
  },
];
