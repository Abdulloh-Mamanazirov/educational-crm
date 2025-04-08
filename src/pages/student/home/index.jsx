import React from "react";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  Typography,
  List,
  Tag,
  Statistic,
  Progress,
  Divider,
  Empty,
  Tooltip,
  Space,
  Avatar,
} from "antd";

// --- Mock Data for Dashboard ---
const mockTeachers = {
  t1: { name: "Dr. Evelyn Reed", avatar: null }, // Add avatar URLs if available
  t2: { name: "Mr. David Chen", avatar: null },
  t3: { name: "Prof. Sarah Jones", avatar: null },
};

const mockRecentGrades = [
  {
    id: "g1",
    courseName: "Advanced English",
    assignment: "Essay 2 - Argumentative",
    grade: "A",
    score: 95,
    feedback:
      "Excellent structure, clear arguments, and strong evidence. Well done!",
    teacherId: "t1",
    date: "2025-04-01",
  },
  {
    id: "g2",
    courseName: "Beginner Math",
    assignment: "Quiz 3 - Subtraction",
    grade: "B+",
    score: 88,
    feedback:
      "Good effort overall. Make sure to double-check calculations involving borrowing.",
    teacherId: "t2",
    date: "2025-03-28",
  },
  {
    id: "g3",
    courseName: "Intermediate Physics",
    assignment: "Lab Report - Forces",
    grade: "A-",
    score: 92,
    feedback: "Accurate results and clear methodology description.",
    teacherId: "t3",
    date: "2025-04-03",
  },
  {
    id: "g4",
    courseName: "Art History",
    assignment: "Midterm Exam",
    grade: "B",
    score: 85,
    feedback: "Good understanding of major periods, review minor artists.",
    teacherId: "t1",
    date: "2025-03-20",
  },
];

const mockAttendanceSummary = {
  totalClassesThisMonth: 22,
  attended: 21,
  absent: 1,
  // Calculated percentage: (attended / totalClassesThisMonth) * 100
};

const mockPerformanceNotes = [
  {
    id: "p1",
    type: "improvement",
    text: "Showed significant improvement in Math problem-solving speed this week.",
    date: "2025-04-02",
    icon: "fa-chart-line text-green-500",
  },
  {
    id: "p2",
    type: "feedback",
    text: "Very insightful contributions during the English class discussion on Hamlet.",
    date: "2025-03-30",
    icon: "fa-comments text-blue-500",
  },
  {
    id: "p3",
    type: "alert",
    text: "Missed the Physics homework submission deadline.",
    date: "2025-04-01",
    icon: "fa-exclamation-triangle text-yellow-500",
  },
];

const mockRewards = [
  {
    id: "r1",
    name: "Perfect Attendance (March)",
    icon: "fa-award",
    date: "2025-04-01",
    color: "gold",
  },
  {
    id: "r2",
    name: "Top Performer (Essay 2)",
    icon: "fa-star",
    date: "2025-04-01",
    color: "volcano",
  },
  {
    id: "r3",
    name: "Active Participant",
    icon: "fa-comments",
    date: "2025-03-30",
    color: "blue",
  },
];
// --- End Mock Data ---

const { Title, Text, Paragraph } = Typography;

const StudentDashboard = () => {
  const attendancePercentage =
    mockAttendanceSummary.totalClassesThisMonth > 0
      ? Math.round(
          (mockAttendanceSummary.attended /
            mockAttendanceSummary.totalClassesThisMonth) *
            100
        )
      : 0;

  const getTeacher = (teacherId) =>
    mockTeachers[teacherId] || { name: "N/A", avatar: null };

  return (
    <div className="p-6">
      <Row gutter={[24, 24]}>
        {" "}
        {/* Increased gutter */}
        {/* == Progress Reports Column == */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <span className="dark:text-white flex items-center">
                <i className="fas fa-graduation-cap mr-2"></i> Progress Reports
              </span>
            }
            bordered={false}
            className="shadow-md dark:bg-gray-800 dark:border-gray-700 h-full"
          >
            <Title level={5} className="mb-4 dark:text-gray-200">
              Recent Grades & Feedback
            </Title>
            <List
              itemLayout="vertical"
              dataSource={mockRecentGrades}
              renderItem={(item) => {
                const teacher = getTeacher(item.teacherId);
                return (
                  <List.Item
                    key={item.id}
                    className="!p-3 border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    extra={
                      // Grade Tag
                      <Tag
                        color={
                          item.grade.startsWith("A")
                            ? "success"
                            : item.grade.startsWith("B")
                            ? "processing"
                            : "warning"
                        }
                        className="text-lg font-semibold"
                      >
                        {item.grade} {item.score && `(${item.score}%)`}
                      </Tag>
                    }
                  >
                    <List.Item.Meta
                      // avatar={teacher.avatar ? <Avatar src={teacher.avatar} /> : <Avatar icon={<i className="fas fa-user"></i>} />}
                      title={
                        <Text className="font-medium dark:text-white">
                          {item.assignment}
                        </Text>
                      }
                      description={
                        <Text
                          type="secondary"
                          className="text-xs dark:text-gray-400"
                        >
                          {item.courseName}
                        </Text>
                      }
                    />
                    <Paragraph className="text-sm mb-1 dark:text-gray-300">
                      {item.feedback}
                    </Paragraph>
                    <Text className="text-xs text-gray-500 dark:text-gray-500 block">
                      <Tooltip title={teacher.name}>
                        <i className="fas fa-user-edit mr-1"></i> {teacher.name}
                      </Tooltip>
                      <span className="mx-2">|</span>
                      <i className="far fa-calendar-alt mr-1"></i>{" "}
                      {moment(item.date).format("MMM D, YYYY")}
                    </Text>
                  </List.Item>
                );
              }}
              locale={{
                emptyText: (
                  <Empty
                    description={
                      <span className="dark:text-gray-400">
                        No recent grades found.
                      </span>
                    }
                  />
                ),
              }}
            />
          </Card>
        </Col>
        {/* == Attendance & Performance Column == */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <span className="dark:text-white flex items-center">
                <i className="fas fa-user-check mr-2"></i> Attendance &
                Performance
              </span>
            }
            bordered={false}
            className="shadow-md dark:bg-gray-800 dark:border-gray-700 h-full" // Added h-full
          >
            {/* Attendance Section */}
            <Title level={5} className="mb-4 dark:text-gray-200">
              Attendance (This Month)
            </Title>
            <Row gutter={16} align="middle" className="mb-4">
              <Col xs={24} sm={8} className="text-center">
                <Progress
                  type="circle"
                  percent={attendancePercentage}
                  width={80}
                  format={(percent) => (
                    <span className="dark:text-white">{`${percent}%`}</span>
                  )}
                  strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                />
              </Col>
              <Col xs={24} sm={16}>
                <Row>
                  <Col span={12}>
                    <Statistic
                      title={
                        <span className="dark:text-gray-400">Attended</span>
                      }
                      value={mockAttendanceSummary.attended}
                      valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                      prefix={<i className="fas fa-check-circle mr-1"></i>}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={<span className="dark:text-gray-400">Absent</span>}
                      value={mockAttendanceSummary.absent}
                      valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
                      prefix={<i className="fas fa-times-circle mr-1"></i>}
                    />
                  </Col>
                </Row>
                <Text
                  type="secondary"
                  className="text-xs dark:text-gray-500 block mt-2"
                >
                  Total Classes: {mockAttendanceSummary.totalClassesThisMonth}
                </Text>
              </Col>
            </Row>

            <Divider className="dark:border-gray-600" />

            {/* Performance History Section */}
            <Title level={5} className="my-4 dark:text-gray-200">
              Performance Highlights
            </Title>
            <List
              size="small"
              itemLayout="horizontal"
              dataSource={mockPerformanceNotes}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="!py-2 border-b-0 dark:border-gray-700"
                >
                  <List.Item.Meta
                    avatar={
                      <i
                        className={`fas ${item.icon} text-lg w-5 text-center`}
                      ></i>
                    }
                    title={
                      <Text className="text-sm dark:text-gray-300">
                        {item.text}
                      </Text>
                    }
                    description={
                      <Text className="text-xs dark:text-gray-500">
                        {moment(item.date).format("MMM D")}
                      </Text>
                    }
                  />
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <Empty
                    description={
                      <span className="dark:text-gray-400">
                        No performance notes yet.
                      </span>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ),
              }}
            />

            <Divider className="dark:border-gray-600" />

            {/* Rewards Section */}
            <Title level={5} className="my-4 dark:text-gray-200">
              Possible Rewards / Achievements
            </Title>
            {mockRewards.length > 0 ? (
              <Space wrap size={[8, 8]}>
                {" "}
                {/* Allow tags to wrap */}
                {mockRewards.map((reward) => (
                  <Tag
                    key={reward.id}
                    icon={<i className={`fas ${reward.icon} mr-1`}></i>}
                    color={reward.color || "processing"} // Use defined color or default
                    className="!m-1 text-sm px-2 py-1"
                  >
                    <Tooltip
                      title={`Earned: ${moment(reward.date).format(
                        "MMM D, YYYY"
                      )}`}
                    >
                      {reward.name}
                    </Tooltip>
                  </Tag>
                ))}
              </Space>
            ) : (
              <Empty
                description={
                  <span className="dark:text-gray-400">
                    No rewards earned yet. Keep up the good work!
                  </span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
