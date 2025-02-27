import TeacherDashboard from "./home";
import TeacherProfile from "./profile";
import TeacherGroups from "./groups";
import TeacherGroupDetails from "./groupDetails";
import TeacherLessons from "./lessons";
import TeacherHomeworkAndAssignments from "./homeworkAndAssignments";
import TeacherMaterialsAndResources from "./materialsAndResources";
import TeacherAnnouncements from "./announcements";

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
    id: 202,
    path: "/teacher/groups",
    element: <TeacherGroups />,
    label: "Groups",
    icon: <span className="fa-solid fa-users" />,
    showInMenu: true,
    roles: ["teacher"],
  },
  {
    id: 203,
    path: "/teacher/groups/:group_id",
    element: <TeacherGroupDetails />,
    showInMenu: false,
    roles: ["teacher"],
  },
  {
    id: 204,
    path: "/teacher/lessons",
    element: <TeacherLessons />,
    label: "Lessons",
    icon: <span className="fa-solid fa-book" />,
    showInMenu: true,
    roles: ["teacher"],
  },
  {
    id: 205,
    path: "/teacher/homeworks",
    element: <TeacherHomeworkAndAssignments />,
    label: "Homeworks",
    icon: <span className="fa-solid fa-briefcase" />,
    showInMenu: true,
    roles: ["teacher"],
  },
  {
    id: 206,
    path: "/teacher/materials",
    element: <TeacherMaterialsAndResources />,
    label: "Materials",
    icon: <span className="fa-solid fa-cubes-stacked" />,
    showInMenu: true,
    roles: ["teacher"],
  },
  {
    id: 207,
    path: "/teacher/announcements",
    element: <TeacherAnnouncements />,
    label: "Announcements",
    icon: <span className="fa-solid fa-bullhorn" />,
    showInMenu: true,
    roles: ["teacher"],
  },
  {
    id: 208,
    path: "/teacher/duolingo",
    element: <></>,
    label: "Duolingo",
    icon: (
      <img
        src="https://schools-cdn.duolingo.com/favicon.ico"
        className="lg:w-5"
      />
    ),
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
