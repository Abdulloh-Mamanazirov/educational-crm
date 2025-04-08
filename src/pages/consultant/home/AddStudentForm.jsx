// src/components/AddStudentForm.js (Example file path)

import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button,
  message,
  Spin,
  Card,
  Typography,
} from "antd";
import moment from "moment";
import { servicePackages } from "./constants/consultingConstants"; // Reuse constants

const { Option } = Select;
const { Title } = Typography;

const AddStudentForm = ({ onStudentAdded }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAddStudent = async (values) => {
    setLoading(true);
    console.log("Form Values Submitted:", values);

    // Format data for API (e.g., Date)
    const apiData = {
      ...values,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      // Assume consultant assigning is handled by backend based on logged-in user
    };

    console.log("Data being sent to API (simulated):", apiData);

    try {
      // --- Simulate API Call ---
      // Replace with your actual fetch/axios POST request to create a student
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newStudentId = `new_${Date.now()}`; // Simulate getting a new ID back
      console.log(`Simulated success, new student ID: ${newStudentId}`);
      // --- End Simulation ---

      message.success(`Student "${apiData.name}" added successfully!`);
      form.resetFields(); // Clear the form

      // If a callback is provided (e.g., to refresh list or navigate), call it
      if (onStudentAdded) {
        onStudentAdded({ ...apiData, id: newStudentId }); // Pass back the added student data (optional)
      }
    } catch (error) {
      console.error("Failed to add student:", error);
      message.error(
        "Failed to add student. Please check the details and try again."
      );
      // More specific error handling based on API response would go here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <Title level={4} className="mb-6 dark:text-white">
        <i className="fas fa-user-plus mr-3"></i>Add New Student Profile
      </Title>
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddStudent}
          className="space-y-4" // Add some vertical space between items
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
            {" "}
            {/* Reduced gap-y */}
            <Form.Item
              label={<span className="dark:text-gray-300">Full Name</span>}
              name="name"
              rules={[
                { required: true, message: "Please enter the student name!" },
              ]}
            >
              <Input
                placeholder="Enter full name"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="dark:text-gray-300">Email Address</span>}
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                placeholder="Enter email address"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="dark:text-gray-300">Date of Birth</span>}
              name="dob"
              rules={[
                { required: true, message: "Please select the date of birth!" },
              ]}
            >
              <DatePicker
                placeholder="Select date"
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 [&>input]:dark:text-white"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item
              label={<span className="dark:text-gray-300">Phone Number</span>}
              name="phone"
              rules={[
                { required: true, message: "Please enter the phone number!" },
              ]}
            >
              <Input
                placeholder="Enter phone number"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="dark:text-gray-300">Desired Major</span>}
              name="major"
              rules={[
                { required: true, message: "Please enter the desired major" },
              ]} // Made required for consistency
            >
              <Input
                placeholder="E.g., Computer Science, Business Administration"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="dark:text-gray-300">
                  Desired Country of Study
                </span>
              }
              name="country"
              rules={[
                { required: true, message: "Please enter the desired country" },
              ]} // Made required
            >
              <Input
                placeholder="E.g., USA, Canada, UK"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="dark:text-gray-300">Target Semester</span>
              }
              name="semester"
              rules={[
                {
                  required: true,
                  message: "Please select the target semester!",
                },
              ]}
            >
              <Select
                placeholder="Select target semester"
                className="dark:bg-gray-700 rounded-md [&>div]:dark:text-white"
              >
                {/* Dynamically generate future semesters or keep static */}
                <Option value="Fall 2025">
                  <span className="dark:text-gray-800">Fall 2025</span>
                </Option>
                <Option value="Spring 2026">
                  <span className="dark:text-gray-800">Spring 2026</span>
                </Option>
                <Option value="Fall 2026">
                  <span className="dark:text-gray-800">Fall 2026</span>
                </Option>
                <Option value="Spring 2027">
                  <span className="dark:text-gray-800">Spring 2027</span>
                </Option>
                <Option value="Fall 2027">
                  <span className="dark:text-gray-800">Fall 2027</span>
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span className="dark:text-gray-300">
                  Initial Budget (Approx. USD)
                </span>
              }
              name="budget"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Please enter a valid budget amount (optional)",
                },
              ]}
            >
              <InputNumber
                prefix="$"
                placeholder="Enter approximate budget"
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </Form.Item>
            {/* Optional: Set initial package - might be better done after consultation */}
            <Form.Item
              label={
                <span className="dark:text-gray-300">
                  Initial Service Package (Optional)
                </span>
              }
              name="servicePackage"
            >
              <Select
                placeholder="Select if known"
                allowClear // Allow unselecting
                className="dark:bg-gray-700 rounded-md [&>div]:dark:text-white"
              >
                {Object.entries(servicePackages).map(([key, pkg]) => (
                  <Option key={key} value={parseInt(key, 10)}>
                    <span className="dark:text-gray-800">{pkg.name}</span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* Add other fields if necessary at creation time */}
          </div>

          <Form.Item className="mt-6">
            {" "}
            {/* Add margin top to separate button */}
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<i className="fas fa-plus-circle mr-2"></i>}
            >
              Add Student
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default AddStudentForm;
