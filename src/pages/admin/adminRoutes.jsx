import AdminProfile from "./profile";
import AdminDashboard from "./home";
import AdminTeachers from "./teachers";
import AdminStudents from "./students";
import AdminEmployees from "./employees";
import AdminGroups from "./groups";
import AdminGroupDetails from "./groupDetails";
import AdminStudentPayments from "./payments";
import AdminSalaries from "./salaries";
import AdminExpenses from "./expenses";
import AdminBadges from "./badges";
import AdminAnnouncements from "./announcements";
import AdminLeads from "./leads";

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
  {
    id: 401,
    path: "/admin/teachers",
    element: <AdminTeachers />,
    label: "Teachers",
    icon: <span className="fa-solid fa-chalkboard-user" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 402,
    path: "/admin/students",
    element: <AdminStudents />,
    label: "Students",
    icon: <span className="fa-solid fa-user-graduate" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 403,
    path: "/admin/employees",
    element: <AdminEmployees />,
    label: "Employees",
    icon: <span className="fa-solid fa-user-tie" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 404,
    path: "/admin/groups",
    element: <AdminGroups />,
    label: "Groups",
    icon: <span className="fa-solid fa-people-group" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 405,
    path: "/admin/groups/:group_id",
    element: <AdminGroupDetails />,
    showInMenu: false,
    roles: ["admin"],
  },
  {
    id: 406,
    path: "/admin/payments",
    element: <AdminStudentPayments />,
    label: "Payments",
    icon: <span className="fa-solid fa-money-bill" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 407,
    path: "/admin/salaries",
    element: <AdminSalaries />,
    label: "Salaries",
    icon: <span className="fa-solid fa-sack-dollar" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 408,
    path: "/admin/expenses",
    element: <AdminExpenses />,
    label: "Expenses",
    icon: <span className="fa-solid fa-hand-holding-dollar" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 409,
    path: "/admin/badges",
    element: <AdminBadges />,
    label: "Badges",
    icon: <span className="fa-solid fa-award" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 410,
    path: "/admin/announcements",
    element: <AdminAnnouncements />,
    label: "Announcements",
    icon: <span className="fa-solid fa-bullhorn" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 411,
    path: "/admin/leads",
    element: <AdminLeads />,
    label: "Leads Management",
    icon: <span className="fa-solid fa-list-check" />,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    id: 412,
    path: "/admin/profile",
    element: <AdminProfile />,
    label: "Profile",
    icon: <span className="fa-solid fa-user" />,
    showInMenu: true,
    roles: ["admin"],
  },
];
