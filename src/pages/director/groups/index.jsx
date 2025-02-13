import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  TimePicker,
  Space,
  message,
  Popconfirm,
  Typography,
  Tag,
} from "antd";
import { WeeklySchedule } from "../../../components";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

// Mock data for teachers and fields
const mockTeachers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Wilson" },
];

const mockFields = [
  { id: "1", name: "English" },
  { id: "2", name: "Mathematics" },
  { id: "3", name: "Japanese" },
];

// Mock initial groups data
const mockGroups = [
  {
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
    type: "offline",
  },
  // Add more mock groups as needed
];

const GroupManagement = () => {
  const [groups, setGroups] = useState(mockGroups);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Available days options
  const daysOptions = [
    { label: "Monday-Wednesday-Friday", value: "mon-wed-fri" },
    { label: "Tuesday-Thursday-Saturday", value: "tue-thu-sat" },
    { label: "Everyday", value: "everyday" },
    { label: "Monday", value: "mon" },
    { label: "Tuesday", value: "tue" },
    { label: "Wednesday", value: "wed" },
    { label: "Thursday", value: "thu" },
    { label: "Friday", value: "fri" },
    { label: "Saturday", value: "sat" },
    { label: "Sunday", value: "sun" },
  ];

  const showModal = (record = null) => {
    setEditingGroup(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        start_time: moment(record.start_time, "HH:mm"),
        end_time: moment(record.end_time, "HH:mm"),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingGroup(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Format times
      const formattedValues = {
        ...values,
        start_time: values.start_time.format("HH:mm"),
        end_time: values.end_time.format("HH:mm"),
      };

      if (editingGroup) {
        // Update existing group
        setGroups(
          groups.map((group) =>
            group.id === editingGroup.id
              ? { ...group, ...formattedValues }
              : group
          )
        );
        message.success("Group updated successfully");
      } else {
        // Add new group
        const newGroup = {
          ...formattedValues,
          id: Math.random().toString(36).substr(2, 9), // Temporary ID generation
          created_at: new Date().toISOString(),
        };
        setGroups([...groups, newGroup]);
        message.success("Group created successfully");
      }

      setIsModalVisible(false);
      setEditingGroup(null);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (record) => {
    setGroups(groups.filter((group) => group.id !== record.id));
    message.success("Group deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      render: (days) => {
        const option = daysOptions.find((opt) => opt.value === days);
        return <Tag color="blue">{option ? option.label : days}</Tag>;
      },
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => `${record.start_time} - ${record.end_time}`,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: "Teacher",
      key: "teacher",
      render: (_, record) => {
        const teacher = mockTeachers.find((t) => t.id === record.teacher_id);
        return teacher ? teacher.name : "N/A";
      },
    },
    {
      title: "Field",
      key: "field",
      render: (_, record) => {
        const field = mockFields.find((f) => f.id === record.field_id);
        return field ? field.name : "N/A";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<i className="fa-solid fa-edit" />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this group?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<i className="fa-solid fa-trash" />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <Title level={3}>Group Management</Title>
          <Button
            type="primary"
            icon={<i className="fa-solid fa-plus" />}
            onClick={() => showModal()}
          >
            Add New Group
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={groups}
          rowKey="id"
          scroll={{ x: true }}
        />

        <Modal
          title={editingGroup ? "Edit Group" : "Create New Group"}
          open={isModalVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          confirmLoading={loading}
          width={800}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Group Name"
              rules={[{ required: true, message: "Please enter group name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="days"
              label="Days"
              rules={[{ required: true, message: "Please select days" }]}
            >
              <Select options={daysOptions} />
            </Form.Item>

            <Space style={{ width: "100%" }} className="mb-4">
              <Form.Item
                name="start_time"
                label="Start Time"
                rules={[
                  { required: true, message: "Please select start time" },
                ]}
              >
                <TimePicker format="HH:mm" />
              </Form.Item>

              <Form.Item
                name="end_time"
                label="End Time"
                rules={[{ required: true, message: "Please select end time" }]}
              >
                <TimePicker format="HH:mm" />
              </Form.Item>
            </Space>

            <Form.Item
              name="level"
              label="Level"
              rules={[{ required: true, message: "Please enter level" }]}
            >
              <Select>
                {[1, 2, 3, 4, 5].map((level) => (
                  <Option key={level} value={level}>
                    Level {level}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="teacher_id"
              label="Teacher"
              rules={[{ required: true, message: "Please select teacher" }]}
            >
              <Select>
                {mockTeachers.map((teacher) => (
                  <Option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="support_teacher_id" label="Support Teacher">
              <Select allowClear>
                {mockTeachers.map((teacher) => (
                  <Option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="field_id"
              label="Field"
              rules={[{ required: true, message: "Please select field" }]}
            >
              <Select>
                {mockFields.map((field) => (
                  <Option key={field.id} value={field.id}>
                    {field.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>

      <WeeklySchedule groups={groups} />
    </div>
  );
};

export default GroupManagement;
