import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Space,
  Statistic,
  Typography,
  Popconfirm,
  Tag,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import moment from "moment";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

// Mock expense types
const expenseTypes = [
  "Rent",
  "Utilities",
  "Equipment",
  "Supplies",
  "Marketing",
  "Maintenance",
  "Other",
];

// Mock data
const mockExpenses = [
  {
    id: "1",
    amount: 1500000,
    type: "Rent",
    date: "2025-02-01",
    description: "Monthly office rent",
  },
  {
    id: "2",
    amount: 250000,
    type: "Utilities",
    date: "2025-02-05",
    description: "Electricity and water bills",
  },
  // Add more mock data as needed
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC0CB",
  "#A0522D",
];

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    moment().startOf("month"),
    moment().endOf("month"),
  ]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { theme } = useSelector((state) => state.theme);

  // Filter expenses based on date range and selected types
  const filteredExpenses = expenses.filter((expense) => {
    const date = moment(expense.date);
    const inDateRange = date.isBetween(dateRange[0], dateRange[1], "day", "[]");
    const inSelectedTypes =
      selectedTypes.length === 0 || selectedTypes.includes(expense.type);
    return inDateRange && inSelectedTypes;
  });

  // Calculate statistics
  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );
  const averageExpense = filteredExpenses.length
    ? totalExpenses / filteredExpenses.length
    : 0;

  // Prepare data for charts
  const expensesByType = expenseTypes
    .map((type) => ({
      name: type,
      value: filteredExpenses
        .filter((exp) => exp.type === type)
        .reduce((sum, exp) => sum + exp.amount, 0),
    }))
    .filter((item) => item.value > 0);

  const dailyExpenses = filteredExpenses.reduce((acc, exp) => {
    const date = exp.date;
    acc[date] = (acc[date] || 0) + exp.amount;
    return acc;
  }, {});

  const lineChartData = Object.entries(dailyExpenses)
    .map(([date, amount]) => ({
      date,
      amount,
    }))
    .sort((a, b) => moment(a.date).diff(moment(b.date)));

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        amount: Number(values.amount),
      };

      if (editingExpense) {
        // Update existing expense
        setExpenses(
          expenses.map((exp) =>
            exp.id === editingExpense.id ? { ...exp, ...formattedValues } : exp
          )
        );
        message.success("Expense updated successfully");
      } else {
        // Add new expense
        const newExpense = {
          ...formattedValues,
          id: Math.random().toString(36).substr(2, 9),
        };
        setExpenses([...expenses, newExpense]);
        message.success("Expense added successfully");
      }

      setIsModalVisible(false);
      setEditingExpense(null);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: expenseTypes.map((type) => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${(amount / 1000).toFixed(2)}k`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<i className="fa-solid fa-edit" />}
            onClick={() => {
              setEditingExpense(record);
              form.setFieldsValue({
                ...record,
                date: moment(record.date),
              });
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this expense?"
            onConfirm={() => {
              setExpenses(expenses.filter((exp) => exp.id !== record.id));
              message.success("Expense deleted successfully");
            }}
          >
            <Button danger icon={<i className="fa-solid fa-trash" />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold">Expenses Management</h1>
        <div className="flex items-center gap-3 my-5 flex-wrap">
          <DatePicker.RangePicker
            onChange={(e) => {
              setDateRange([
                e[0].$d.toLocaleDateString(),
                e[1].$d.toLocaleDateString(),
              ]);
            }}
            allowClear={false}
          />
          <Select
            mode="multiple"
            placeholder="Filter by type"
            value={selectedTypes}
            onChange={setSelectedTypes}
            style={{ width: 300 }}
          >
            {expenseTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<i className="fa-solid fa-plus" />}
            onClick={() => {
              setEditingExpense(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add Expense
          </Button>
        </div>
      </div>

      <div className="flex items-center flex-wrap my-5 gap-3 justify-between">
        <Card className="flex-1 dark:bg-gray-800">
          <Statistic
            title={<span className="dark:text-white">Total Expenses</span>}
            formatter={(value) => (
              <span className="dark:text-white text-nowrap">
                $ {value.toLocaleString()}
              </span>
            )}
            value={totalExpenses}
            precision={2}
          />
        </Card>
        <Card className="flex-1 dark:bg-gray-800">
          <Statistic
            title={<span className="dark:text-white">Average Expense</span>}
            formatter={(value) => (
              <span className="dark:text-white text-nowrap">
                $ {value.toLocaleString()}
              </span>
            )}
            value={averageExpense}
            precision={2}
          />
        </Card>
        <Card className="flex-1 dark:bg-gray-800">
          <Statistic
            title={<span className="dark:text-white">Number of Expenses</span>}
            formatter={(value) => (
              <span className="dark:text-white text-nowrap">
                {value.toLocaleString()}
              </span>
            )}
            value={filteredExpenses.length}
          />
        </Card>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Expenses Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${(value / 1000).toFixed(2)}k`}
                />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Expenses by Type">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByType}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expensesByType.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${(value / 1000).toFixed(2)}k`}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            dataSource={filteredExpenses}
            rowKey="id"
            scroll={{ x: true }}
            className={theme === "dark" && "dark-table"}
          />
        </Col>
      </Row>

      <Modal
        title={editingExpense ? "Edit Expense" : "Add New Expense"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingExpense(null);
          form.resetFields();
        }}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="type"
            label="Expense Type"
            rules={[{ required: true, message: "Please select expense type" }]}
          >
            <Select>
              {expenseTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseManagement;
