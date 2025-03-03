import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  InputNumber,
  Tag,
  Space,
  Popconfirm,
  Select,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Search } = Input;

// Mock data for groups
const mockGroups = [
  {
    id: "660e8400-e29b-41d4-a716-446655440000",
    name: "English Beginners",
    type: "offline",
    level: 1,
    days: "mon-wed-fri",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    name: "Math Advanced",
    type: "online",
    level: 3,
    days: "tue-thu",
  },
];

// Mock data for students
const mockStudents = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Alice Johnson",
    username: "alicej",
    phone: "+1234567890",
    parent_name: "Bob Johnson",
    parent_phone: "+1234567899",
    discount: 10,
    created_at: "2024-01-01",
    groups: [mockGroups[0]],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Charlie Brown",
    username: "charlieb",
    phone: "+1234567891",
    parent_name: "Diana Brown",
    parent_phone: "+1234567898",
    discount: 15,
    created_at: "2024-01-02",
    groups: [mockGroups[0], mockGroups[1]],
  },
];

const StudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudentForGroup, setSelectedStudentForGroup] = useState(null);
  const [form] = Form.useForm();
  const [groupForm] = Form.useForm();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    // Simulate API calls
    setLoading(true);
    setStudents(mockStudents);
    setGroups(mockGroups);
    setLoading(false);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.username.toLowerCase().includes(searchText.toLowerCase()) ||
      student.phone.includes(searchText) ||
      (student.parent_name &&
        student.parent_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.parent_phone && student.parent_phone.includes(searchText))
  );

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setStudents(students.filter((student) => student.id !== id));
      message.success("Student deleted successfully");
    } catch (error) {
      message.error("Failed to delete student");
    }
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingStudent) {
        setStudents(
          students.map((student) =>
            student.id === editingStudent.id
              ? { ...student, ...values }
              : student
          )
        );
        message.success("Student updated successfully");
      } else {
        const newStudent = {
          id: `550e8400-e29b-41d4-a716-${Date.now()}`,
          created_at: new Date().toISOString(),
          groups: [],
          ...values,
        };
        setStudents([...students, newStudent]);
        message.success("Student added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleAddToGroup = (student) => {
    setSelectedStudentForGroup(student);
    groupForm.resetFields();
    setIsGroupModalVisible(true);
  };

  const handleGroupModalOk = () => {
    groupForm.validateFields().then((values) => {
      const selectedGroups = groups.filter((group) =>
        values.groups.includes(group.id)
      );
      setStudents(
        students.map((student) =>
          student.id === selectedStudentForGroup.id
            ? { ...student, groups: selectedGroups }
            : student
        )
      );
      setIsGroupModalVisible(false);
      message.success("Student groups updated successfully");
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Parent Name",
      dataIndex: "parent_name",
      key: "parent_name",
    },
    {
      title: "Parent Phone",
      dataIndex: "parent_phone",
      key: "parent_phone",
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => (discount ? `${discount}%` : "-"),
    },
    {
      title: "Groups",
      key: "groups",
      render: (_, record) => (
        <Space wrap>
          {record.groups.map((group) => (
            <Tag
              color={group.type === "online" ? "blue" : "green"}
              key={group.id}
            >
              {group.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<span className="fa-solid fa-eye text-green-500" />}
            onClick={() => navigate(record.id)}
            title="See student"
          />
          <Button
            type="link"
            icon={<span className="fa-solid fa-edit" />}
            onClick={() => handleEdit(record)}
            title="Edit student"
          />
          <Button
            type="link"
            icon={<span className="fa-solid fa-user-plus" />}
            onClick={() => handleAddToGroup(record)}
            title="Edit student groups"
          />
          <Popconfirm
            title="Are you sure you want to delete this student?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<span className="fa-solid fa-trash" />}
              title="Delete student"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={`p-6 dark:text-white`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold dark:text-white`}>
          Students Management
        </h1>
        <Button
          type="primary"
          icon={<span className="fa-solid fa-plus" />}
          onClick={handleAdd}
          className="bg-blue-600"
        >
          Add Student
        </Button>
      </div>

      <div className="mb-6">
        <Search
          placeholder="Search students..."
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={filteredStudents}
        loading={loading}
        rowKey="id"
        className={theme === "dark" && "dark-table"}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} students`,
        }}
      />

      {/* Add/Edit Student Modal */}
      <Modal
        title={editingStudent ? "Edit Student" : "Add Student"}
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
                required: editingStudent ? false : true,
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
          <Form.Item name="parent_name" label="Parent Name">
            <Input />
          </Form.Item>
          <Form.Item name="parent_phone" label="Parent Phone">
            <Input />
          </Form.Item>
          <Form.Item name="discount" label="Discount (%)">
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add to Group Modal */}
      <Modal
        title="Manage Student Groups"
        open={isGroupModalVisible}
        onOk={handleGroupModalOk}
        onCancel={() => setIsGroupModalVisible(false)}
        destroyOnClose
      >
        <Form form={groupForm} layout="vertical">
          <Form.Item
            name="groups"
            label="Select Groups"
            initialValue={selectedStudentForGroup?.groups.map((g) => g.id)}
          >
            <Select
              mode="multiple"
              placeholder="Select groups"
              style={{ width: "100%" }}
            >
              {groups.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name} ({group.days})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentsPage;
