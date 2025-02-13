import React, { useState, useEffect } from "react";
import {
  Tag,
  Form,
  Input,
  Space,
  Table,
  Modal,
  Button,
  Select,
  message,
  Popconfirm,
} from "antd";
import { useSelector } from "react-redux";

const { Search } = Input;

// Mock data for fields
const fields = [
  { id: "1", name: "English" },
  { id: "2", name: "Mathematics" },
  { id: "3", name: "Japanese" },
  { id: "4", name: "Science" },
  { id: "5", name: "History" },
];

// Mock data for teachers
const mockTeachers = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Smith",
    username: "jsmith",
    phone: "+1234567890",
    field_id: "1",
    rank: "Senior",
    created_at: "2024-01-01",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Sarah Johnson",
    username: "sjohnson",
    phone: "+1234567891",
    field_id: "2",
    rank: "Lead",
    created_at: "2024-01-02",
  },
  // Add more mock teachers as needed
];

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTeachers(mockTeachers);
    setLoading(false);
  }, []);

  const handleAdd = () => {
    setEditingTeacher(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingTeacher(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    message.success("Teacher deleted successfully");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingTeacher) {
        // Update existing teacher
        setTeachers(
          teachers.map((teacher) =>
            teacher.id === editingTeacher.id
              ? { ...teacher, ...values }
              : teacher
          )
        );
        message.success("Teacher updated successfully");
      } else {
        // Add new teacher
        const newTeacher = {
          ...values,
          id: `teacher-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        setTeachers([...teachers, newTeacher]);
        message.success("Teacher added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchText.toLowerCase()) ||
      teacher.username.toLowerCase().includes(searchText.toLowerCase()) ||
      teacher.phone.includes(searchText)
  );

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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Field",
      dataIndex: "field_id",
      key: "field_id",
      render: (field_id) => {
        const field = fields.find((f) => f.id === field_id);
        return <Tag color="blue">{field?.name || "N/A"}</Tag>;
      },
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      filters: [
        { text: "Junior", value: "Junior" },
        { text: "Senior", value: "Senior" },
        { text: "Lead", value: "Lead" },
      ],
      onFilter: (value, record) => record.rank === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<span className="fa-solid fa-edit" />}
            onClick={() => handleEdit(record)}
            type="link"
          />
          <Popconfirm
            title="Are you sure you want to delete this teacher?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<span className="fa-solid fa-trash" />}
              type="link"
              danger
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
          Teachers Management
        </h1>
        <Button
          type="primary"
          icon={<span className="fa-solid fa-plus" />}
          onClick={handleAdd}
          className="bg-blue-600"
        >
          Add Teacher
        </Button>
      </div>

      <div className="mb-6">
        <Search
          placeholder="Search teachers..."
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredTeachers}
        rowKey="id"
        loading={loading}
        className={theme === "dark" && "dark-table"}
      />

      <Modal
        title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
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
                required: editingTeacher ? false : true,
                message: "Please input the password!",
              },
            ]}
          >
            <Input.Password />
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
            name="field_id"
            label="Field"
            rules={[{ required: true, message: "Please select the field!" }]}
          >
            <Select>
              {fields.map((field) => (
                <Select.Option key={field.id} value={field.id}>
                  {field.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="rank" label="Rank">
            <Select>
              <Select.Option value="Junior">Junior</Select.Option>
              <Select.Option value="Senior">Senior</Select.Option>
              <Select.Option value="Lead">Lead</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeachersPage;
