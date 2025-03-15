import React, { useState } from "react";
import { Card, Switch, Button, message, Typography, Divider } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const AdminPermissionsPage = () => {
  // Mock data for available pages
  const [availablePages, setAvailablePages] = useState([
    { id: 1, name: "Dashboard", path: "/dashboard", enabled: true },
    { id: 2, name: "Students", path: "/students", enabled: true },
    { id: 3, name: "Courses", path: "/courses", enabled: true },
    { id: 4, name: "Instructors", path: "/instructors", enabled: true },
    { id: 5, name: "Reports", path: "/reports", enabled: false },
    { id: 6, name: "Assessments", path: "/assessments", enabled: false },
    { id: 7, name: "Calendar", path: "/calendar", enabled: true },
    { id: 8, name: "Finance", path: "/finance", enabled: false },
    { id: 9, name: "Settings", path: "/settings", enabled: true },
  ]);

  // Handle switch toggle
  const handleToggle = (id) => {
    const updatedPages = availablePages.map((page) =>
      page.id === id ? { ...page, enabled: !page.enabled } : page
    );
    setAvailablePages(updatedPages);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Saved permissions:", availablePages);
    message.success("Admin permissions updated successfully");
  };

  // Last updated timestamp
  const lastUpdated = moment().format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className={`p-6 dark:text-white`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold dark:text-white`}>
          Admin Pages
        </h1>
        <div className="text-right">
          <Text className="dark:text-gray-300">
            <span className="fa fa-clock mr-2"></span>
            Last updated: {lastUpdated}
          </Text>
        </div>
      </div>

      <Card className="shadow-md dark:bg-gray-800 dark:text-white mb-6">
        <Text className="dark:text-gray-300">
          <span className="fa fa-info-circle mr-2"></span>
          Toggle switches to control which pages admins can access. Changes will
          only take effect after saving.
        </Text>
      </Card>

      <Card className="shadow-md dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availablePages.map((page) => (
            <div
              key={page.id}
              className="flex justify-between items-center p-3 border dark:border-gray-700 rounded"
            >
              <div className="flex items-center">
                <Text strong className="dark:text-white">
                  {page.name}
                </Text>
              </div>
              <Switch
                checked={page.enabled}
                onChange={() => handleToggle(page.id)}
                className={page.enabled ? "bg-green-500" : "bg-gray-400"}
              />
            </div>
          ))}
        </div>

        <Divider className="dark:border-gray-700" />

        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <span className="fa fa-save mr-2"></span>
            Save Permissions
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPermissionsPage;
