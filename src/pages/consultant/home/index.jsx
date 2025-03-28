import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Card,
  Descriptions,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Initial university data
const initialUniversityData = [
  {
    id: 3,
    name: "National University of Singapore",
    country: "Singapore",
    admissionRequirements: {
      gpa: "3.5+",
      tests: ["IELTS: 6.5+", "GRE: Optional"],
      documents: [
        "Transcripts",
        "Personal Statement",
        "2 Recommendation Letters",
      ],
    },
    courses: [
      {
        name: "Data Science",
        fee: 20000,
      },
      {
        name: "Business Analytics",
        fee: 25000,
      },
      {
        name: "International Relations",
        fee: 22000,
      },
    ],
    scholarships: [
      {
        name: "ASEAN Undergraduate Scholarship",
        amount: "Tuition + allowance",
        eligibility: "ASEAN country citizens",
      },
      {
        name: "Science & Technology Scholarship",
        amount: "Full coverage",
        eligibility: "Outstanding STEM students",
      },
    ],
    accommodation: {
      dorm: {
        available: true,
        monthlyCost: 10000,
      },
    },
    application: "March 1 - April 1",
  },
  {
    id: 1,
    name: "Harvard University",
    country: "United States",
    admissionRequirements: {
      gpa: "3.7+",
      tests: ["TOEFL: 100+", "SAT: 1450+", "ACT: 33+"],
      documents: [
        "High School Transcripts",
        "Personal Essay",
        "3 Letters of Recommendation",
        "Extracurricular Portfolio",
      ],
    },
    courses: [
      {
        name: "Computer Science",
        fee: 55000,
      },
      {
        name: "Political Science",
        fee: 52000,
      },
      {
        name: "Biomedical Engineering",
        fee: 58000,
      },
    ],
    scholarships: [
      {
        name: "Harvard Financial Aid",
        amount: "Need-based full coverage",
        eligibility: "Low-income students",
      },
      {
        name: "Presidential Scholarship",
        amount: "Full tuition + stipend",
        eligibility: "Academic excellence",
      },
    ],
    accommodation: {
      dorm: {
        available: true,
        monthlyCost: 15000,
      },
    },
    application: "September 1 - January 1",
  },
];

// Predefined lists for documents, requirements and courses
const ALL_DOCUMENTS = [
  "Transcripts",
  "Personal Statement",
  "Recommendation Letters",
  "High School Diploma",
  "Passport Copy",
  "Academic CV",
  "English Proficiency Test",
  "Portfolio",
  "Research Proposal",
  "Motivation Letter",
  "Professional Resume",
];

const ALL_REQUIREMENTS = ["IELTS", "JLPT", "SAT", "TOEFL", "Duolingo"];

const ALL_COURSES = [
  "Computer Science",
  "Business Analytics",
  "Data Science",
  "International Relations",
  "Robotics Engineering",
  "Marine Biology",
  "Environmental Studies",
  "Public Health",
  "Digital Media",
  "Sustainable Agriculture",
  "Political Science",
  "Biomedical Engineering",
  "Japanese Studies",
  "African Literature",
];

const UniversityManagement = () => {
  const [universities, setUniversities] = useState(initialUniversityData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Courses",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => (
        <div>
          {courses.map((course) => (
            <Tag key={course.name}>{course.name}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => showUniversityDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const showUniversityDetails = (university) => {
    Modal.info({
      title: university.name,
      width: 800,
      content: (
        <Card>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Country">
              {university.country}
            </Descriptions.Item>
            <Descriptions.Item label="GPA Requirement">
              {university.admissionRequirements.gpa}
            </Descriptions.Item>
            <Descriptions.Item label="Test Requirements">
              {university.admissionRequirements.tests.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Required Documents">
              {university.admissionRequirements.documents.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Courses">
              {university.courses
                .map((c) => `${c.name} ($${c.fee})`)
                .join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Scholarships">
              {university.scholarships
                .map((s) => `${s.name}: ${s.amount}`)
                .join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Accommodation">
              {university.accommodation.dorm.available
                ? `Available at $${university.accommodation.dorm.monthlyCost}/month`
                : "Not Available"}
            </Descriptions.Item>
            <Descriptions.Item label="Application Period">
              {university.application}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ),
      onOk() {},
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    const newUniversity = {
      id: Date.now(),
      name: values.name,
      country: values.country,
      admissionRequirements: {
        gpa: values.gpa,
        tests: values.tests,
        documents: values.documents,
      },
      courses: values.courses.map((name) => ({
        name,
        fee: Math.floor(Math.random() * 30000) + 10000, // Random fee generation
      })),
      scholarships: [
        {
          name: "Default Scholarship",
          amount: "Partial Tuition",
          eligibility: "Various criteria",
        },
      ],
      accommodation: {
        dorm: {
          available: true,
          monthlyCost: Math.floor(Math.random() * 10000) + 5000, // Random cost
        },
      },
      application: values.applicationPeriod,
    };

    setUniversities([...universities, newUniversity]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <Card
        title="University Management"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add University
          </Button>
        }
      >
        <Table columns={columns} dataSource={universities} rowKey="id" />
      </Card>

      <Modal
        title="Add New University"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="University Name"
            rules={[
              { required: true, message: "Please input university name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please input country!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gpa"
            label="GPA Requirement"
            rules={[
              { required: true, message: "Please input GPA requirement!" },
            ]}
          >
            <Input placeholder="3.5+" />
          </Form.Item>

          <Form.Item name="tests" label="Test Requirements">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select requirements"
              options={ALL_REQUIREMENTS.map((req) => ({
                label: req,
                value: req,
              }))}
            />
          </Form.Item>

          <Form.Item name="documents" label="Required Documents">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select required documents"
              options={ALL_DOCUMENTS.map((doc) => ({ label: doc, value: doc }))}
            />
          </Form.Item>

          <Form.Item name="courses" label="Courses">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select courses"
              options={ALL_COURSES.map((course) => ({
                label: course,
                value: course,
              }))}
            />
          </Form.Item>

          <Form.Item name="applicationPeriod" label="Application Period">
            <Input placeholder="e.g., March 1 - April 1" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add University
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UniversityManagement;
