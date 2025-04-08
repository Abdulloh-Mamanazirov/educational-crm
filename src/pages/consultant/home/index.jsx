import React, { useState, useEffect } from "react";
import {
  Layout,
  Spin,
  Alert,
  List,
  Typography,
  Button,
  Input,
  Modal,
} from "antd";
import AddStudentForm from "./AddStudentForm";
import ConsultantStudentManagementPage from "./ConsultantStudentManagementPage.jsx";
import { servicePackages } from "./constants/consultingConstants";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const ConsultantDashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // --- Fetch Student List ---
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API call to get students for this consultant
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
        const fetchedStudents = [
          {
            id: "101",
            name: "Alice Wonderland",
            email: "alice.w@example.com",
            servicePackage: 1,
            status: "Active",
          },
          {
            id: "102",
            name: "Bob The Builder",
            email: "bob.b@example.com",
            servicePackage: 3,
            status: "Agreement Pending",
          },
          {
            id: "103",
            name: "Charlie Chaplin",
            email: "charlie.c@example.com",
            servicePackage: 2,
            status: "Documents Pending",
          },
          // Add more dummy students
        ];
        setStudents(fetchedStudents);
        setFilteredStudents(fetchedStudents); // Initialize filtered list
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Could not load student list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []); // Fetch only once on mount

  // --- Handle Search ---
  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerSearchTerm) ||
        student.email.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  // --- Handle Selection ---
  const handleSelectStudent = (studentId) => {
    setSelectedStudentId(studentId);
  };

  // --- Handle Back to List ---
  const handleBackToList = () => {
    setSelectedStudentId(null);
    // Optional: re-fetch student list if data might have changed
  };

  const showAddStudentModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCancelAddStudent = () => {
    setIsAddModalVisible(false);
  };

  const handleStudentAdded = (newStudent) => {
    console.log("Student added:", newStudent);
    setIsAddModalVisible(false); // Close modal
    // Refresh the student list:
    // Option 1: Re-fetch the whole list
    // fetchStudents();
    // Option 2: Add the new student to the existing state (if API returns enough info)
    // setStudents(prev => [newStudent, ...prev]); // Add to beginning
    // Make sure to update filteredStudents as well or refilter
    message.info("Refreshing student list..."); // Give feedback
    // Simplest reliable way is often to re-fetch:
    fetchStudents(); // Assuming fetchStudents is defined in your dashboard
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Content className="p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
        <Alert message="Error" description={error} type="error" showIcon />
      </Content>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Content className="p-4 sm:p-6 lg:p-8">
        {selectedStudentId ? (
          // --- Show Detail View ---
          <>
            <Button
              onClick={handleBackToList}
              className="mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              icon={<i className="fas fa-arrow-left mr-2"></i>}
            >
              Back to Student List
            </Button>
            <ConsultantStudentManagementPage
              studentId={selectedStudentId}
              key={selectedStudentId} // Ensures component remounts/refetches if ID changes
            />
          </>
        ) : (
          // --- Show List View ---
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <Title level={3} className="mb-0 dark:text-white">
                Consulting Students
              </Title>
              <Button
                type="primary"
                onClick={showAddStudentModal}
                icon={<i className="fas fa-plus mr-2"></i>}
              >
                Add New Student
              </Button>
            </div>
            <Search
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              className="mb-4 dark:[&_input]:bg-gray-700 dark:[&_input]:text-white"
            />
            <List
              itemLayout="horizontal"
              dataSource={filteredStudents}
              renderItem={(student) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      onClick={() => handleSelectStudent(student.id)}
                      className="dark:text-blue-400"
                    >
                      <i className="fas fa-eye mr-1"></i> View Details
                    </Button>,
                  ]}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition-colors duration-150"
                >
                  <List.Item.Meta
                    // avatar={<Avatar src="url_to_avatar_if_available" />}
                    title={
                      <span className="font-semibold dark:text-white">
                        {student.name}
                      </span>
                    }
                    description={
                      <div className="text-sm">
                        <Text
                          type="secondary"
                          className="dark:text-gray-400 block"
                        >
                          {student.email}
                        </Text>
                        <Text
                          type="secondary"
                          className="dark:text-gray-400 block"
                        >
                          Package:{" "}
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {servicePackages[student.servicePackage]?.name ||
                              "N/A"}
                          </span>
                        </Text>
                        {/* Add more info like status if available in list data */}
                        {/* <Text type="secondary" className="dark:text-gray-400 block">Status: {student.status}</Text> */}
                      </div>
                    }
                  />
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <span className="dark:text-gray-400">No students found.</span>
                ),
              }}
            />
          </div>
        )}
      </Content>
      {/* Modal Student Add */}
      <Modal
        title="Add New Student"
        open={isAddModalVisible}
        onCancel={handleCancelAddStudent}
        footer={null} // Footer is handled by the form's button
        destroyOnClose={true} // Resets form state when modal is closed
        width={800} // Adjust width as needed
      >
        <AddStudentForm onStudentAdded={handleStudentAdded} />
      </Modal>
    </Layout>
  );
};

export default ConsultantDashboard;
