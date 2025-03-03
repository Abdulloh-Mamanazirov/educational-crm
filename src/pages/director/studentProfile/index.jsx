import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Progress,
  Table,
  Form,
  Input,
  Button,
  Typography,
  Tag,
  Divider,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

// Mock data
const studentData = {
  id: "ST12345",
  name: "Alex Johnson",
  group: "Advanced English",
  level: "B2",
  attendancePercentage: 92,
  testScores: {
    average: 85,
    highest: 98,
    lowest: 72,
  },
  assignmentCompletionRate: 88,
  levelProgression: "B1 → B2",
  skillBreakdown: {
    reading: 87,
    writing: 82,
    listening: 90,
    speaking: 85,
  },
  ranking: "3 / 25",
  performanceTrend: [
    { month: "Jan", score: 75 },
    { month: "Feb", score: 78 },
    { month: "Mar", score: 80 },
    { month: "Apr", score: 82 },
    { month: "May", score: 85 },
    { month: "Jun", score: 88 },
  ],
  feedback: {
    strengths: "Strong vocabulary usage, excellent listening comprehension",
    improvements: "Could improve writing structure and grammar usage",
    comments:
      "Alex is a dedicated student who consistently participates in class activities. With more focus on writing exercises, Alex can achieve the C1 level by next semester.",
  },
};

const { Title, Text } = Typography;

const StudentProfile = () => {
  const [feedbackForm] = Form.useForm();

  const handleFeedbackSubmit = (values) => {
    console.log("Feedback submitted:", values);
    feedbackForm.resetFields();
  };

  return (
    <div className={`p-6 dark:text-white`}>
      <h1 className={`text-2xl font-bold mb-6 dark:text-white`}>
        Students Profile
      </h1>

      <Row gutter={[24, 24]}>
        {/* Basic Info */}
        <Col xs={24} lg={8}>
          <Card
            title="Basic Information"
            bordered={false}
            className="h-full shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <div className="flex flex-col gap-3">
              <div>
                <Text strong className="dark:text-gray-300">
                  Name:
                </Text>
                <Text className="block text-lg dark:text-gray-200">
                  {studentData.name}
                </Text>
              </div>
              <div>
                <Text strong className="dark:text-gray-300">
                  Group:
                </Text>
                <Text className="block dark:text-gray-200">
                  {studentData.group}
                </Text>
              </div>
              <div>
                <Text strong className="dark:text-gray-300">
                  Current Level:
                </Text>
                <Text className="block dark:text-gray-200">
                  {studentData.level}
                </Text>
              </div>
              <div>
                <Text strong className="dark:text-gray-300">
                  Level Progression:
                </Text>
                <Text className="block dark:text-gray-200">
                  {studentData.levelProgression}
                </Text>
              </div>
              <div>
                <Text strong className="dark:text-gray-300">
                  Class Ranking:
                </Text>
                <Text className="block dark:text-gray-200">
                  {studentData.ranking}
                </Text>
              </div>
              <div>
                <Text strong className="dark:text-gray-300">
                  Last Updated:
                </Text>
                <Text className="block dark:text-gray-200">
                  {moment().format("MMMM D, YYYY")}
                </Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* Performance Overview */}
        <Col xs={24} lg={16}>
          <Card
            title="Performance Overview"
            bordered={false}
            className="h-full shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="mb-4">
                  <Text strong className="dark:text-gray-300">
                    Attendance:
                  </Text>
                  <Progress
                    percent={studentData.attendancePercentage}
                    status="active"
                    strokeColor="#1890ff"
                  />
                </div>
                <div className="mb-4">
                  <Text strong className="dark:text-gray-300">
                    Assignment Completion:
                  </Text>
                  <Progress
                    percent={studentData.assignmentCompletionRate}
                    status="active"
                    strokeColor="#52c41a"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong className="dark:text-gray-300">
                    Test Scores:
                  </Text>
                  <div className="pl-4">
                    <div className="flex justify-between">
                      <Text className="dark:text-gray-300">Average:</Text>
                      <Text className="dark:text-gray-200">
                        {studentData.testScores.average}%
                      </Text>
                    </div>
                    <div className="flex justify-between">
                      <Text className="dark:text-gray-300">Highest:</Text>
                      <Text className="dark:text-gray-200">
                        {studentData.testScores.highest}%
                      </Text>
                    </div>
                    <div className="flex justify-between">
                      <Text className="dark:text-gray-300">Lowest:</Text>
                      <Text className="dark:text-gray-200">
                        {studentData.testScores.lowest}%
                      </Text>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Skill Breakdown */}
        <Col xs={24} lg={12}>
          <Card
            title="Skill Breakdown"
            bordered={false}
            className="shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <div className="mb-3">
              <Text strong className="dark:text-gray-300">
                Reading:
              </Text>
              <Progress
                percent={studentData.skillBreakdown.reading}
                status="normal"
                strokeColor="#722ed1"
              />
            </div>
            <div className="mb-3">
              <Text strong className="dark:text-gray-300">
                Writing:
              </Text>
              <Progress
                percent={studentData.skillBreakdown.writing}
                status="normal"
                strokeColor="#13c2c2"
              />
            </div>
            <div className="mb-3">
              <Text strong className="dark:text-gray-300">
                Listening:
              </Text>
              <Progress
                percent={studentData.skillBreakdown.listening}
                status="normal"
                strokeColor="#fa8c16"
              />
            </div>
            <div className="mb-3">
              <Text strong className="dark:text-gray-300">
                Speaking:
              </Text>
              <Progress
                percent={studentData.skillBreakdown.speaking}
                status="normal"
                strokeColor="#eb2f96"
              />
            </div>
          </Card>
        </Col>

        {/* Performance Trend */}
        <Col xs={24} lg={12}>
          <Card
            title="Performance Trend"
            bordered={false}
            className="shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={studentData.performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1890ff"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Teacher's Feedback */}
        <Col span={24}>
          <Card
            title="Teacher's Feedback & Notes"
            bordered={false}
            className="shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <div className="mb-4">
              <Text strong className="block mb-2 dark:text-gray-300">
                Strengths:
              </Text>
              <div className="pl-4 dark:text-gray-200">
                {studentData.feedback.strengths}
              </div>
            </div>
            <div className="mb-4">
              <Text strong className="block mb-2 dark:text-gray-300">
                Areas for Improvement:
              </Text>
              <div className="pl-4 dark:text-gray-200">
                {studentData.feedback.improvements}
              </div>
            </div>
            <div className="mb-4">
              <Text strong className="block mb-2 dark:text-gray-300">
                Teacher's Comments:
              </Text>
              <div className="pl-4 dark:text-gray-200">
                {studentData.feedback.comments}
              </div>
            </div>

            <Divider className="dark:border-gray-600" />

            <Form
              form={feedbackForm}
              layout="vertical"
              onFinish={handleFeedbackSubmit}
            >
              <Form.Item
                name="newFeedback"
                label={
                  <span className="dark:text-gray-300">
                    Add New Feedback/Note:
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your feedback" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <span className="flex items-center">
                    <span className="mr-2">
                      <i className="fas fa-save"></i>
                    </span>
                    Save Feedback
                  </span>
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentProfile;
