import {
  adminRoutes,
  teacherRoutes,
  studentRoutes,
  directorRoutes,
  consultantRoutes,
  hiddenRoutes,
} from "../pages";

export const publicRoutes = [];

export const allRoutes = [
  ...hiddenRoutes,
  ...publicRoutes,
  ...adminRoutes,
  ...teacherRoutes,
  ...studentRoutes,
  ...directorRoutes,
  ...consultantRoutes,
];
