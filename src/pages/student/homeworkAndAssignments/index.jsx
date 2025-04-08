import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  List,
  Row,
  Col,
  Typography,
  Tag,
  Upload,
  Button,
  message, // For upload feedback
  Alert,
  Tooltip,
  Space,
  Divider,
  Empty,
  Progress,
  Select,
} from "antd";

// --- Mock Data for Assignments ---
const mockAssignments = [
  {
    id: "hw1",
    title: "Algebra Ch. 3 Problems",
    description:
      "Solve exercises 1-15 from the textbook. Show your work clearly.",
    dueDate: "2025-04-10",
    courseName: "Mathematics 101",
    status: "Pending",
    maxScore: 100,
    studentSubmission: null,
    grade: null,
    feedback: null,
  },
  {
    id: "hw2",
    title: "Hamlet Essay Analysis",
    description:
      "Write a 500-word analysis of Hamlet's 'To be or not to be' soliloquy.",
    dueDate: "2025-04-04",
    courseName: "Advanced English",
    status: "Submitted", 
    maxScore: 50,
    studentSubmission: {
      fileName: "hamlet_soliloquy_analysis_final.docx",
      submittedDate: "2025-04-03T10:30:00Z",
      url: "#",
    },
    grade: null,
    feedback: null,
  },
  {
    id: "hw3",
    title: "Physics Lab Report: Optics",
    description:
      "Submit your full lab report including data, analysis, and conclusion.",
    dueDate: "2025-04-08",
    courseName: "Intermediate Physics",
    status: "Graded", 
    maxScore: 100,
    studentSubmission: {
      fileName: "physics_lab_optics_report.pdf",
      submittedDate: "2025-04-07T15:00:00Z",
      url: "#",
    },
    grade: 92,
    feedback:
      "Excellent data presentation and very clear conclusions drawn from the results. Minor formatting issues in the bibliography.",
  },
  {
    id: "hw4",
    title: "Art History Reading Response",
    description:
      "Write a one-page response to the assigned reading on Renaissance painters.",
    dueDate: "2025-03-25", 
    courseName: "Art History",
    status: "Overdue", 
    maxScore: 20,
    studentSubmission: null,
    grade: null,
    feedback: null,
  },
  {
    id: "hw5",
    title: "Calculus Derivatives Worksheet",
    description: "Complete all problems on the provided worksheet.",
    dueDate: "2025-04-15", 
    courseName: "Mathematics 101",
    status: "Pending",
    maxScore: 100,
    studentSubmission: null,
    grade: null,
    feedback: null,
  },
];
// --- End Mock Data ---

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const StudentAssignmentsPage = () => {
  const [filter, setFilter] = useState("all");

  // Helper to determine Tag color and text based on status and due date
  const getStatusTag = (status, dueDate) => {
    const isPastDue = moment(dueDate).isBefore(moment(), "day");
    let color = "default";
    let text = status;
    let icon = null;

    switch (status) {
      case "Pending":
        color = isPastDue ? "orange" : "processing";
        text = isPastDue ? "Pending (Overdue)" : "Pending";
        icon = <i className="far fa-clock mr-1"></i>;
        break;
      case "Submitted":
        color = "blue";
        icon = <i className="fas fa-paper-plane mr-1"></i>;
        break;
      case "Graded":
        color = "success";
        icon = <i className="fas fa-check-double mr-1"></i>;
        break;
      case "Overdue":
        color = "error";
        icon = <i className="fas fa-exclamation-triangle mr-1"></i>;
        break;
      default:
        color = "default";
    }
    return (
      <Tag color={color} icon={icon} className="font-medium">
        {text}
      </Tag>
    );
  };

  // --- Upload Handler (Simulation) ---
  // In a real app, this would interact with state and your backend API
  const handleUploadChange = (info, assignmentId) => {
    const { status } = info.file;
    if (status === "uploading") {
      // Optional: Provide feedback during upload
      // console.log(`Uploading ${info.file.name} for assignment ${assignmentId}...`);
    }
    if (status === "done") {
      message.success(
        `${info.file.name} file uploaded successfully (Simulation). Status would update.`
      );
      // **REAL APP:** Here you would likely:
      // 1. Get the file URL/ID from info.file.response (from your backend)
      // 2. Update the application state: Find the assignment by assignmentId
      //    and update its status to 'Submitted' and add studentSubmission details.
      // 3. Potentially call another API to confirm submission.
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed (Simulation).`);
      // **REAL APP:** Handle upload errors.
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-5 flex-wrap justify-between">
        <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
          Homework and Assignments
        </h1>

        <Select
          defaultValue={"all"}
          onSelect={(value) => setFilter(value)}
          className="w-36"
        >
          <Select.Option value="all">All Assignments</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Submitted">Submitted</Select.Option>
          <Select.Option value="Graded">Graded</Select.Option>
          <Select.Option value="Overdue">Overdue</Select.Option>
        </Select>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} // Ensures list items take full width
        dataSource={mockAssignments.filter((i) =>
          filter === "all" ? i : i.status === filter
        )}
        renderItem={(item) => {
          const isPastDue = moment(item.dueDate).isBefore(moment(), "day");
          const canSubmit = item.status === "Pending"; // || (item.status === 'Overdue' && allowLateSubmissions);

          // Props for the Upload component
          const uploadProps = {
            name: "file", // Field name for the file in the request
            multiple: false, // Allow only single file upload
            action: "/api/dummy/upload", // **IMPORTANT: Replace with your ACTUAL backend upload endpoint**
            onChange: (info) => handleUploadChange(info, item.id),
            // beforeUpload: (file) => { /* Optional: Add file type/size validation */ },
            disabled: !canSubmit, // Disable if not pending submission
          };

          return (
            <List.Item key={item.id} className="!mb-4">
              <Card
                bordered={false}
                className="shadow-md dark:bg-gray-800 dark:border-gray-700 w-full"
                title={
                  <span className="dark:text-white font-semibold">
                    {item.title}
                  </span>
                }
                extra={getStatusTag(item.status, item.dueDate)}
              >
                <Row gutter={[16, 16]}>
                  {/* Column 1: Details */}
                  <Col xs={24} md={12} lg={14}>
                    <Paragraph className="dark:text-gray-300">
                      {item.description}
                    </Paragraph>
                    <Space direction="vertical" size="small">
                      <p type="secondary" className="dark:text-gray-400">
                        <i className="fas fa-chalkboard mr-2"></i> Course:{" "}
                        {item.courseName}
                      </p>
                      <Tooltip
                        title={`Due: ${moment(item.dueDate).format(
                          "dddd, MMMM D, YYYY"
                        )}`}
                      >
                        <p
                          className={
                            isPastDue &&
                            item.status !== "Submitted" &&
                            item.status !== "Graded"
                              ? "text-red-500 dark:text-red-400 font-medium"
                              : "dark:text-gray-400"
                          }
                        >
                          <i className="fas fa-calendar-day mr-2"></i> Due Date:{" "}
                          {moment(item.dueDate).format("YYYY-MM-DD")} (
                          {moment(item.dueDate).fromNow()})
                        </p>
                      </Tooltip>
                      <p type="secondary" className="dark:text-gray-400">
                        <i className="fas fa-star-half-alt mr-2"></i> Max Score:{" "}
                        {item.maxScore}
                      </p>
                    </Space>

                    {/* --- Graded Feedback Section --- */}
                    {item.status === "Graded" && item.grade !== null && (
                      <>
                        <Divider className="my-3 dark:border-gray-600" />
                        <h3
                          level={5}
                          className="text-md mb-2 dark:text-gray-200"
                        >
                          Grade & Feedback
                        </h3>
                        <div className="flex items-center mb-2">
                          <Progress
                            type="circle"
                            percent={Math.round(
                              (item.grade / item.maxScore) * 100
                            )}
                            width={50}
                            format={() => (
                              <span className="font-bold text-sm dark:text-white">
                                {item.grade}
                              </span>
                            )}
                            className="mr-3"
                            strokeColor={
                              item.grade / item.maxScore >= 0.8
                                ? "#87d068"
                                : item.grade / item.maxScore >= 0.6
                                ? "#108ee9"
                                : "#ff4d4f"
                            }
                          />
                          <Text strong className="text-lg dark:text-white">
                            {item.grade} / {item.maxScore}
                          </Text>
                        </div>
                        {item.feedback && (
                          <Alert
                            message={
                              <span className="font-semibold dark:text-gray-800">
                                Teacher Feedback
                              </span>
                            }
                            description={
                              <span className="dark:text-gray-700">
                                {item.feedback}
                              </span>
                            }
                            type="info"
                            showIcon
                            className="p-5 bg-blue-50 dark:bg-blue-100 border-blue-200"
                          />
                        )}
                      </>
                    )}
                  </Col>

                  {/* Column 2: Submission Area */}
                  <Col xs={24} md={12} lg={10}>
                    <Divider className="md:hidden my-3 dark:border-gray-600" />{" "}
                    {/* Divider for mobile */}
                    {/* --- Submission Status / Upload Section --- */}
                    {item.status === "Pending" || item.status === "Overdue" ? (
                      <div>
                        <h3 className="text-md mb-2 dark:text-gray-200">
                          Submit Your Work
                        </h3>
                        <Dragger
                          {...uploadProps}
                          className="dark:bg-gray-700 dark:border-gray-600 rounded"
                        >
                          <div className="dark:text-white">
                            <p>
                              <span className="fa-solid fa-inbox text-5xl dark:text-blue-400" />
                            </p>
                            <p className=" dark:text-white">
                              Click or drag file to this area to upload
                            </p>
                            <p className=" dark:text-gray-400">
                              Single file upload. Please submit before the due
                              date.
                            </p>
                          </div>
                        </Dragger>
                        {item.status === "Overdue" && (
                          <Alert
                            message="This assignment is past due."
                            type="warning"
                            showIcon
                            className="mt-2"
                          />
                        )}
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-md mb-2 dark:text-gray-200">
                          Your Submission
                        </h3>
                        {item.studentSubmission ? (
                          <Alert
                            message={
                              <span className="dark:text-gray-800">
                                <i className="fas fa-file-alt mr-2"></i>
                                <a
                                  href={item.studentSubmission.url || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {item.studentSubmission.fileName}
                                </a>
                              </span>
                            }
                            description={
                              <span className="text-xs dark:text-gray-700">
                                Submitted on:{" "}
                                {moment(
                                  item.studentSubmission.submittedDate
                                ).format("YYYY-MM-DD @ HH:mm")}
                              </span>
                            }
                            type={
                              item.status === "Submitted"
                                ? "warning"
                                : "success"
                            } // Yellow if submitted, Green if graded
                            showIcon
                            className={
                              item.status === "Submitted"
                                ? "bg-yellow-50 dark:bg-yellow-100 border-yellow-200"
                                : "bg-green-50 dark:bg-green-100 border-green-200"
                            }
                          />
                        ) : (
                          <Text className="dark:text-gray-400">
                            No submission details found.
                          </Text>
                        )}
                      </div>
                    )}
                  </Col>
                </Row>
              </Card>
            </List.Item>
          );
        }}
        locale={{
          emptyText: (
            <Empty
              description={
                <span className="dark:text-gray-400">
                  No assignments found.
                </span>
              }
            />
          ),
        }}
      />
    </div>
  );
};

export default StudentAssignmentsPage;
