import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Select,
  Tag,
  Typography,
  Space,
  message,
  Popconfirm,
} from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AttendanceModal, PaymentModal } from "./sections";

// Mock data
const mockGroup = {
  id: "1",
  name: "English Beginners",
  days: "mon-wed-fri",
  level: 1,
  start_time: "09:00",
  end_time: "10:30",
  teacher_id: "1",
  support_teacher_id: "2",
  field_id: "1",
  description: "Beginner English class",
  teacher: { id: "1", name: "John Doe" },
  supportTeacher: { id: "2", name: "Jane Smith" },
  field: { id: "1", name: "English" },
};

const mockStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    username: "alice_j",
    phone: "1234567890",
    parent_name: "Bob Johnson",
    parent_phone: "0987654321",
    discount: 10,
  },
  {
    id: "2",
    name: "Anna Tompson",
    username: "anna_t",
    phone: "0011121245",
    parent_name: "Tom Doe",
    parent_phone: "54646865422",
    discount: 0,
  },
  // Add more mock students
];

const mockPayments = [
  {
    id: "1",
    student_id: "1",
    amount: 100000,
    status: true,
    date: "2025-02",
  },
  // Add more mock payments
];

const mockAttendance = [
  {
    id: "1",
    date: "2025-02-14",
    group_id: "1",
    student_id: "1",
    homework: "Completed",
    activeness: "4",
    description: "Participated well in class",
  },
  // Add more mock attendance
];

const GroupDetailPage = () => {
  const { group_id } = useParams();
  const [group, setGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  // Fetch group details and students on component mount
  useEffect(() => {
    // Mock data loading
    setGroup(mockGroup);
    setStudents(mockStudents);
  }, [group_id]);

  const checkPaymentStatus = (studentId) => {
    const currentMonth = moment().format("YYYY-MM");
    return mockPayments.some(
      (payment) =>
        payment.student_id === studentId &&
        payment.date === currentMonth &&
        payment.status
    );
  };

  const getTodayAttendance = (studentId) => {
    const today = moment().format("YYYY-MM-DD");
    return mockAttendance.find(
      (a) =>
        a.student_id === studentId &&
        a.group_id === group_id &&
        a.date === today
    );
  };

  const handleAddStudent = async (values) => {
    try {
      setLoading(true);
      // Mock API call to add student to group
      const newStudentGroup = {
        id: Math.random().toString(36).substr(2, 9),
        student_id: values.student_id,
        group_id: group_id,
        created_at: new Date().toISOString(),
      };
      message.success("Student added to group successfully");
      setIsAddStudentModalVisible(false);
    } catch (error) {
      message.error("Failed to add student to group");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      // Remove student from group
      // Replace with actual API call
      message.success("Student removed from group");
      // fetchGroupData();
    } catch (error) {
      message.error("Failed to remove student");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Parent",
      key: "parent",
      render: (_, record) => [record.parent_name, <br />, record.parent_phone],
    },
    {
      title: "Payment Status",
      key: "payment",
      render: (_, record) => (
        <Tag color={checkPaymentStatus(record.id) ? "green" : "red"}>
          {checkPaymentStatus(record.id) ? "Paid" : "Unpaid"}
        </Tag>
      ),
      sorter: (a, b) =>
        String(checkPaymentStatus(a.id)).localeCompare(
          String(checkPaymentStatus(b.id))
        ),
    },
    {
      title: "Today's Attendance",
      key: "attendance",
      render: (_, record) => {
        const attendance = getTodayAttendance(record.id);
        return (
          <Space>
            {attendance ? (
              <Tag color="green">Present</Tag>
            ) : (
              <Tag color="red">Absent</Tag>
            )}
            <PaymentModal />
            <Popconfirm
              title="Are you sure you want to remove this student from the group?"
              onConfirm={() => handleRemoveStudent(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<i className="fa-solid fa-user-minus" />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  if (!group) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Row gutter={24}>
        <Col span={8}>
          <Card
            title={<p className="dark:text-white">Group Details</p>}
            className="dark:bg-gradient-to-br from-dark-m/95 to-dark-l"
          >
            <table>
              <tbody className="dark:text-white">
                <tr>
                  <th className="text-left pr-2">Name:</th>
                  <td>{group.name}</td>
                </tr>
                <tr>
                  <th className="text-left pr-2">Days:</th>
                  <td>{group.days}</td>
                </tr>
                <tr>
                  <th className="text-left pr-2">Time:</th>
                  <td>
                    {group.start_time} - {group.end_time}
                  </td>
                </tr>
                <tr>
                  <th className="text-left pr-2">Level:</th>
                  <td>Level {group.level}</td>
                </tr>
                <tr>
                  <th className="text-left pr-2">Teacher:</th>
                  <td>{group.teacher.name}</td>
                </tr>
                {group.support_teacher_id && (
                  <tr>
                    <th className="text-left pr-2">Support Teacher:</th>
                    <td>{group.supportTeacher.name}</td>
                  </tr>
                )}
                <tr>
                  <th className="text-left pr-2">Field:</th>
                  <td>{group.field.name}</td>
                </tr>
                {group.description && (
                  <tr>
                    <th className="text-left pr-2">Description:</th>
                    <td>{group.description}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </Col>

        <Col span={16}>
          <Card
            title={<p className="dark:text-white">Students</p>}
            className="dark:bg-gradient-to-br from-dark-m/95 to-dark-l"
            extra={
              <div className="flex items-center gap-3">
                <AttendanceModal
                  students={students}
                  attendance={mockAttendance}
                />
                <Button
                  type="primary"
                  icon={<i className="fa-solid fa-plus" />}
                  onClick={() => setIsAddStudentModalVisible(true)}
                >
                  Add Student
                </Button>
              </div>
            }
          >
            <Table
              columns={columns}
              dataSource={students}
              rowKey="id"
              scroll={{ x: true }}
              className={theme === "dark" && "dark-table"}
            />
          </Card>
        </Col>
      </Row>

      {/* Add Student Modal */}
      <Modal
        title="Add Student to Group"
        open={isAddStudentModalVisible}
        onCancel={() => setIsAddStudentModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddStudent}>
          <Form.Item
            name="student_id"
            label="Student"
            rules={[{ required: true, message: "Please select a student" }]}
          >
            <Select
              showSearch
              placeholder="Select a student"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {mockStudents
                .filter((student) => !students.find((s) => s.id === student.id))
                .map((student) => (
                  <Select.Option key={student.id} value={student.id}>
                    {student.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Student
              </Button>
              <Button onClick={() => setIsAddStudentModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupDetailPage;
