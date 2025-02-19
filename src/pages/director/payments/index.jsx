import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
  Tooltip,
  Badge,
  message,
  Statistic,
  Progress,
  Row,
  Col,
  DatePicker,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

// Mock data
const mockFields = [
  { id: "1", name: "English", monthly_payment: 200000 },
  { id: "2", name: "Mathematics", monthly_payment: 180000 },
  { id: "3", name: "Japanese", monthly_payment: 220000 },
];

const mockGroups = [
  {
    id: "1",
    name: "English Group",
    field_id: "1",
    days: "mon-wed-fri",
    start_time: "09:00",
    end_time: "10:30",
  },
  {
    id: "2",
    name: "Mathematics Group",
    field_id: "2",
    days: "mon-wed-fri",
    start_time: "09:00",
    end_time: "10:30",
  },
  {
    id: "3",
    name: "Japanese Group",
    field_id: "3",
    days: "mon-wed-fri",
    start_time: "09:00",
    end_time: "10:30",
  },
];

const mockStudents = [
  {
    id: "1",
    name: "English Student 1",
    username: "english_student_1",
    phone: "1234567890",
    discount: 10,
  },
  {
    id: "2",
    name: "English Student 2",
    username: "english_student_2",
    phone: "1234567890",
    discount: 50,
  },
  {
    id: "3",
    name: "English Student 3",
    username: "english_student_3",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "4",
    name: "English Student 4",
    username: "english_student_4",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "5",
    name: "English Student 5",
    username: "english_student_5",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "6",
    name: "Mathematics Student 1",
    username: "mathematics_student_1",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "7",
    name: "Mathematics Student 2",
    username: "mathematics_student_2",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "8",
    name: "Mathematics Student 3",
    username: "mathematics_student_3",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "9",
    name: "Mathematics Student 4",
    username: "mathematics_student_4",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "10",
    name: "Mathematics Student 5",
    username: "mathematics_student_5",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "11",
    name: "Japanese Student 1",
    username: "japanese_student_1",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "12",
    name: "Japanese Student 2",
    username: "japanese_student_2",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "13",
    name: "Japanese Student 3",
    username: "japanese_student_3",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "14",
    name: "Japanese Student 4",
    username: "japanese_student_4",
    phone: "1234567890",
    discount: 0,
  },
  {
    id: "15",
    name: "Japanese Student 5",
    username: "japanese_student_5",
    phone: "1234567890",
    discount: 0,
  },
];

const mockStudentGroups = [
  { student_id: "1", group_id: "1" },
  { student_id: "2", group_id: "1" },
  { student_id: "3", group_id: "1" },
  { student_id: "4", group_id: "1" },
  { student_id: "5", group_id: "1" },
  { student_id: "6", group_id: "2" },
  { student_id: "7", group_id: "2" },
  { student_id: "8", group_id: "2" },
  { student_id: "9", group_id: "2" },
  { student_id: "10", group_id: "2" },
  { student_id: "11", group_id: "3" },
  { student_id: "12", group_id: "3" },
  { student_id: "13", group_id: "3" },
  { student_id: "14", group_id: "3" },
  { student_id: "15", group_id: "3" },
];
const mockPayments = [
  {
    id: "1",
    student_id: "1",
    amount: 180000,
    status: true,
    date: "2025-02",
    created_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "2",
    student_id: "2",
    amount: 100000,
    status: true,
    date: "2025-02",
    created_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "3",
    student_id: "3",
    amount: 180000,
    status: true,
    date: "2025-02",
    created_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "4",
    student_id: "4",
    amount: 200000,
    status: true,
    date: "2025-02",
    created_at: "2025-02-01T00:00:00Z",
  },
];
const StudentPaymentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form] = Form.useForm();
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [paymentHistoryModalVisible, setPaymentHistoryModalVisible] =
    useState(false);
  const [selectedStudentPayments, setSelectedStudentPayments] = useState([]);
  const { theme } = useSelector((state) => state.theme);

  // Calculate required payment amount with discount
  const calculateRequiredAmount = (student) => {
    const studentGroups = mockStudentGroups
      .filter((sg) => sg.student_id === student.id)
      .map((sg) => mockGroups.find((g) => g.id === sg.group_id));

    const totalAmount = studentGroups.reduce((sum, group) => {
      const field = mockFields.find((f) => f.id === group.field_id);
      return sum + (field ? field.monthly_payment : 0);
    }, 0);

    const discount = student.discount || 0;
    return totalAmount * (1 - discount / 100);
  };

  // Get total paid amount for the current month
  const getPaidAmount = (studentId, month) => {
    return mockPayments
      .filter(
        (payment) =>
          payment.student_id === studentId &&
          payment.date === month.format("YYYY-MM") &&
          payment.status
      )
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  // Calculate payment status and remaining amount
  const getPaymentStatus = (student) => {
    const requiredAmount = calculateRequiredAmount(student);
    const paidAmount = getPaidAmount(student.id, selectedMonth);
    const remainingAmount = requiredAmount - paidAmount;

    return {
      paidAmount,
      remainingAmount,
      percentage: (paidAmount / requiredAmount) * 100,
      status:
        remainingAmount <= 0 ? "full" : paidAmount > 0 ? "partial" : "unpaid",
    };
  };

  const handlePayment = async (values) => {
    try {
      setLoading(true);
      const paymentData = {
        id: Math.random().toString(36).substr(2, 9),
        student_id: selectedStudent.id,
        amount: values.amount,
        status: true,
        date: selectedMonth.format("YYYY-MM"),
        created_at: new Date().toISOString(),
      };
      mockPayments.push(paymentData);
      message.success("Payment recorded successfully");
      setPaymentModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  const showPaymentHistory = (student) => {
    const payments = mockPayments.filter((p) => p.student_id === student.id);
    setSelectedStudentPayments(payments);
    setSelectedStudent(student);
    setPaymentHistoryModalVisible(true);
  };

  const columns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <Text strong>{text}</Text>
          <Text type="secondary">{record.phone}</Text>
        </Space>
      ),
    },
    {
      title: "Required Amount",
      key: "required",
      render: (_, record) => {
        const amount = calculateRequiredAmount(record);
        return (
          <Tooltip
            title={
              record.discount ? `${record.discount}% discount applied` : null
            }
          >
            <Text>
              ${(amount / 1000).toFixed(2)}k
              {record.discount ? (
                <Text type="secondary"> (-{record.discount}%)</Text>
              ) : null}
            </Text>
          </Tooltip>
        );
      },
    },
    {
      title: `Payment`,
      key: "status-visual",
      render: (_, record) => {
        const { percentage, status } = getPaymentStatus(record);
        const statusColors = {
          full: "#52c41a",
          partial: "#faad14",
          unpaid: "#f5222d",
        };
        return (
          <Space>
            <Progress
              percent={Math.min(100, percentage).toFixed(1)}
              type="dashboard"
              strokeColor={statusColors[status]}
              size="small"
              trailColor={theme === "dark" && "gray"}
              format={(percent) => (
                <span className="dark:text-white">{percent}%</span>
              )}
            />
            <Button
              type="default"
              size="small"
              onClick={() => showPaymentHistory(record)}
            >
              History
            </Button>
          </Space>
        );
      },
      filters: [
        { text: "Fully Paid", value: "full" },
        { text: "Partially Paid", value: "partial" },
        { text: "Unpaid", value: "unpaid" },
      ],
      onFilter: (value, record) => getPaymentStatus(record).status === value,
    },
    {
      title: `Payment Status (${selectedMonth.format("MMMM YYYY")})`,
      key: "status",
      render: (_, record) => {
        const { paidAmount, remainingAmount } = getPaymentStatus(record);

        return (
          <Space direction="vertical" size="small">
            <Space>
              <Text type="secondary">
                Paid: ${(paidAmount / 1000).toFixed(2)}k
              </Text>
              {remainingAmount > 0 && (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setSelectedStudent(record);
                    form.setFieldsValue({
                      amount: remainingAmount,
                    });
                    setPaymentModalVisible(true);
                  }}
                >
                  Pay ${(remainingAmount / 1000).toFixed(2)}k
                </Button>
              )}
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-2 flex-col md:flex-row">
        <div>
          <h1 className={`text-2xl font-bold dark:text-white`}>
            Payments Management
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          <DatePicker.MonthPicker
            // picker="month"
            // value={selectedMonth}
            onChange={setSelectedMonth}
            allowClear={false}
          />
          <div className="flex items-center gap-2">
            <p className="text-lg text-gray-400">Collected:</p>
            <Statistic
              valueStyle={{ color: theme === "dark" ? "white" : "black" }}
              value={mockStudents.reduce(
                (sum, student) => sum + getPaymentStatus(student).paidAmount,
                0
              )}
              prefix="$"
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={mockStudents}
        rowKey="id"
        loading={loading}
        scroll={{ x: true }}
        className={theme === "dark" && "dark-table"}
      />

      {/* Payment Modal */}
      <Modal
        title={`Record Payment - ${selectedStudent?.name}`}
        open={paymentModalVisible}
        onCancel={() => {
          setPaymentModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handlePayment} layout="vertical">
          <Form.Item
            name="amount"
            label="Payment Amount"
            rules={[{ required: true, message: "Please enter payment amount" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Record Payment
              </Button>
              <Button
                onClick={() => {
                  setPaymentModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Payment History Modal */}
      <Modal
        title={`Payment History - ${selectedStudent?.name}`}
        open={paymentHistoryModalVisible}
        onCancel={() => setPaymentHistoryModalVisible(false)}
        footer={null}
        width={600}
      >
        <Table
          dataSource={selectedStudentPayments}
          columns={[
            {
              title: "Date",
              key: "date",
              render: (_, record) =>
                moment(record.created_at).format("YYYY-MM-DD HH:mm"),
            },
            {
              title: "Amount",
              dataIndex: "amount",
              render: (amount) => `$${(amount / 1000).toFixed(2)}k`,
            },
            {
              title: "Status",
              dataIndex: "status",
              render: (status) => (
                <Tag color={status ? "success" : "error"}>
                  {status ? "Successful" : "Failed"}
                </Tag>
              ),
            },
          ]}
          pagination={false}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default StudentPaymentsPage;
