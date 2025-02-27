import React, { useState } from "react";
import {
  Layout,
  Typography,
  Tabs,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Card,
  Collapse,
  Radio,
  message,
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

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

// Mock data for students
const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    class: "Mathematics 101",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    class: "Chemistry 202",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    class: "Physics 303",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    class: "Literature 404",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    class: "Mathematics 101",
  },
];

// Mock data for assignments
const assignmentsData = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    description: "Solve the problems from Chapter 3, exercises 1-15",
    dueDate: "2025-03-05",
    class: "Mathematics 101",
    status: "Open",
    submissions: 3,
    maxScore: 100,
  },
  {
    id: 2,
    title: "Chemical Reactions Essay",
    description: "Write a 500-word essay on types of chemical reactions",
    dueDate: "2025-03-10",
    class: "Chemistry 202",
    status: "Open",
    submissions: 1,
    maxScore: 50,
  },
  {
    id: 3,
    title: "Newton's Laws Practice",
    description: "Complete the practice problems on Newton's laws of motion",
    dueDate: "2025-03-02",
    class: "Physics 303",
    status: "Closed",
    submissions: 5,
    maxScore: 75,
  },
  {
    id: 4,
    title: "Shakespeare Analysis",
    description: "Analyze the character development in Hamlet",
    dueDate: "2025-03-15",
    class: "Literature 404",
    status: "Open",
    submissions: 0,
    maxScore: 100,
  },
];

// Mock submission data
const submissionsData = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 1,
    studentName: "John Doe",
    submissionDate: "2025-03-01",
    status: "Submitted",
    fileUrl: "homework1_john.pdf",
    score: null,
    feedback: "",
  },
  {
    id: 2,
    assignmentId: 1,
    studentId: 5,
    studentName: "Charlie Brown",
    submissionDate: "2025-03-02",
    status: "Graded",
    fileUrl: "homework1_charlie.pdf",
    score: 85,
    feedback: "Good work, but you need to show your calculations more clearly.",
  },
  {
    id: 3,
    assignmentId: 2,
    studentId: 2,
    studentName: "Jane Smith",
    submissionDate: "2025-03-03",
    status: "Submitted",
    fileUrl: "essay_jane.docx",
    score: null,
    feedback: "",
  },
  {
    id: 4,
    assignmentId: 3,
    studentId: 3,
    studentName: "Bob Johnson",
    submissionDate: "2025-02-28",
    status: "Graded",
    fileUrl: "newton_bob.pdf",
    score: 72,
    feedback:
      "Good understanding of the concepts, but there are calculation errors in problems 3 and 7.",
  },
  {
    id: 5,
    assignmentId: 1,
    studentId: 3,
    studentName: "Bob Johnson",
    submissionDate: "2025-03-01",
    status: "Graded",
    fileUrl: "algebra_bob.pdf",
    score: 90,
    feedback: "Excellent work! All solutions are correct and well explained.",
  },
];

// Performance chart data
const performanceData = [
  { name: "Jan", avgScore: 78 },
  { name: "Feb", avgScore: 82 },
  { name: "Mar", avgScore: 85 },
  { name: "Apr", avgScore: 79 },
  { name: "May", avgScore: 88 },
  { name: "Jun", avgScore: 84 },
];

const HomeworkAssignmentsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [form] = Form.useForm();
  const [feedbackForm] = Form.useForm();

  // Function to handle showing the assignment creation modal
  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle view submission modal
  const showViewModal = (submission) => {
    setSelectedSubmission(submission);
    setIsViewModalVisible(true);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
  };

  // Function to show feedback modal
  const showFeedbackModal = (submission) => {
    setSelectedSubmission(submission);
    feedbackForm.setFieldsValue({
      score: submission.score || "",
      feedback: submission.feedback || "",
    });
    setIsFeedbackModalVisible(true);
  };

  const handleFeedbackCancel = () => {
    setIsFeedbackModalVisible(false);
  };

  // Function to handle form submission for new assignment
  const handleFormSubmit = (values) => {
    console.log("New Assignment Values:", values);
    message.success("Assignment created successfully!");
    setIsModalVisible(false);
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = (values) => {
    console.log("Feedback Submitted:", {
      submissionId: selectedSubmission.id,
      ...values,
    });
    message.success("Feedback provided successfully!");
    setIsFeedbackModalVisible(false);
  };

  // Column definitions for assignments table
  const assignmentsColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => moment(text).format("MMM DD, YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Open" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Submissions",
      dataIndex: "submissions",
      key: "submissions",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setSelectedAssignment(record);
              const filteredSubmissions = submissionsData.filter(
                (submission) => submission.assignmentId === record.id
              );
              console.log(
                "Viewing submissions for:",
                record.title,
                filteredSubmissions
              );
            }}
          >
            <span>
              <i className="fas fa-eye"></i> View Submissions
            </span>
          </Button>
          <Button
            size="small"
            onClick={() => {
              console.log("Editing assignment:", record);
            }}
          >
            <span>
              <i className="fas fa-edit"></i> Edit
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  // Column definitions for submissions table
  const submissionsColumns = [
    {
      title: "Student",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate",
      render: (text) => moment(text).format("MMM DD, YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Submitted" ? "blue" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score) => (score ? `${score}%` : "Not graded"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => showViewModal(record)}
          >
            <span>
              <i className="fas fa-file-alt"></i> View
            </span>
          </Button>
          <Button size="small" onClick={() => showFeedbackModal(record)}>
            <span>
              <i className="fas fa-comment"></i> Provide Feedback
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
        Homework and Assignments
      </h1>
      <div style={{ padding: "16px", overflow: "auto" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Manage Assignments" key="1">
            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button type="primary" onClick={showModal}>
                <span>
                  <i className="fas fa-plus"></i> Create New Assignment
                </span>
              </Button>
              <Select
                placeholder="Filter by Class"
                style={{ width: 200 }}
                allowClear
              >
                <Option value="Mathematics 101">Mathematics 101</Option>
                <Option value="Chemistry 202">Chemistry 202</Option>
                <Option value="Physics 303">Physics 303</Option>
                <Option value="Literature 404">Literature 404</Option>
              </Select>
            </div>
            <Table
              dataSource={assignmentsData}
              columns={assignmentsColumns}
              rowKey="id"
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>
                    <strong>Description:</strong> {record.description}
                  </p>
                ),
              }}
            />
          </TabPane>
          <TabPane tab="Review Submissions" key="2">
            {selectedAssignment ? (
              <>
                <div style={{ marginBottom: "16px" }}>
                  <Card>
                    <Title level={4}>{selectedAssignment.title}</Title>
                    <Text>{selectedAssignment.description}</Text>
                    <div style={{ marginTop: "8px" }}>
                      <Tag color="blue">Class: {selectedAssignment.class}</Tag>
                      <Tag color="orange">
                        Due:{" "}
                        {moment(selectedAssignment.dueDate).format(
                          "MMM DD, YYYY"
                        )}
                      </Tag>
                      <Tag color="purple">
                        Max Score: {selectedAssignment.maxScore}
                      </Tag>
                    </div>
                  </Card>
                </div>
                <Table
                  dataSource={submissionsData.filter(
                    (submission) =>
                      submission.assignmentId === selectedAssignment.id
                  )}
                  columns={submissionsColumns}
                  rowKey="id"
                />
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <Text>Please select an assignment to view submissions</Text>
              </div>
            )}
          </TabPane>
          <TabPane tab="Performance Analytics" key="3">
            <Card
              title="Assignment Performance Over Time"
              style={{ marginBottom: "16px" }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <div style={{ display: "flex", gap: "16px" }}>
              <Card style={{ flex: 1 }}>
                <Statistic
                  title="Total Assignments"
                  value={assignmentsData.length}
                />
              </Card>
              <Card style={{ flex: 1 }}>
                <Statistic
                  title="Total Submissions"
                  value={submissionsData.length}
                />
              </Card>
              <Card style={{ flex: 1 }}>
                <Statistic
                  title="Average Score"
                  value={Math.round(
                    submissionsData
                      .filter((sub) => sub.score !== null)
                      .reduce((acc, sub) => acc + sub.score, 0) /
                      submissionsData.filter((sub) => sub.score !== null).length
                  )}
                  suffix="%"
                />
              </Card>
            </div>
          </TabPane>
        </Tabs>

        {/* Modal for creating new assignment */}
        <Modal
          title="Create New Assignment"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="title"
              label="Assignment Title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input placeholder="Enter assignment title" />
            </Form.Item>
            <Form.Item
              name="class"
              label="Class"
              rules={[{ required: true, message: "Please select a class" }]}
            >
              <Select placeholder="Select a class">
                <Option value="Mathematics 101">Mathematics 101</Option>
                <Option value="Chemistry 202">Chemistry 202</Option>
                <Option value="Physics 303">Physics 303</Option>
                <Option value="Literature 404">Literature 404</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <TextArea rows={4} placeholder="Enter assignment description" />
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: "Please select a due date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="maxScore"
              label="Maximum Score"
              rules={[
                { required: true, message: "Please enter the maximum score" },
              ]}
            >
              <Input type="number" placeholder="Enter maximum score" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Create Assignment
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for viewing submission */}
        <Modal
          title="View Submission"
          visible={isViewModalVisible}
          onCancel={handleViewCancel}
          footer={[
            <Button key="close" onClick={handleViewCancel}>
              Close
            </Button>,
            <Button
              key="feedback"
              type="primary"
              onClick={() => {
                handleViewCancel();
                showFeedbackModal(selectedSubmission);
              }}
            >
              Provide Feedback
            </Button>,
          ]}
          width={700}
        >
          {selectedSubmission && (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <p>
                  <strong>Student:</strong> {selectedSubmission.studentName}
                </p>
                <p>
                  <strong>Submitted:</strong>{" "}
                  {moment(selectedSubmission.submissionDate).format(
                    "MMMM DD, YYYY"
                  )}
                </p>
                <p>
                  <strong>File:</strong>{" "}
                  <a href="#">{selectedSubmission.fileUrl}</a>
                </p>
              </div>

              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Submission Preview" key="1">
                  <div
                    style={{
                      border: "1px solid #eee",
                      padding: "16px",
                      minHeight: "200px",
                    }}
                  >
                    <Text type="secondary">
                      [Document preview would appear here in the actual
                      implementation]
                    </Text>
                  </div>
                </Panel>
                {selectedSubmission.status === "Graded" && (
                  <Panel header="Feedback" key="2">
                    <p>
                      <strong>Score:</strong> {selectedSubmission.score}%
                    </p>
                    <p>
                      <strong>Feedback:</strong> {selectedSubmission.feedback}
                    </p>
                  </Panel>
                )}
              </Collapse>
            </div>
          )}
        </Modal>

        {/* Modal for providing feedback */}
        <Modal
          title="Provide Feedback"
          visible={isFeedbackModalVisible}
          onCancel={handleFeedbackCancel}
          footer={null}
        >
          {selectedSubmission && (
            <Form
              form={feedbackForm}
              layout="vertical"
              onFinish={handleFeedbackSubmit}
            >
              <Form.Item
                name="score"
                label="Score"
                rules={[{ required: true, message: "Please enter a score" }]}
              >
                <Input
                  type="number"
                  placeholder="Enter score"
                  suffix={
                    selectedAssignment
                      ? `/ ${
                          assignmentsData.find(
                            (a) => a.id === selectedSubmission.assignmentId
                          )?.maxScore
                        }`
                      : ""
                  }
                />
              </Form.Item>
              <Form.Item
                name="feedback"
                label="Feedback"
                rules={[{ required: true, message: "Please provide feedback" }]}
              >
                <TextArea rows={4} placeholder="Enter your feedback" />
              </Form.Item>
              <Form.Item>
                <Radio.Group
                  defaultValue="individual"
                  style={{ marginBottom: "16px" }}
                >
                  <Radio value="individual">Individual Feedback</Radio>
                  <Radio value="common">Common Feedback</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Submit Feedback
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </div>
  );
};

// This component is missing from the code above but referenced in it
const Statistic = ({ title, value, suffix = "" }) => {
  return (
    <div>
      <div style={{ fontSize: "14px", color: "#8c8c8c" }}>{title}</div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {value}
        {suffix}
      </div>
    </div>
  );
};

export default HomeworkAssignmentsPage;
