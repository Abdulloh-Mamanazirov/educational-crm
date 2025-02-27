import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Modal,
  Tabs,
  Form,
  DatePicker,
  Rate,
  Select,
  Input,
  Divider,
  Row,
  Col,
  Statistic,
  Tooltip,
  Typography,
  Spin,
} from "antd";
import moment from "moment";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import GroupDetails from "../groupDetails";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const GroupsPage = () => {
  // State for groups data
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(moment());
  const [attendanceData, setAttendanceData] = useState({});
  const [studentsInGroup, setStudentsInGroup] = useState([]);
  const [examModalVisible, setExamModalVisible] = useState(false);
  const [examDate, setExamDate] = useState(moment());
  const [examData, setExamData] = useState({});
  const [statsModalVisible, setStatsModalVisible] = useState(false);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulate API call to fetch groups
    setTimeout(() => {
      const mockGroups = [
        {
          id: "1",
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
        },
        {
          id: "2",
          name: "Beginner Math",
          days: "Tuesday, Thursday",
          level: 1,
          start_time: "10:00",
          end_time: "11:30",
          teacher_id: "current-teacher-id",
          field_id: "2",
          description: "Basic mathematics for beginners",
          created_at: "2023-07-10T10:00:00",
          studentCount: 18,
          averageAttendance: 85,
        },
        {
          id: "3",
          name: "Intermediate Physics",
          days: "Friday, Saturday",
          level: 2,
          start_time: "13:00",
          end_time: "14:30",
          teacher_id: "current-teacher-id",
          field_id: "3",
          description: "Physics fundamentals for intermediate students",
          created_at: "2023-08-20T10:00:00",
          studentCount: 15,
          averageAttendance: 88,
        },
      ];
      setGroups(mockGroups);
      setLoading(false);
    }, 1000);
  }, []);

  // Mock function to fetch students in a group
  const fetchStudentsInGroup = (groupId) => {
    // Simulate API call
    setTimeout(() => {
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
        {
          id: "s2",
          name: "Emily Parker",
          username: "emily.p",
          phone: "+1234567891",
          parent_name: "David Parker",
          parent_phone: "+1234567898",
          discount: 0,
          attendanceRate: 88,
          homeworkCompletion: 85,
          averageActiveness: 4.2,
          lastAttendance: {
            date: "2024-02-20",
            present: true,
            homework: "Partial",
            activeness: 4,
          },
        },
        {
          id: "s3",
          name: "Michael Lee",
          username: "michael.l",
          phone: "+1234567892",
          parent_name: "Jennifer Lee",
          parent_phone: "+1234567897",
          discount: 15,
          attendanceRate: 92,
          homeworkCompletion: 95,
          averageActiveness: 4.8,
          lastAttendance: {
            date: "2024-02-20",
            present: false,
            homework: "N/A",
            activeness: 0,
          },
        },
      ];
      setStudentsInGroup(mockStudents);

      // Initialize attendance data with student IDs
      const initialAttendanceData = {};
      mockStudents.forEach((student) => {
        initialAttendanceData[student.id] = {
          present: true,
          activeness: 3,
          homework: "Complete",
          description: "",
        };
      });
      setAttendanceData(initialAttendanceData);

      // Initialize exam data
      const initialExamData = {};
      mockStudents.forEach((student) => {
        initialExamData[student.id] = {
          result: "",
          description: "",
        };
      });
      setExamData(initialExamData);
    }, 500);
  };

  // Table columns for groups
  const groupColumns = [
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Schedule",
      dataIndex: "days",
      key: "days",
      render: (days, record) => (
        <span>
          <span className="fa-solid fa-calendar" /> {days} <br />
          <span className="fa-solid fa-clock" /> {record.start_time} -{" "}
          {record.end_time}
        </span>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level) => <span>{level}</span>,
    },
    {
      title: "Students",
      dataIndex: "studentCount",
      key: "studentCount",
      render: (count) => (
        <span>
          <span className="fa-solid fa-users" /> {count}
        </span>
      ),
    },
    {
      title: "Avg. Attendance",
      dataIndex: "averageAttendance",
      key: "averageAttendance",
      render: (rate) => (
        <Tooltip title={`${rate}% average attendance`}>
          <Progress percent={rate} size="small" />
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<span className="fa-solid fa-eye" />}
            onClick={() => handleViewGroup(record)}
          >
            View
          </Button>
          <Button
            icon={<span className="fa-solid fa-circle-check" />}
            onClick={() => handleTakeAttendance(record)}
          >
            Attendance
          </Button>
          <Button
            icon={<span className="fa-solid fa-book" />}
            onClick={() => handleExam(record)}
          >
            Exam
          </Button>
          <Button
            icon={<span className="fa-solid fa-chart-line" />}
            onClick={() => handleStats(record)}
          >
            Stats
          </Button>
        </Space>
      ),
    },
  ];

  // Student columns for attendance modal
  const studentAttendanceColumns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Present",
      dataIndex: "id",
      key: "present",
      render: (id) => (
        <Select
          defaultValue={attendanceData[id]?.present}
          style={{ width: 100 }}
          onChange={(value) => handleAttendanceChange(id, "present", value)}
        >
          <Option value={true}>Present</Option>
          <Option value={false}>Absent</Option>
        </Select>
      ),
    },
    {
      title: "Activeness",
      dataIndex: "id",
      key: "activeness",
      render: (id) => (
        <Rate
          defaultValue={attendanceData[id]?.activeness}
          onChange={(value) => handleAttendanceChange(id, "activeness", value)}
        />
      ),
    },
    {
      title: "Homework",
      dataIndex: "id",
      key: "homework",
      render: (id) => (
        <Select
          defaultValue={attendanceData[id]?.homework}
          style={{ width: 120 }}
          onChange={(value) => handleAttendanceChange(id, "homework", value)}
        >
          <Option value="Complete">Complete</Option>
          <Option value="Partial">Partial</Option>
          <Option value="Incomplete">Incomplete</Option>
          <Option value="Missing">Missing</Option>
        </Select>
      ),
    },
    {
      title: "Description",
      dataIndex: "id",
      key: "description",
      render: (id) => (
        <TextArea
          rows={1}
          defaultValue={attendanceData[id]?.description}
          onChange={(e) =>
            handleAttendanceChange(id, "description", e.target.value)
          }
          placeholder="Add notes about this student's performance"
        />
      ),
    },
  ];

  // Student columns for exam modal
  const studentExamColumns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Result",
      dataIndex: "id",
      key: "result",
      render: (id) => (
        <Input
          defaultValue={examData[id]?.result}
          onChange={(e) => handleExamChange(id, "result", e.target.value)}
          placeholder="Exam result/score"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "id",
      key: "description",
      render: (id) => (
        <TextArea
          rows={1}
          defaultValue={examData[id]?.description}
          onChange={(e) => handleExamChange(id, "description", e.target.value)}
          placeholder="Notes about student's performance"
        />
      ),
    },
  ];

  // Event handlers
  const handleViewGroup = (group) => {
    navigate(`${group.id}`);
  };

  const handleTakeAttendance = (group) => {
    setSelectedGroup(group);
    fetchStudentsInGroup(group.id);
    setAttendanceModalVisible(true);
  };

  const handleExam = (group) => {
    setSelectedGroup(group);
    fetchStudentsInGroup(group.id);
    setExamModalVisible(true);
  };

  const handleStats = (group) => {
    setSelectedGroup(group);
    fetchStudentsInGroup(group.id);
    setStatsModalVisible(true);
  };

  const handleAttendanceChange = (studentId, field, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleExamChange = (studentId, field, value) => {
    setExamData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleAttendanceSubmit = () => {
    console.log("Submitting attendance data:", {
      date: attendanceDate.format("YYYY-MM-DD"),
      group_id: selectedGroup.id,
      attendance: attendanceData,
    });

    // Here you would make an API call to save the attendance data

    setAttendanceModalVisible(false);
    // Reset attendance form
    setAttendanceDate(moment());
  };

  const handleExamSubmit = () => {
    console.log("Submitting exam data:", {
      date: examDate.format("YYYY-MM-DD"),
      group_id: selectedGroup.id,
      exam: examData,
    });

    // Here you would make an API call to save the exam data

    setExamModalVisible(false);
    // Reset exam form
    setExamDate(moment());
  };

  // Mock data for statistics
  const attendanceStats = [
    { name: "Present", value: 85 },
    { name: "Absent", value: 15 },
  ];

  const homeworkStats = [
    { name: "Complete", value: 75 },
    { name: "Partial", value: 15 },
    { name: "Incomplete", value: 7 },
    { name: "Missing", value: 3 },
  ];

  const activenessStats = [
    { name: "1 Star", value: 5 },
    { name: "2 Stars", value: 10 },
    { name: "3 Stars", value: 25 },
    { name: "4 Stars", value: 40 },
    { name: "5 Stars", value: 20 },
  ];

  // Progress component (since it wasn't imported from antd)
  const Progress = ({ percent, size }) => (
    <div
      style={{
        width: "100%",
        height: size === "small" ? 6 : 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          backgroundColor:
            percent > 70 ? "#52c41a" : percent > 50 ? "#faad14" : "#ff4d4f",
          borderRadius: 10,
        }}
      />
    </div>
  );

  return (
    <div className="p-6">
      <div>
        <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
          Group Information
        </h1>
        {loading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={groups}
            columns={groupColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>

      {/* Attendance Modal */}
      <Modal
        title={
          <span>
            <span className="fa-solid fa-circle-check" /> Take Attendance -{" "}
            {selectedGroup?.name}
          </span>
        }
        open={attendanceModalVisible}
        onCancel={() => setAttendanceModalVisible(false)}
        width={1000}
        footer={[
          <Button key="back" onClick={() => setAttendanceModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAttendanceSubmit}>
            Submit Attendance
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Attendance Date">
            <DatePicker
              value={attendanceDate}
              onChange={setAttendanceDate}
              style={{ width: 200 }}
            />
          </Form.Item>
        </Form>
        <Table
          dataSource={studentsInGroup}
          columns={studentAttendanceColumns}
          rowKey="id"
          pagination={false}
        />
      </Modal>

      {/* Exam Modal */}
      <Modal
        title={
          <span>
            <span className="fa-solid fa-book" /> Record Exam Results -{" "}
            {selectedGroup?.name}
          </span>
        }
        open={examModalVisible}
        onCancel={() => setExamModalVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setExamModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleExamSubmit}>
            Submit Exam Results
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Exam Date">
            <DatePicker
              value={examDate}
              onChange={setExamDate}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item label="Exam Title">
            <Input placeholder="Midterm Exam, Final Exam, Quiz, etc." />
          </Form.Item>
        </Form>
        <Table
          dataSource={studentsInGroup}
          columns={studentExamColumns}
          rowKey="id"
          pagination={false}
        />
      </Modal>

      {/* Statistics Modal */}
      <Modal
        title={
          <span>
            <span className="fa-solid fa-chart-line" /> Group Statistics -{" "}
            {selectedGroup?.name}
          </span>
        }
        open={statsModalVisible}
        onCancel={() => setStatsModalVisible(false)}
        width={1000}
        footer={[
          <Button key="back" onClick={() => setStatsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Students"
                    value={studentsInGroup.length}
                    prefix={<span className="fa-solid fa-users" />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Average Attendance"
                    value={selectedGroup?.averageAttendance}
                    suffix="%"
                    valueStyle={{
                      color:
                        selectedGroup?.averageAttendance > 80
                          ? "#3f8600"
                          : "#cf1322",
                    }}
                    prefix={<span className="fa-solid fa-circle-check" />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Average Activeness"
                    value={4.2}
                    precision={1}
                    prefix={<span style={{ marginRight: 8 }}>★</span>}
                  />
                </Card>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Attendance Distribution">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={attendanceStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {attendanceStats.map((entry, index) => (
                          <Tooltip key={`tooltip-${index}`} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Homework Completion">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={homeworkStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#82ca9d"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {homeworkStats.map((entry, index) => (
                          <Tooltip key={`tooltip-${index}`} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Card title="Activeness Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={activenessStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabPane>
          <TabPane tab="Student Performance" key="2">
            <Table
              dataSource={studentsInGroup}
              rowKey="id"
              columns={[
                {
                  title: "Student",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Attendance",
                  dataIndex: "attendanceRate",
                  key: "attendanceRate",
                  render: (rate) => (
                    <Tooltip title={`${rate}% attendance rate`}>
                      <Progress percent={rate} />
                    </Tooltip>
                  ),
                  sorter: (a, b) => a.attendanceRate - b.attendanceRate,
                },
                {
                  title: "Homework",
                  dataIndex: "homeworkCompletion",
                  key: "homeworkCompletion",
                  render: (rate) => (
                    <Tooltip title={`${rate}% completion rate`}>
                      <Progress percent={rate} />
                    </Tooltip>
                  ),
                  sorter: (a, b) => a.homeworkCompletion - b.homeworkCompletion,
                },
                {
                  title: "Activeness",
                  dataIndex: "averageActiveness",
                  key: "averageActiveness",
                  render: (rate) => <Rate disabled defaultValue={rate} />,
                  sorter: (a, b) => a.averageActiveness - b.averageActiveness,
                },
                {
                  title: "Last Attendance",
                  dataIndex: "lastAttendance",
                  key: "lastAttendance",
                  render: (attendance) => (
                    <span>
                      {attendance.date} -
                      {attendance.present ? (
                        <Tag color="green">Present</Tag>
                      ) : (
                        <Tag color="red">Absent</Tag>
                      )}
                    </span>
                  ),
                },
              ]}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Payments" key="3">
            <Table
              dataSource={studentsInGroup}
              rowKey="id"
              columns={[
                {
                  title: "Student",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Discount",
                  dataIndex: "discount",
                  key: "discount",
                  render: (discount) =>
                    discount > 0 ? (
                      <Tag color="green">{discount}% Discount</Tag>
                    ) : (
                      <Tag color="default">No Discount</Tag>
                    ),
                },
                {
                  title: "Last Payment",
                  key: "lastPayment",
                  render: () => <span>2024-02-10 - $500</span>,
                },
                {
                  title: "Payment Status",
                  key: "paymentStatus",
                  render: () => <Tag color="green">Paid</Tag>,
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: () => (
                    <Space>
                      <Button
                        icon={<span className="fa-solid fa-money-bill" />}
                        size="small"
                      >
                        View Payments
                      </Button>
                    </Space>
                  ),
                },
              ]}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Badges" key="4">
            <Row gutter={16}>
              {studentsInGroup.map((student) => (
                <Col span={8} key={student.id}>
                  <Card title={student.name}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Space>
                        <span
                          className="fa-solid fa-trophy"
                          style={{ color: "gold", fontSize: 24 }}
                        />
                        <span>Perfect Attendance</span>
                      </Space>
                      <Space>
                        <span
                          className="fa-solid fa-trophy"
                          style={{ color: "silver", fontSize: 24 }}
                        />
                        <span>Homework Champion</span>
                      </Space>
                      <Button
                        type="dashed"
                        icon={<span className="fa-solid fa-trophy" />}
                        block
                      >
                        Award New Badge
                      </Button>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default GroupsPage;
