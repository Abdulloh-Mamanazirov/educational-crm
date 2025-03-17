import React, { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Tag,
  Statistic,
  Space,
  InputNumber,
} from "antd";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

// Mock data
const mockEmployees = [
  { id: "1", name: "John Doe", role: "Teacher", salary: 3000 },
  { id: "2", name: "Jane Smith", role: "Employee", salary: 2500 },
  { id: "3", name: "Alice Johnson", role: "Manager", salary: 4000 },
  { id: "4", name: "Bob Brown", role: "Clerk", salary: 2000 },
  { id: "5", name: "Charlie Davis", role: "Driver", salary: 1800 },
  { id: "6", name: "Diana Evans", role: "Cook", salary: 2200 },
  { id: "7", name: "Eve Foster", role: "Janitor", salary: 1600 },
  { id: "8", name: "Frank Green", role: "Security", salary: 2300 },
  { id: "9", name: "Grace Hall", role: "Nurse", salary: 3200 },
  { id: "10", name: "Henry Kim", role: "Therapist", salary: 3500 },
];

const mockSalaries = [
  // Salaries for Employee 1 (John Doe)
  {
    id: "1",
    user_id: "1",
    date: "2025-01-05",
    amount: 3000,
    status: true,
    description: "Full payment for January",
    created_at: "2025-01-05T10:00:00",
  },
  {
    id: "2",
    user_id: "1",
    date: "2025-02-01",
    amount: 2000,
    status: true,
    description: "Partial payment for February",
    created_at: "2025-02-01T10:00:00",
  },
  {
    id: "3",
    user_id: "1",
    date: "2025-02-15",
    amount: 1000,
    status: true,
    description: "Remaining payment for February",
    created_at: "2025-02-15T10:00:00",
  },
  {
    id: "4",
    user_id: "1",
    date: "2025-03-05",
    amount: 3000,
    status: true,
    description: "Full payment for March",
    created_at: "2025-03-05T10:00:00",
  },

  // Salaries for Employee 2 (Jane Smith)
  {
    id: "5",
    user_id: "2",
    date: "2025-01-10",
    amount: 1250,
    status: true,
    description: "Partial payment for January",
    created_at: "2025-01-10T10:00:00",
  },
  {
    id: "6",
    user_id: "2",
    date: "2025-01-25",
    amount: 1250,
    status: true,
    description: "Remaining payment for January",
    created_at: "2025-01-25T10:00:00",
  },
  {
    id: "7",
    user_id: "2",
    date: "2025-02-10",
    amount: 2500,
    status: true,
    description: "Full payment for February",
    created_at: "2025-02-10T10:00:00",
  },
  {
    id: "8",
    user_id: "2",
    date: "2025-03-10",
    amount: 2500,
    status: true,
    description: "Full payment for March",
    created_at: "2025-03-10T10:00:00",
  },

  // Salaries for Employee 3 (Alice Johnson)
  {
    id: "9",
    user_id: "3",
    date: "2025-01-15",
    amount: 4000,
    status: true,
    description: "Full payment for January",
    created_at: "2025-01-15T10:00:00",
  },
  {
    id: "10",
    user_id: "3",
    date: "2025-02-05",
    amount: 2000,
    status: true,
    description: "Partial payment for February",
    created_at: "2025-02-05T10:00:00",
  },
  {
    id: "11",
    user_id: "3",
    date: "2025-02-25",
    amount: 2000,
    status: true,
    description: "Remaining payment for February",
    created_at: "2025-02-25T10:00:00",
  },
  {
    id: "12",
    user_id: "3",
    date: "2025-03-15",
    amount: 4000,
    status: true,
    description: "Full payment for March",
    created_at: "2025-03-15T10:00:00",
  },

  // Continue similarly for other employees
];

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState(mockSalaries);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSalary, setEditingSalary] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [form] = Form.useForm();
  const { theme } = useSelector((state) => state.theme);

  // Get employee details
  const getEmployee = (userId) => {
    return mockEmployees.find((emp) => emp.id === userId);
  };

  // Calculate monthly statistics
  const calculateMonthlyStats = () => {
    const currentMonth = selectedMonth.format("YYYY-MM");
    const monthSalaries = salaries.filter(
      (s) => moment(s.date).format("YYYY-MM") === currentMonth
    );

    const totalPaid = monthSalaries.reduce((sum, s) => sum + s.amount, 0);
    const totalRequired = mockEmployees.reduce(
      (sum, emp) => sum + emp.salary,
      0
    );
    const remaining = totalRequired - totalPaid;

    return { totalPaid, totalRequired, remaining };
  };

  // Get payment status for an employee in current month
  const getPaymentStatus = (userId) => {
    const currentMonth = selectedMonth.format("YYYY-MM");
    const employeeSalaries = salaries.filter(
      (s) =>
        s.user_id === userId &&
        moment(s.date).format("YYYY-MM") === currentMonth
    );

    const totalPaid = employeeSalaries.reduce((sum, s) => sum + s.amount, 0);
    const required = getEmployee(userId)?.salary || 0;

    if (totalPaid >= required) return "complete";
    if (totalPaid > 0) return "partial";
    return "unpaid";
  };

  // Prepare chart data
  const getChartData = () => {
    const monthlyData = {};

    salaries.forEach((salary) => {
      const month = moment(salary.date).format("YYYY-MM");
      if (!monthlyData[month]) {
        monthlyData[month] = { month, paid: 0, required: 0 };
      }
      monthlyData[month].paid += salary.amount;
    });

    // Add required salaries
    const totalRequired = mockEmployees.reduce(
      (sum, emp) => sum + emp.salary,
      0
    );
    Object.keys(monthlyData).forEach((month) => {
      monthlyData[month].required = totalRequired;
    });

    return Object.values(monthlyData).sort((a, b) =>
      moment(a.month).diff(moment(b.month))
    );
  };

  // Handle salary record creation/update
  const handleSave = (values) => {
    const salaryData = {
      id: editingSalary
        ? editingSalary.id
        : Math.random().toString(36).substr(2, 9),
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      created_at: moment().format(),
      status: true,
    };

    if (editingSalary) {
      setSalaries(
        salaries.map((s) => (s.id === editingSalary.id ? salaryData : s))
      );
      message.success("Salary record updated successfully");
    } else {
      setSalaries([...salaries, salaryData]);
      message.success("Salary record created successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
    setEditingSalary(null);
  };

  // Delete salary record
  const handleDelete = (id) => {
    setSalaries(salaries.filter((s) => s.id !== id));
    message.success("Salary record deleted successfully");
  };

  // Table columns
  const columns = [
    {
      title: "Employee",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId) => getEmployee(userId)?.name,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const status = getPaymentStatus(record.user_id);
        const colors = {
          complete: "success",
          partial: "warning",
          unpaid: "error",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingSalary(record);
              form.setFieldsValue({
                ...record,
                date: moment(record.date),
              });
              setIsModalVisible(true);
            }}
          >
            <span className="fa fa-edit"></span>
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            <span className="fa fa-trash"></span>
          </Button>
        </Space>
      ),
    },
  ];

  const stats = calculateMonthlyStats();

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Salary Management</h1>
          <Button
            type="primary"
            onClick={() => {
              setEditingSalary(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            <span className="fa fa-plus mr-2"></span>
            Record Payment
          </Button>
        </div>

        <DatePicker
          onChange={setSelectedMonth}
          picker="month"
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="dark:bg-gray-800">
            <Statistic
              title={<span className="dark:text-white">Total Required</span>}
              value={stats.totalRequired}
              prefix={<span className="dark:text-white">$</span>}
              formatter={(value) => (
                <span className="dark:text-white">
                  {Number(value).toLocaleString()}
                </span>
              )}
              precision={2}
            />
          </Card>
          <Card className="dark:bg-gray-800">
            <Statistic
              title={<span className="dark:text-white">Total Paid</span>}
              value={stats.totalPaid}
              prefix={<span className="dark:text-white">$</span>}
              formatter={(value) => (
                <span className="dark:text-white">
                  {Number(value).toLocaleString()}
                </span>
              )}
              precision={2}
            />
          </Card>
          <Card className="dark:bg-gray-800">
            <Statistic
              title={<span className="dark:text-white">Remaining</span>}
              value={stats.remaining}
              prefix="$"
              formatter={(value) => (
                <span className="dark:text-white">
                  {Number(value).toLocaleString()}
                </span>
              )}
              precision={2}
              valueStyle={{
                color: stats.remaining > 0 ? "#cf1322" : "#3f8600",
              }}
            />
          </Card>
        </div>

        <div className="mb-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="paid"
                stroke="#8884d8"
                name="Paid Amount"
              />
              <Line
                type="monotone"
                dataKey="required"
                stroke="#82ca9d"
                name="Required Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Table
          dataSource={salaries.filter(
            (s) =>
              moment(s.date).format("YYYY-MM") ===
              selectedMonth.format("YYYY-MM")
          )}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
          className={theme === "dark" && "dark-table"}
        />
      </div>

      <Modal
        title={editingSalary ? "Edit Payment Record" : "New Payment Record"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingSalary(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="user_id"
            label="Employee"
            rules={[{ required: true, message: "Please select an employee!" }]}
          >
            <Select>
              {mockEmployees.map((emp) => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.name} - ${emp.salary}/month
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Payment Date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter the amount!" }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              className="w-full"
              formatter={(value) => Number(value).toLocaleString()}
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingSalary(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingSalary ? "Update" : "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalaryManagement;
