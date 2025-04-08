import React from "react";
import moment from "moment";
import { Card, Row, Col, Typography, Tag, Empty } from "antd";

const mockGroups = [
  {
    id: "1",
    name: "Advanced English",
    level: 3,
    days: "Monday, Wednesday",
    time: "10:00 - 11:30",
    progress: 65,
    teacherId: "t1",
  },
  {
    id: "2",
    name: "Beginner Math",
    level: 1,
    days: "Tuesday, Thursday",
    time: "14:00 - 15:00",
    progress: 42,
    teacherId: "t2",
  },
  {
    id: "3",
    name: "Intermediate Physics",
    level: 2,
    days: "Friday",
    time: "09:00 - 10:30",
    progress: 78,
    teacherId: "t3",
  },
  {
    id: "4",
    name: "Art History",
    level: 1,
    days: "Wednesday",
    time: "13:00 - 14:30",
    progress: 25,
    teacherId: "t1",
  },
];

const mockTeachers = {
  t1: { name: "Dr. Evelyn Reed", email: "e.reed@edu.center" },
  t2: { name: "Mr. David Chen", email: "d.chen@edu.center" },
  t3: { name: "Prof. Sarah Jones", email: "s.jones@edu.center" },
};

const { Title, Text } = Typography;

const TimetableSchedulePage = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = moment().format("dddd");

  const scheduleByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  mockGroups.forEach((group) => {
    const groupDays = group.days.split(",").map((d) => d.trim()); // Get ["Monday", "Wednesday"]
    const teacher = mockTeachers[group.teacherId] || { name: "N/A", email: "" };

    groupDays.forEach((day) => {
      if (scheduleByDay.hasOwnProperty(day)) {
        // Check if the day is in our display list
        scheduleByDay[day].push({
          ...group, // Include all group details
          teacherName: teacher.name,
        });
      }
    });
  });

  // Function to get level tag color
  const getLevelColor = (level) => {
    if (level === 1) return "green";
    if (level === 2) return "orange";
    if (level >= 3) return "red";
    return "default";
  };

  return (
    <div className="p-6">
      <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
        Class Schedule
      </h1>

      <Row gutter={[16, 16]}>
        {" "}
        {/* Add gutter for spacing between columns */}
        {daysOfWeek.map((day) => {
          const isToday = day === todayName;
          const classesToday = scheduleByDay[day];

          return (
            <Col key={day} xs={24} sm={12} md={8} lg={6} xl={4}>
              {" "}
              {/* Responsive Columns */}
              <div
                className={`rounded-lg p-3 h-full ${
                  isToday
                    ? "bg-blue-50 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <h3
                  level={5}
                  className={`text-center font-semibold mb-3 ${
                    isToday
                      ? "text-blue-700 dark:text-blue-300"
                      : "dark:text-white"
                  }`}
                >
                  {day.toUpperCase()}
                </h3>
                {classesToday.length > 0 ? (
                  <div className="space-y-3">
                    {" "}
                    {/* Vertical space between class cards */}
                    {classesToday.map((group) => (
                      <Card
                        key={group.id + "-" + day} // Unique key for potential multiple occurrences
                        size="small"
                        className="shadow-sm dark:bg-gray-700 dark:border-gray-600"
                        bordered={false}
                      >
                        <p
                          className="block text-sm dark:text-white truncate"
                          title={group.name}
                        >
                          {group.name}
                        </p>
                        <p className="block opacity-75 text-xs dark:text-gray-300 mb-1">
                          <i className="far fa-clock mr-1"></i>
                          {group.time || "Time N/A"}{" "}
                          {/* Display placeholder time */}
                        </p>
                        <p
                          className="block opacity-75 text-xs dark:text-gray-400 truncate mb-2"
                          title={group.teacherName}
                        >
                          <i className="fas fa-user-tie mr-1"></i>
                          {group.teacherName}
                        </p>
                        <Tag
                          color={getLevelColor(group.level)}
                          className="text-xs"
                        >
                          Level {group.level}
                        </Tag>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20">
                    <p
                      type="secondary"
                      className="text-xs italic dark:text-gray-500"
                    >
                      No classes
                    </p>
                  </div>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TimetableSchedulePage;
