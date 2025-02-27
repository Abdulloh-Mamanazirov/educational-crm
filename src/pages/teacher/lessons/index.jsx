import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Upload,
  Form,
  Input,
  Select,
  DatePicker,
  Progress,
  Tabs,
  List,
  Tag,
  Typography,
  Divider,
  message,
  Modal,
} from "antd";
import {
  FileAddOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const LessonPlanningPage = () => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  // Mock data loading
  useEffect(() => {
    // Simulate API call to fetch groups
    setTimeout(() => {
      const mockGroups = [
        {
          id: "1",
          name: "Advanced English",
          level: 3,
          days: "Monday, Wednesday",
          progress: 65,
        },
        {
          id: "2",
          name: "Beginner Math",
          level: 1,
          days: "Tuesday, Thursday",
          progress: 42,
        },
        {
          id: "3",
          name: "Intermediate Physics",
          level: 2,
          days: "Friday, Saturday",
          progress: 78,
        },
      ];

      const mockLessonPlans = [
        {
          id: "1",
          groupId: "1",
          title: "Advanced Grammar: Conditionals",
          description:
            "Detailed lesson on conditional sentences and their usage",
          startDate: "2024-02-20",
          endDate: "2024-02-22",
          status: "completed",
          materials: ["Grammar Worksheet", "Practice Exercises"],
          attachments: ["conditionals.pdf", "exercises.docx"],
          objectives: [
            "Understand types of conditionals",
            "Practice using conditionals correctly",
          ],
          syllabusProgress: 32,
        },
        {
          id: "2",
          groupId: "1",
          title: "Essay Writing: Argumentative Essays",
          description: "Introduction to writing effective argumentative essays",
          startDate: "2024-02-25",
          endDate: "2024-03-01",
          status: "in-progress",
          materials: ["Essay Structure Guide", "Example Essays"],
          attachments: ["essay_guide.pdf"],
          objectives: [
            "Learn essay structure",
            "Practice thesis statements",
            "Draft an argumentative essay",
          ],
          syllabusProgress: 45,
        },
        {
          id: "3",
          groupId: "2",
          title: "Basic Addition and Subtraction",
          description: "Foundations of arithmetic operations",
          startDate: "2024-02-15",
          endDate: "2024-02-20",
          status: "completed",
          materials: ["Number Line", "Counting Blocks"],
          attachments: ["worksheets.pdf"],
          objectives: [
            "Master basic addition",
            "Understand subtraction concept",
          ],
          syllabusProgress: 20,
        },
      ];

      setGroups(mockGroups);
      setLessonPlans(mockLessonPlans);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle group selection
  const handleGroupSelect = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    setSelectedGroup(group);
  };

  // Filter lesson plans by group
  const filteredLessonPlans = selectedGroup
    ? lessonPlans.filter((plan) => plan.groupId === selectedGroup.id)
    : lessonPlans;

  // Handle lesson plan creation or editing
  const showLessonModal = (lesson = null) => {
    setEditingLesson(lesson);
    setIsModalVisible(true);

    if (lesson) {
      // Pre-fill form for editing
      form.setFieldsValue({
        title: lesson.title,
        description: lesson.description,
        dateRange: [moment(lesson.startDate), moment(lesson.endDate)],
        status: lesson.status,
        objectives: lesson.objectives.join("\n"),
        materials: lesson.materials.join("\n"),
        groupId: lesson.groupId,
        syllabusProgress: lesson.syllabusProgress,
      });

      // Mock file list for editing
      setFileList(
        lesson.attachments.map((file, index) => ({
          uid: -index,
          name: file,
          status: "done",
          url: `https://mock-url/${file}`,
        }))
      );
    } else {
      // Reset form for new lesson
      form.resetFields();
      if (selectedGroup) {
        form.setFieldsValue({ groupId: selectedGroup.id });
      }
      setFileList([]);
    }
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      startDate: values.dateRange[0].format("YYYY-MM-DD"),
      endDate: values.dateRange[1].format("YYYY-MM-DD"),
      objectives: values.objectives.split("\n").filter((item) => item.trim()),
      materials: values.materials.split("\n").filter((item) => item.trim()),
      attachments: fileList.map((file) => file.name),
    };

    // Remove the dateRange property as we have extracted start and end dates
    delete formData.dateRange;

    console.log("Submitting lesson plan:", formData);

    // Here you would make an API call to save the lesson plan
    message.success(
      `${editingLesson ? "Updated" : "Created"} lesson plan: ${values.title}`
    );

    setIsModalVisible(false);
  };

  // Handle file upload
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Handle lesson plan deletion
  const handleDeleteLesson = (lessonId) => {
    console.log("Deleting lesson plan:", lessonId);
    // Here you would make an API call to delete the lesson plan
    message.success("Lesson plan deleted");
  };

  // Table columns for lesson plans
  const lessonColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date Range",
      key: "dates",
      render: (_, record) => (
        <span>
          <CalendarOutlined /> {record.startDate} to {record.endDate}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "completed"
            ? "green"
            : status === "in-progress"
            ? "blue"
            : "orange";
        return <Tag color={color}>{status.replace("-", " ")}</Tag>;
      },
    },
    {
      title: "Syllabus Progress",
      dataIndex: "syllabusProgress",
      key: "syllabusProgress",
      render: (progress) => <Progress percent={progress} size="small" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => showLessonModal(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteLesson(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
        Lesson Plans
      </h1>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Select
            placeholder="Select a group"
            style={{ width: 200 }}
            onChange={handleGroupSelect}
            value={selectedGroup?.id}
          >
            {groups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.name} (Level {group.level})
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => showLessonModal()}
            disabled={!selectedGroup}
          >
            New Lesson Plan
          </Button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            Loading lesson plans...
          </div>
        ) : selectedGroup ? (
          <Tabs className="overflow-auto" defaultActiveKey="1">
            <TabPane tab="Lesson Plans" key="1">
              <div style={{ marginBottom: 16 }}>
                <Text>Group Progress: </Text>
                <Progress percent={selectedGroup.progress} />
              </div>
              <Table
                dataSource={filteredLessonPlans}
                columns={lessonColumns}
                rowKey="id"
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Syllabus Overview" key="2">
              <List
                itemLayout="horizontal"
                dataSource={filteredLessonPlans.sort((a, b) =>
                  a.startDate.localeCompare(b.startDate)
                )}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<FileTextOutlined style={{ fontSize: 24 }} />}
                      title={<Text strong>{item.title}</Text>}
                      description={
                        <Space direction="vertical">
                          <Text>{item.description}</Text>
                          <Space>
                            <Tag color="blue">
                              {item.startDate} to {item.endDate}
                            </Tag>
                            <Tag
                              color={
                                item.status === "completed" ? "green" : "orange"
                              }
                            >
                              {item.status.replace("-", " ")}
                            </Tag>
                          </Space>
                          <Text>Objectives:</Text>
                          <ul>
                            {item.objectives.map((obj, index) => (
                              <li key={index}>{obj}</li>
                            ))}
                          </ul>
                        </Space>
                      }
                    />
                    <Space>
                      {item.status === "completed" ? (
                        <CheckOutlined
                          style={{ color: "green", fontSize: 20 }}
                        />
                      ) : (
                        <Progress
                          type="circle"
                          percent={item.syllabusProgress}
                          width={40}
                        />
                      )}
                    </Space>
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        ) : (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Title level={4}>
              Please select a group to view or create lesson plans
            </Title>
          </div>
        )}
      </div>

      {/* Create/Edit Lesson Plan Modal */}
      <Modal
        title={<span>{editingLesson ? "Edit" : "Create"} Lesson Plan</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="groupId"
            label="Group"
            rules={[{ required: true, message: "Please select a group" }]}
          >
            <Select disabled={!!editingLesson}>
              {groups.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Lesson Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter lesson title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter lesson description" />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Date Range"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
            initialValue="planned"
          >
            <Select>
              <Option value="planned">Planned</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="objectives"
            label="Learning Objectives"
            help="Enter one objective per line"
          >
            <TextArea
              rows={4}
              placeholder="Enter learning objectives (one per line)"
            />
          </Form.Item>

          <Form.Item
            name="materials"
            label="Materials Needed"
            help="Enter one item per line"
          >
            <TextArea
              rows={3}
              placeholder="Enter required materials (one per line)"
            />
          </Form.Item>

          <Form.Item
            name="syllabusProgress"
            label="Syllabus Progress (%)"
            rules={[
              { required: true, message: "Please enter progress percentage" },
            ]}
            initialValue={0}
          >
            <Input type="number" min={0} max={100} />
          </Form.Item>

          <Form.Item label="Attachments">
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false} // Prevent auto upload
            >
              <Button icon={<UploadOutlined />}>Upload Files</Button>
            </Upload>
          </Form.Item>

          <Divider />

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingLesson ? "Update" : "Create"} Lesson Plan
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LessonPlanningPage;
