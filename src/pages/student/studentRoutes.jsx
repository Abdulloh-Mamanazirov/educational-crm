import StudentDashboard from "./home";
import StudentSchedule from "./schedule";
import StudentAssignments from "./homeworkAndAssignments";
import StudentInquiry from "./inquiry";
import StudentAnnouncements from "./announcements";
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
    element: <StudentSchedule />,
    label: "Schedule",
    icon: <span className="fa-solid fa-clock" />,
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 302,
    path: "/student/homework",
    element: <StudentAssignments />,
    label: "Homework",
    icon: <span className="fa-solid fa-briefcase" />,
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 303,
    path: "/student/duolingo",
    element: <></>,
    label: "Duolingo",
    icon: (
      <img
        src="https://schools-cdn.duolingo.com/favicon.ico"
        className="lg:w-5"
      />
    ),
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 304,
    path: "/student/inquiry",
    element: <StudentInquiry />,
    label: "Inquiry & Support",
    icon: <span className="fa-solid fa-circle-question" />,
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 305,
    path: "/student/announcements",
    element: <StudentAnnouncements />,
    label: "Announcements",
    icon: <span className="fa-solid fa-bullhorn" />,
    showInMenu: true,
    roles: ["student"],
  },
  {
    id: 3020,
    path: "/student/profile",
    element: <StudentProfile />,
    label: "Profile",
    icon: <span className="fa-solid fa-user" />,
    showInMenu: true,
    roles: ["student"],
  },
];
