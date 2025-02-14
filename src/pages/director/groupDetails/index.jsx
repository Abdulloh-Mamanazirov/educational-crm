import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Typography,
  Space,
  Descriptions,
  Rate,
  message,
  Tooltip,
  Drawer,
  Popconfirm,
} from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const { Text } = Typography;
const { TextArea } = Input;

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
  const [isAttendanceDrawerVisible, setIsAttendanceDrawerVisible] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceForm] = Form.useForm();
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

  const handleAttendanceSubmit = async (values) => {
    try {
      setLoading(true);
      // Mock API call to update attendance
      const attendanceData = {
        ...values,
        date: moment().format("YYYY-MM-DD"),
        group_id: group_id,
        student_id: selectedStudent.id,
      };
      mockAttendance.push(attendanceData);
      message.success("Attendance updated successfully");
      setIsAttendanceDrawerVisible(false);
    } catch (error) {
      message.error("Failed to update attendance");
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
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Text>{record.parent_name}</Text>
          <Text type="secondary">{record.parent_phone}</Text>
        </Space>
      ),
    },
    {
      title: "Payment Status",
      key: "payment",
      render: (_, record) => (
        <Tag color={checkPaymentStatus(record.id) ? "green" : "red"}>
          {checkPaymentStatus(record.id) ? "Paid" : "Unpaid"}
        </Tag>
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
              <>
                <Tag color="green">Present</Tag>
                <Tooltip title="View/Edit Attendance">
                  <Button
                    icon={<i className="fa-solid fa-edit" />}
                    style={{ color: "#22c55e" }}
                    onClick={() => {
                      setSelectedStudent(record);
                      attendanceForm.setFieldsValue(attendance);
                      setIsAttendanceDrawerVisible(true);
                    }}
                  />
                </Tooltip>
              </>
            ) : (
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setSelectedStudent(record);
                  attendanceForm.resetFields();
                  setIsAttendanceDrawerVisible(true);
                }}
              >
                Present✅
              </Button>
            )}
            <Tooltip title="View Payment History">
              <Button
                icon={<i className="fa-solid fa-money-bill" />}
                onClick={() => {
                  /* Handle payment history view */
                }}
              />
            </Tooltip>
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
              <Button
                type="primary"
                icon={<i className="fa-solid fa-plus" />}
                onClick={() => setIsAddStudentModalVisible(true)}
              >
                Add Student
              </Button>
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

      {/* Attendance Drawer */}
      <Drawer
        title={`Attendance - ${selectedStudent?.name}`}
        open={isAttendanceDrawerVisible}
        onClose={() => setIsAttendanceDrawerVisible(false)}
        width={400}
      >
        <Form
          form={attendanceForm}
          onFinish={handleAttendanceSubmit}
          layout="vertical"
        >
          <Form.Item
            name="homework"
            label="Homework Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Incomplete">Incomplete</Select.Option>
              <Select.Option value="Partial">Partial</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="activeness"
            label="Class Participation"
            rules={[{ required: true }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="description"
            label="Notes"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
              <Button onClick={() => setIsAttendanceDrawerVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default GroupDetailPage;
