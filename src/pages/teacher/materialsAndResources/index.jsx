import React, { useState } from "react";
import {
  Layout,
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Card,
  Space,
  Tag,
  message,
  Divider,
} from "antd";
import moment from "moment";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ResourcesPage = () => {
  // Mock data for resources
  const [resourcesList, setResourcesList] = useState([
    {
      id: 1,
      title: "Algebra Fundamentals",
      type: "Slides",
      subject: "Mathematics",
      uploadDate: "2025-02-10",
      format: "PDF",
    },
    {
      id: 2,
      title: "French Revolution Timeline",
      type: "Worksheet",
      subject: "History",
      uploadDate: "2025-02-15",
      format: "PDF",
    },
    {
      id: 3,
      title: "Grammar Quiz",
      type: "Quiz",
      subject: "English",
      uploadDate: "2025-01-25",
      format: "DOCX",
    },
  ]);

  // States for modal
  const [isResourceModalVisible, setIsResourceModalVisible] = useState(false);

  // Form ref
  const [resourceForm] = Form.useForm();

  // Resources columns for table
  const resourcesColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const typeColors = {
          Slides: "blue",
          Worksheet: "orange",
          Quiz: "green",
        };
        return <Tag color={typeColors[type] || "default"}>{type}</Tag>;
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Format",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
      render: (date) => moment(date).format("MMM DD, YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="primary" size="small">
            <span>
              <i className="fas fa-download"></i> Download
            </span>
          </Button>
          <Button type="default" size="small">
            <span>
              <i className="fas fa-share"></i> Share
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  // Handler for adding new resource
  const handleAddResource = () => {
    setIsResourceModalVisible(true);
  };

  // Handler for submitting resource form
  const handleResourceSubmit = (values) => {
    console.log("Resource form submitted:", values);

    // Create new resource object
    const newResource = {
      id: resourcesList.length + 1,
      title: values.title,
      type: values.type,
      subject: values.subject,
      uploadDate: moment().format("YYYY-MM-DD"),
      format: values.format || "PDF",
    };

    // Add to list
    setResourcesList([...resourcesList, newResource]);

    // Show success message
    message.success("Resource uploaded successfully!");

    // Close modal and reset form
    setIsResourceModalVisible(false);
    resourceForm.resetFields();
  };

  return (
    <div className="p-6">
      <h1 className={`text-2xl mb-6 font-bold dark:text-white`}>
        Materials and Resources
      </h1>

      <Card>
        <Text type="secondary">
          Upload and share lesson slides, worksheets, and quizzes
        </Text>

        <Divider />

        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="primary"
            onClick={handleAddResource}
            icon={
              <span>
                <i className="fas fa-upload"></i>
              </span>
            }
          >
            Upload New Resource
          </Button>

          <Space>
            <Select defaultValue="all" style={{ width: 150 }}>
              <Option value="all">All Types</Option>
              <Option value="slides">Slides</Option>
              <Option value="worksheet">Worksheets</Option>
              <Option value="quiz">Quizzes</Option>
            </Select>

            <Select defaultValue="all" style={{ width: 150 }}>
              <Option value="all">All Subjects</Option>
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
              <Option value="history">History</Option>
              <Option value="english">English</Option>
            </Select>
          </Space>
        </div>

        <Table
          columns={resourcesColumns}
          dataSource={resourcesList}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal for adding new resource */}
      <Modal
        title="Upload Resource"
        visible={isResourceModalVisible}
        onCancel={() => setIsResourceModalVisible(false)}
        footer={null}
      >
        <Form
          form={resourceForm}
          layout="vertical"
          onFinish={handleResourceSubmit}
        >
          <Form.Item
            name="title"
            label="Resource Title"
            rules={[
              { required: true, message: "Please enter the resource title" },
            ]}
          >
            <Input placeholder="e.g., Algebra Fundamentals" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Resource Type"
            rules={[
              { required: true, message: "Please select a resource type" },
            ]}
          >
            <Select placeholder="Select type">
              <Option value="Slides">Slides</Option>
              <Option value="Worksheet">Worksheet</Option>
              <Option value="Quiz">Quiz</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please select a subject" }]}
          >
            <Select placeholder="Select a subject">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="History">History</Option>
              <Option value="English">English</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="format"
            label="Format"
            rules={[{ required: true, message: "Please select a format" }]}
          >
            <Select placeholder="Select format">
              <Option value="PDF">PDF</Option>
              <Option value="DOCX">Word Document</Option>
              <Option value="PPTX">PowerPoint</Option>
              <Option value="XLSX">Excel Spreadsheet</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="File"
            rules={[{ required: true, message: "Please upload a file" }]}
          >
            <Upload>
              <Button
                icon={
                  <span>
                    <i className="fas fa-upload"></i>
                  </span>
                }
              >
                Select File
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Upload
            </Button>
            <Button onClick={() => setIsResourceModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResourcesPage;
