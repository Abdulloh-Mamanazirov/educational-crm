import React, { useState } from "react";
import { Form, Input, Select, Button, Table, Tag, Modal, message } from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

// Mock data for inquiries
const mockInquiries = [
  {
    id: 1,
    type: "Support",
    subject: "Login Issue",
    message:
      "I cannot log in to my account. The system says my password is incorrect.",
    teacher: "Dr. Smith",
    status: "Open",
    date: "2025-04-10T08:30:00",
  },
  {
    id: 2,
    type: "Question",
    subject: "Assignment Clarification",
    message: "I need clarification on the requirements for the final project.",
    teacher: "Ms. Johnson",
    status: "Answered",
    date: "2025-04-09T14:45:00",
  },
  {
    id: 3,
    type: "Session Request",
    subject: "Help with Math Problem",
    message:
      "I am struggling with calculus. Can we schedule a one-on-one session?",
    teacher: "Mr. Wilson",
    status: "Scheduled",
    date: "2025-04-08T11:20:00",
  },
];

// Mock data for teachers
const teachers = [
  { id: 1, name: "Dr. Smith", subject: "Computer Science" },
  { id: 2, name: "Ms. Johnson", subject: "Literature" },
  { id: 3, name: "Mr. Wilson", subject: "Mathematics" },
  { id: 4, name: "Dr. Garcia", subject: "Physics" },
];

const StudentInquiryPage = () => {
  const [form] = Form.useForm();
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Form submission handler
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);

    // Create new inquiry
    const newInquiry = {
      id: inquiries.length + 1,
      type: values.type,
      subject: values.subject,
      message: values.message,
      teacher: values.teacher,
      status: "Open",
      date: moment().format("YYYY-MM-DDTHH:mm:ss"),
    };

    // Update inquiries state
    setInquiries([newInquiry, ...inquiries]);

    // Reset form
    form.resetFields();

    // Show success message
    message.success("Your inquiry has been submitted successfully!");
  };

  // View inquiry details
  const viewInquiryDetails = (record) => {
    setSelectedInquiry(record);
    setIsModalVisible(true);
  };

  // Table columns
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = "blue";
        if (type === "Support") color = "red";
        if (type === "Session Request") color = "green";
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gold";
        if (status === "Answered") color = "green";
        if (status === "Scheduled") color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("MMM DD, YYYY - HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => viewInquiryDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold mb-2">Feedback & Support</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Submit concerns, ask teachers for help, or request one-on-one sessions
        </p>
      </div>

      {/* New Inquiry Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">
            <i className="fas fa-comment-dots"></i>
          </span>
          New Inquiry
        </h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label={<span className="dark:text-white">Inquiry Type</span>}
              rules={[
                { required: true, message: "Please select the inquiry type" },
              ]}
            >
              <Select placeholder="Select type">
                <Option value="Question">Question</Option>
                <Option value="Support">Support</Option>
                <Option value="Session Request">Session Request</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="teacher"
              label={<span className="dark:text-white">Select Teacher</span>}
              rules={[{ required: true, message: "Please select a teacher" }]}
            >
              <Select placeholder="Select teacher">
                {teachers.map((teacher) => (
                  <Option key={teacher.id} value={teacher.name}>
                    {teacher.name} - {teacher.subject}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="subject"
            label={<span className="dark:text-white">Subject</span>}
            rules={[{ required: true, message: "Please enter a subject" }]}
          >
            <Input placeholder="Brief description of your inquiry" />
          </Form.Item>

          <Form.Item
            name="message"
            label={<span className="dark:text-white">Message</span>}
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <TextArea
              rows={4}
              placeholder="Provide details about your inquiry"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Submit Inquiry
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Past Inquiries */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">
            <i className="fas fa-history"></i>
          </span>
          My Inquiries
        </h2>
        <Table
          columns={columns}
          dataSource={inquiries}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Inquiry Details Modal */}
      <Modal
        title="Inquiry Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedInquiry && (
          <div>
            <p className="mb-2">
              <strong>Type:</strong>{" "}
              <Tag
                color={
                  selectedInquiry.type === "Support"
                    ? "red"
                    : selectedInquiry.type === "Session Request"
                    ? "green"
                    : "blue"
                }
              >
                {selectedInquiry.type}
              </Tag>
            </p>
            <p className="mb-2">
              <strong>Subject:</strong> {selectedInquiry.subject}
            </p>
            <p className="mb-2">
              <strong>Teacher:</strong> {selectedInquiry.teacher}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  selectedInquiry.status === "Open"
                    ? "gold"
                    : selectedInquiry.status === "Answered"
                    ? "green"
                    : "blue"
                }
              >
                {selectedInquiry.status}
              </Tag>
            </p>
            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {moment(selectedInquiry.date).format("MMM DD, YYYY - HH:mm")}
            </p>
            <p className="mb-2">
              <strong>Message:</strong>
            </p>
            <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              {selectedInquiry.message}
            </p>

            {selectedInquiry.status === "Answered" && (
              <div className="mt-4">
                <p className="mb-2">
                  <strong>Response:</strong>
                </p>
                <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  Thank you for your inquiry. Please review the course materials
                  in module 3 for detailed information on the final project
                  requirements. Let me know if you have any specific questions.
                </p>
              </div>
            )}

            {selectedInquiry.status === "Scheduled" && (
              <div className="mt-4">
                <p className="mb-2">
                  <strong>Session Details:</strong>
                </p>
                <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  Your one-on-one session has been scheduled for April 15, 2025
                  at 2:00 PM. Please join via the video conference link that
                  will be sent to your email.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentInquiryPage;
