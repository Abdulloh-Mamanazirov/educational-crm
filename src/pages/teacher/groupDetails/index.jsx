import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Table,
  Tabs,
  Badge,
  Tag,
  Space,
  Button,
  Typography,
  Divider,
  Row,
  Col,
  Avatar,
  Statistic,
  Spin,
} from "antd";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const GroupDetails = () => {
  const { group_id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");

  // Fetch group and student data
  useEffect(() => {
    // Simulate API calls to fetch group and students data
    setTimeout(() => {
      // Mock group data
      const mockGroup = {
        id: group_id,
        name: "Advanced English",
        days: "Monday, Wednesday",
        level: 3,
        start_time: "15:00",
        end_time: "16:30",
        teacher_id: "current-teacher-id",
        support_teacher_id: "2",
        field_id: "1",
        description: "Advanced level English language course",
        created_at: "2023-06-15T10:00:00",
        studentCount: 24,
        averageAttendance: 92,
      };

      // Mock students data
      const mockStudents = [
        {
          id: "s1",
          name: "Alex Johnson",
          username: "alex.j",
          phone: "+1234567890",
          parent_name: "Sarah Johnson",
          parent_phone: "+1234567899",
          discount: 10,
          attendanceRate: 95,
          homeworkCompletion: 90,
          averageActiveness: 4.5,
          lastAttendance: {
            date: "2024-02-20",
            present: true,
            homework: "Complete",
            activeness: 5,
          },
        },
        // Other student data...
      ];

      setGroup(mockGroup);
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, [group_id]);

  // Student columns for the table
  const studentColumns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar icon={<span className="fa-solid fa-user" />} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
      render: (phone, record) => (
        <Space direction="vertical" size="small">
          <span>
            <span className="fa-solid fa-phone" /> {phone}
          </span>
          <span>
            <span className="fa-solid fa-user" /> {record.parent_name}
          </span>
          <span>
            <span className="fa-solid fa-phone" /> {record.parent_phone}
          </span>
        </Space>
      ),
    },
    {
      title: "Attendance",
      dataIndex: "attendanceRate",
      key: "attendanceRate",
      render: (rate) => (
        <Badge
          count={`${rate}%`}
          style={{
            backgroundColor:
              rate > 90 ? "#52c41a" : rate > 75 ? "#faad14" : "#ff4d4f",
            fontWeight: "bold",
          }}
        />
      ),
      sorter: (a, b) => a.attendanceRate - b.attendanceRate,
    },
    {
      title: "Homework",
      dataIndex: "homeworkCompletion",
      key: "homeworkCompletion",
      render: (rate) => (
        <Badge
          count={`${rate}%`}
          style={{
            backgroundColor:
              rate > 90 ? "#52c41a" : rate > 75 ? "#faad14" : "#ff4d4f",
            fontWeight: "bold",
          }}
        />
      ),
      sorter: (a, b) => a.homeworkCompletion - b.homeworkCompletion,
    },
    {
      title: "Last Attendance",
      dataIndex: "lastAttendance",
      key: "lastAttendance",
      render: (attendance) => (
        <Space direction="vertical" size="small">
          <Text>{moment(attendance.date).format("MMM DD, YYYY")}</Text>
          {attendance.present ? (
            <Tag
              color="green"
              icon={<span className="fa-solid fa-circle-check" />}
            >
              Present
            </Tag>
          ) : (
            <Tag color="red" icon={<span className="fa-solid fa-close" />}>
              Absent
            </Tag>
          )}
          {attendance.homework && (
            <Tag color="blue">HW: {attendance.homework}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button size="small" icon={<span className="fa-solid fa-user" />}>
            Profile
          </Button>
          <Button size="small" icon={<span className="fa-solid fa-book" />}>
            Progress
          </Button>
        </Space>
      ),
    },
  ];

  // Recent attendance records (mock data)
  const attendanceRecords = [
    {
      id: "1",
      date: "2024-02-20",
      presentCount: 22,
      absentCount: 2,
      notes: "Regular class session. Reviewed previous material.",
      key: "1",
    },
    {
      id: "2",
      date: "2024-02-18",
      presentCount: 20,
      absentCount: 4,
      notes: "Quiz day. Most students performed well.",
      key: "2",
    },
    {
      id: "3",
      date: "2024-02-15",
      presentCount: 23,
      absentCount: 1,
      notes: "Introduced new concept. Students engaged well.",
      key: "3",
    },
  ];

  // Recent exam records (mock data)
  const examRecords = [
    {
      id: "1",
      date: "2024-02-14",
      title: "Midterm Exam",
      averageScore: 85,
      passCount: 23,
      failCount: 1,
      notes: "Overall good performance. One student needs additional support.",
      key: "1",
    },
    {
      id: "2",
      date: "2024-01-25",
      title: "Chapter 3 Quiz",
      averageScore: 78,
      passCount: 20,
      failCount: 4,
      notes: "Some students struggled with the new concepts. Review needed.",
      key: "2",
    },
  ];

  // Payment records (mock data)
  const paymentRecords = [
    {
      id: "1",
      date: "2024-02-10",
      amount: 12000,
      paidCount: 20,
      unpaidCount: 4,
      notes: "Monthly fee collection",
      key: "1",
    },
    {
      id: "2",
      date: "2024-01-12",
      amount: 12000,
      paidCount: 22,
      unpaidCount: 2,
      notes: "Monthly fee collection",
      key: "2",
    },
  ];

  return (
    <div className="p-6">
      <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
        Group Information
      </h1>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Descriptions bordered>
            <Descriptions.Item label="Group Name" span={3}>
              <Title level={4}>{group.name}</Title>
            </Descriptions.Item>
            <Descriptions.Item label="Schedule" span={2}>
              <Space direction="vertical">
                <span>
                  <span className="fa-solid fa-calendar" /> {group.days}
                </span>
                <span>
                  <span className="fa-solid fa-clock" /> {group.start_time} -{" "}
                  {group.end_time}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Level">
              <Tag color="blue">Level {group.level}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Students" span={1}>
              <Badge
                count={group.studentCount}
                showZero
                style={{ backgroundColor: "#1890ff" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Average Attendance" span={2}>
              <Badge
                count={`${group.averageAttendance}%`}
                style={{
                  backgroundColor:
                    group.averageAttendance > 90
                      ? "#52c41a"
                      : group.averageAttendance > 75
                      ? "#faad14"
                      : "#ff4d4f",
                  fontWeight: "bold",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {group.description || "No description available"}
            </Descriptions.Item>
            <Descriptions.Item label="Created On" span={3}>
              {moment(group.created_at).format("MMMM DD, YYYY")}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <span className="fa-solid fa-users mr-1" />
                  Students
                </span>
              }
              key="1"
            >
              <Table
                dataSource={students}
                columns={studentColumns}
                rowKey="id"
                pagination={false}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <span className="fa-solid fa-circle-check mr-1" />
                  Attendance History
                </span>
              }
              key="2"
            >
              <Card title="Recent Attendance Records">
                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Statistic
                      title="Total Classes"
                      value={attendanceRecords.length}
                      prefix={<span className="fa-solid fa-calendar" />}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Average Attendance"
                      value={group.averageAttendance + "%"}
                      valueStyle={{
                        color:
                          group.averageAttendance > 85 ? "#3f8600" : "#cf1322",
                      }}
                      prefix={<span className="fa-solid fa-users" />}
                    />
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      icon={<span className="fa-solid fa-chart-line" />}
                    >
                      View Detailed Analytics
                    </Button>
                  </Col>
                </Row>
                <Table
                  dataSource={attendanceRecords}
                  rowKey="id"
                  columns={[
                    {
                      title: "Date",
                      dataIndex: "date",
                      key: "date",
                      render: (date) => moment(date).format("MMM DD, YYYY"),
                    },
                    {
                      title: "Present",
                      dataIndex: "presentCount",
                      key: "presentCount",
                      render: (count, record) => (
                        <Tag color="green">{count} students</Tag>
                      ),
                    },
                    {
                      title: "Absent",
                      dataIndex: "absentCount",
                      key: "absentCount",
                      render: (count, record) => (
                        <Tag color="red">{count} students</Tag>
                      ),
                    },
                    {
                      title: "Attendance Rate",
                      key: "rate",
                      render: (_, record) => {
                        const total = record.presentCount + record.absentCount;
                        const rate = Math.round(
                          (record.presentCount / total) * 100
                        );
                        return (
                          <Badge
                            count={`${rate}%`}
                            style={{
                              backgroundColor:
                                rate > 90
                                  ? "#52c41a"
                                  : rate > 75
                                  ? "#faad14"
                                  : "#ff4d4f",
                              fontWeight: "bold",
                            }}
                          />
                        );
                      },
                    },
                    {
                      title: "Notes",
                      dataIndex: "notes",
                      key: "notes",
                    },
                    {
                      title: "Actions",
                      key: "actions",
                      render: (_, record) => (
                        <Space>
                          <Button
                            size="small"
                            icon={<span className="fa-solid fa-eye" />}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            icon={<span className="fa-solid fa-edit" />}
                          >
                            Edit
                          </Button>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <span className="fa-solid fa-book mr-1" />
                  Exams & Assessments
                </span>
              }
              key="3"
            >
              <Card title="Recent Exam Records">
                <Table
                  dataSource={examRecords}
                  rowKey="id"
                  columns={[
                    {
                      title: "Date",
                      dataIndex: "date",
                      key: "date",
                      render: (date) => moment(date).format("MMM DD, YYYY"),
                    },
                    {
                      title: "Title",
                      dataIndex: "title",
                      key: "title",
                    },
                    {
                      title: "Average Score",
                      dataIndex: "averageScore",
                      key: "averageScore",
                      render: (score) => (
                        <Badge
                          count={`${score}%`}
                          style={{
                            backgroundColor:
                              score > 80
                                ? "#52c41a"
                                : score > 60
                                ? "#faad14"
                                : "#ff4d4f",
                            fontWeight: "bold",
                          }}
                        />
                      ),
                    },
                    {
                      title: "Pass/Fail",
                      key: "passFail",
                      render: (_, record) => (
                        <Space>
                          <Tag color="green">{record.passCount} Pass</Tag>
                          <Tag color="red">{record.failCount} Fail</Tag>
                        </Space>
                      ),
                    },
                    {
                      title: "Notes",
                      dataIndex: "notes",
                      key: "notes",
                    },
                    {
                      title: "Actions",
                      key: "actions",
                      render: (_, record) => (
                        <Space>
                          <Button
                            size="small"
                            icon={<span className="fa-solid fa-eye" />}
                          >
                            View Results
                          </Button>
                          <Button
                            size="small"
                            icon={<span className="fa-solid fa-chart-line" />}
                          >
                            Analytics
                          </Button>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <span className="fa-solid fa-trophy mr-1" />
                  Badges & Achievements
                </span>
              }
              key="4"
            >
              <Row gutter={16}>
                {students.slice(0, 6).map((student) => (
                  <Col span={8} key={student.id} style={{ marginBottom: 16 }}>
                    <Card
                      title={
                        <Space>
                          <Avatar
                            icon={<span className="fa-solid fa-user" />}
                          />
                          {student.name}
                        </Space>
                      }
                      extra={
                        <Button size="small" type="primary">
                          Add Badge
                        </Button>
                      }
                    >
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Tag
                          icon={<span className="fa-solid fa-trophy" />}
                          color="gold"
                        >
                          Perfect Attendance
                        </Tag>
                        <Tag
                          icon={<span className="fa-solid fa-trophy" />}
                          color="blue"
                        >
                          Top Performer
                        </Tag>
                        <Tag
                          icon={<span className="fa-solid fa-trophy" />}
                          color="purple"
                        >
                          Homework Champion
                        </Tag>
                        <Tag
                          icon={<span className="fa-solid fa-trophy" />}
                          color="green"
                        >
                          Most Improved
                        </Tag>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <span className="fa-solid fa-calendar mr-1" />
                  Schedule
                </span>
              }
              key="5"
            >
              <Card title="Group Schedule">
                <Descriptions bordered>
                  <Descriptions.Item label="Days" span={3}>
                    <Tag color="blue">{group.days}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Time" span={3}>
                    <Text strong>
                      {group.start_time} - {group.end_time}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Next Class" span={3}>
                    <Text>
                      {moment().add(1, "days").format("dddd, MMMM DD, YYYY")}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Notes" span={3}>
                    <Text>
                      Regular schedule may change during holidays and special
                      events.
                    </Text>
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Upcoming Classes</Divider>

                <Table
                  dataSource={[
                    {
                      key: "1",
                      date: moment().add(1, "days").format("YYYY-MM-DD"),
                      topic: "Chapter 5 Review",
                      materials: "Textbook, Worksheets",
                      planned: "Quiz, Group Activity",
                    },
                    {
                      key: "2",
                      date: moment().add(3, "days").format("YYYY-MM-DD"),
                      topic: "Chapter 6 Introduction",
                      materials: "Presentation, Handouts",
                      planned: "Lecture, Practice Exercises",
                    },
                    {
                      key: "3",
                      date: moment().add(6, "days").format("YYYY-MM-DD"),
                      topic: "Chapter 6 Continued",
                      materials: "Textbook, Digital Resources",
                      planned: "Discussion, Group Work",
                    },
                  ]}
                  columns={[
                    {
                      title: "Date",
                      dataIndex: "date",
                      key: "date",
                      render: (date) =>
                        moment(date).format("ddd, MMM DD, YYYY"),
                    },
                    {
                      title: "Topic",
                      dataIndex: "topic",
                      key: "topic",
                    },
                    {
                      title: "Materials",
                      dataIndex: "materials",
                      key: "materials",
                    },
                    {
                      title: "Planned Activities",
                      dataIndex: "planned",
                      key: "planned",
                    },
                    {
                      title: "Actions",
                      key: "actions",
                      render: () => (
                        <Button
                          size="small"
                          icon={<span className="fa-solid fa-edit" />}
                        >
                          Edit Plan
                        </Button>
                      ),
                    },
                  ]}
                  pagination={false}
                />
              </Card>
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default GroupDetails;
