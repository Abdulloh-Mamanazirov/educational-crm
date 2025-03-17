import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Tag,
  Space,
  Upload,
  Tabs,
  Checkbox,
} from "antd";
import { PushpinOutlined, PushpinFilled } from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// Mock data
const mockAnnouncements = [
  {
    id: "1",
    title: "End of Semester Exams",
    content: "Final exams will be held from March 15th to March 30th.",
    type: "ACADEMIC",
    target_audience: "ALL",
    start_date: "2025-02-19T00:00:00",
    end_date: "2025-03-30T00:00:00",
    created_by: "1",
    is_pinned: true,
    created_at: "2025-02-19T10:00:00",
  },
  {
    id: "2",
    title: "Teacher Training Workshop",
    content: "Mandatory training session for all teaching staff.",
    type: "EVENT",
    target_audience: "TEACHERS",
    start_date: "2025-02-25T00:00:00",
    end_date: null,
    created_by: "1",
    is_pinned: false,
    created_at: "2025-02-19T11:00:00",
  },
];

const mockReads = [
  {
    id: "1",
    announcement_id: "1",
    user_id: "1",
    read_at: "2025-02-19T10:30:00",
  },
];

const ANNOUNCEMENT_TYPES = [
  { label: "General", value: "GENERAL", color: "blue" },
  { label: "Academic", value: "ACADEMIC", color: "green" },
  { label: "Event", value: "EVENT", color: "purple" },
  { label: "Urgent", value: "URGENT", color: "red" },
];

const TARGET_AUDIENCES = [
  { label: "All", value: "ALL" },
  { label: "Students", value: "STUDENTS" },
  { label: "Teachers", value: "TEACHERS" },
  { label: "Staff", value: "STAFF" },
];

const AnnouncementsManagement = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("all");
  const [fileList, setFileList] = useState([]);

  const filterAnnouncements = () => {
    let filtered = [...announcements];

    // Sort by pinned first, then by date
    filtered.sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) return b.is_pinned - a.is_pinned;
      return moment(b.created_at).diff(moment(a.created_at));
    });

    // Filter based on active tab
    if (activeTab !== "all") {
      filtered = filtered.filter((a) => a.type === activeTab.toUpperCase());
    }

    return filtered;
  };

  const handleSave = (values) => {
    const announcementData = {
      id: editingAnnouncement
        ? editingAnnouncement.id
        : Math.random().toString(36).substr(2, 9),
      ...values,
      start_date: values.dates[0].format(),
      end_date: values.dates[1]?.format() || null,
      created_by: "1", // Replace with actual user ID
      created_at: moment().format(),
      attachment_url: fileList[0]?.response?.url || null,
    };

    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id ? announcementData : a
        )
      );
      message.success("Announcement updated successfully");
    } else {
      setAnnouncements([...announcements, announcementData]);
      message.success("Announcement created successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
    setEditingAnnouncement(null);
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    message.success("Announcement deleted successfully");
  };

  const togglePin = (id) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, is_pinned: !a.is_pinned } : a
      )
    );
  };

  const uploadProps = {
    listType: "text",
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess({ url: "https://example.com/file.pdf" });
      }, 1000);
    },
    maxCount: 1,
  };

  const renderAnnouncement = (announcement) => (
    <Card
      key={announcement.id}
      className="mb-4 dark:bg-gray-800 dark:text-white"
      extra={
        <Space>
          <Button
            type="text"
            onClick={() => togglePin(announcement.id)}
            icon={
              announcement.is_pinned ? (
                <span className="fa-solid fa-thumbtack-slash dark:text-white" />
              ) : (
                <span className="fa-solid fa-thumbtack text-slate-500 rotate-45" />
              )
            }
          />
          <Button
            type="text"
            onClick={() => {
              setEditingAnnouncement(announcement);
              form.setFieldsValue({
                ...announcement,
                dates: [
                  moment(announcement.start_date),
                  announcement.end_date ? moment(announcement.end_date) : null,
                ],
              });
              setIsModalVisible(true);
            }}
          >
            <span className="fa-solid fa-edit dark:text-white" />
          </Button>
          <Button
            type="text"
            danger
            onClick={() => handleDelete(announcement.id)}
          >
            <span className="fa-solid fa-trash" />
          </Button>
        </Space>
      }
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold m-0">{announcement.title}</h3>
            <Tag
              color={
                ANNOUNCEMENT_TYPES.find((t) => t.value === announcement.type)
                  ?.color
              }
            >
              {announcement.type}
            </Tag>
            <Tag>
              {
                TARGET_AUDIENCES.find(
                  (t) => t.value === announcement.target_audience
                )?.label
              }
            </Tag>
          </div>
          <p className="whitespace-pre-line">{announcement.content}</p>
          {announcement.attachment_url && (
            <a href={announcement.attachment_url} className="text-blue-500">
              <span className="fa fa-paperclip mr-2" />
              Attachment
            </a>
          )}
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-4">
        Posted: {moment(announcement.created_at).format("MMMM D, YYYY")}
        {announcement.end_date &&
          ` • Expires: ${moment(announcement.end_date).format("MMMM D, YYYY")}`}
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements & Notices</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingAnnouncement(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          <span className="fa fa-plus mr-2" />
          New Announcement
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            label: <span className="dark:text-white">All Announcements</span>,
            key: "all",
          },
          ...ANNOUNCEMENT_TYPES.map((type) => ({
            label: <span className="dark:text-white">{type.label}</span>,
            key: type.value.toLowerCase(),
          })),
        ]}
        className="mb-6"
      />

      <div>{filterAnnouncements().map(renderAnnouncement)}</div>

      <Modal
        title={editingAnnouncement ? "Edit Announcement" : "New Announcement"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingAnnouncement(null);
          form.resetFields();
          setFileList([]);
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter the content!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please select the type!" }]}
            >
              <Select>
                {ANNOUNCEMENT_TYPES.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="target_audience"
              label="Target Audience"
              rules={[
                {
                  required: true,
                  message: "Please select the target audience!",
                },
              ]}
            >
              <Select>
                {TARGET_AUDIENCES.map((audience) => (
                  <Option key={audience.value} value={audience.value}>
                    {audience.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="dates"
            label="Display Period"
            rules={[
              { required: true, message: "Please select the display period!" },
            ]}
          >
            <RangePicker
              className="w-full"
              showTime
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item name="attachment" label="Attachment">
            <Upload {...uploadProps}>
              <Button icon={<span className="fa-solid fa-upload" />}>
                Upload File
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="is_pinned" valuePropName="checked">
            <Checkbox>Pin this announcement</Checkbox>
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingAnnouncement(null);
                  form.resetFields();
                  setFileList([]);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingAnnouncement ? "Update" : "Publish"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AnnouncementsManagement;
