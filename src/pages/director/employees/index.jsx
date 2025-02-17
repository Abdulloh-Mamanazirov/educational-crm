import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Select,
  Space,
  Popconfirm,
  message,
  Tag,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Search } = Input;

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [positionFilter, setPositionFilter] = useState([]);
  const [form] = Form.useForm();
  const { theme } = useSelector((state) => state.theme);

  // Mock positions data
  const positions = [
    "Receptionist",
    "Administrator",
    "Accountant",
    "IT Support",
    "Office Manager",
    "HR Manager",
  ];

  // Mock ranks data
  const ranks = ["Junior", "Senior", "Lead", "Manager"];

  // Position color mapping
  const positionColors = {
    Receptionist: "blue",
    Administrator: "purple",
    Accountant: "green",
    "IT Support": "cyan",
    "Office Manager": "orange",
    "HR Manager": "magenta",
  };

  // Mock data for employees
  const mockEmployees = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Sarah Wilson",
      salary: 2000000,
      username: "sarahw",
      phone: "+1234567890",
      position: "Receptionist",
      rank: "Junior",
      created_at: "2024-01-01",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Michael Chen",
      salary: 1000000,
      username: "michaelc",
      phone: "+1234567891",
      position: "IT Support",
      rank: "Senior",
      created_at: "2024-01-02",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "Emma Davis",
      salary: 3000000,
      username: "emmad",
      phone: "+1234567892",
      position: "HR Manager",
      rank: "Manager",
      created_at: "2024-01-03",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setEmployees(mockEmployees);
    setLoading(false);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.username.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.phone.includes(searchText);

    const matchesPosition =
      positionFilter.length === 0 || positionFilter.includes(employee.position);

    return matchesSearch && matchesPosition;
  });

  const handleAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingEmployee(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setEmployees(employees.filter((employee) => employee.id !== id));
      message.success("Employee deleted successfully");
    } catch (error) {
      message.error("Failed to delete employee");
    }
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingEmployee) {
        setEmployees(
          employees.map((employee) =>
            employee.id === editingEmployee.id
              ? { ...employee, ...values }
              : employee
          )
        );
        message.success("Employee updated successfully");
      } else {
        const newEmployee = {
          id: `550e8400-e29b-41d4-a716-${Date.now()}`,
          created_at: new Date().toISOString(),
          ...values,
        };
        setEmployees([...employees, newEmployee]);
        message.success("Employee added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
      render: (value) => Number(value).toLocaleString(),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position) => (
        <Tag color={positionColors[position] || "default"}>{position}</Tag>
      ),
      filters: positions.map((pos) => ({ text: pos, value: pos })),
      filterMultiple: true,
      onFilter: (value, record) => record.position === value,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sorter: (a, b) => a.rank.localeCompare(b.rank),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<span className="fa-solid fa-edit" />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<span className="fa-solid fa-trash" />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={`dark:text-white`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold dark:text-white`}>
          Employees Management
        </h1>
        <Button
          type="primary"
          icon={<span className="fa-solid fa-plus" />}
          onClick={handleAdd}
          className="bg-blue-600"
        >
          Add Employee
        </Button>
      </div>

      <div className="mb-6">
        <Search
          placeholder="Search employees..."
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredEmployees}
        loading={loading}
        rowKey="id"
        className={theme === "dark" && "dark-table"}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} employees`,
        }}
      />

      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: editingEmployee ? false : true,
                message: "Please input the password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: "Please input the salary!" }]}
          >
            <InputNumber
              min={0}
              className="w-full"
              formatter={(value) => Number(value).toLocaleString()}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please select the position!" }]}
          >
            <Select>
              {positions.map((position) => (
                <Select.Option key={position} value={position}>
                  {position}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="rank"
            label="Rank"
            rules={[{ required: true, message: "Please select the rank!" }]}
          >
            <Select>
              {ranks.map((rank) => (
                <Select.Option key={rank} value={rank}>
                  {rank}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesPage;
