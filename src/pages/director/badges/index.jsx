import React, { useState } from "react";
import {
  Card,
  Modal,
  Input,
  Button,
  message,
  Space,
  Upload,
  Form,
  Popconfirm,
} from "antd";

// Mock data
const mockBadges = [
  {
    id: "1",
    name: "Perfect Attendance",
    description: "Attended all classes for a month",
    photo:
      "https://fastly.picsum.photos/id/551/200/200.jpg?hmac=vxRitsvMJEbK15DKl4ZRj7NQWF6RTfzBvievdi9q96s",
  },
  {
    id: "2",
    name: "Top Performer",
    description: "Achieved highest score in assessment",
    photo:
      "https://fastly.picsum.photos/id/75/200/300.jpg?hmac=sjSIzdmDj0dZefwBIN61pwl3azxymhEGh9owb8ZEgxg",
  },
];

const mockStudentBadges = [
  {
    id: "1",
    student_id: "101",
    badge_id: "1",
    description: "Awarded for January 2025",
  },
  {
    id: "2",
    student_id: "102",
    badge_id: "1",
    description: "Awarded for February 2025",
  },
];

const mockStudents = [
  { id: "101", name: "John Doe" },
  { id: "102", name: "Jane Smith" },
];

const BadgesManagement = () => {
  const [badges, setBadges] = useState(mockBadges);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [form] = Form.useForm();
  const [editingBadge, setEditingBadge] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Create Badge
  const handleCreate = () => {
    setEditingBadge(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  // Edit Badge
  const handleEdit = (badge) => {
    setEditingBadge(badge);
    form.setFieldsValue({
      name: badge.name,
      description: badge.description,
    });
    setFileList([
      {
        uid: "-1",
        name: "current-badge-photo.png",
        status: "done",
        url: badge.photo,
      },
    ]);
    setIsModalVisible(true);
  };

  // Delete Badge
  const handleDelete = (badgeId) => {
    setBadges(badges.filter((badge) => badge.id !== badgeId));
    message.success("Badge deleted successfully");
  };

  // Handle file upload change
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Custom file upload handler (mock)
  const customUploadRequest = ({ onSuccess }) => {
    // Simulate upload success after 1 second
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  // Save Badge (Create or Update)
  const handleSave = (values) => {
    // Get the photo URL (either from uploaded file or existing URL)
    const photoUrl =
      fileList[0]?.url ||
      fileList[0]?.thumbUrl ||
      "https://via.placeholder.com/50";

    if (editingBadge) {
      // Update
      setBadges(
        badges.map((badge) =>
          badge.id === editingBadge.id
            ? { ...badge, ...values, photo: photoUrl }
            : badge
        )
      );
      message.success("Badge updated successfully");
    } else {
      // Create
      const newBadge = {
        id: Math.random().toString(36).substr(2, 9),
        ...values,
        photo: photoUrl,
      };
      setBadges([...badges, newBadge]);
      message.success("Badge created successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  // View Students with Badge
  const handleViewStudents = (badge) => {
    setSelectedBadge(badge);
    setIsStudentModalVisible(true);
  };

  // Get Students with Selected Badge
  const getStudentsWithBadge = () => {
    if (!selectedBadge) return [];

    const studentBadgeIds = mockStudentBadges
      .filter((sb) => sb.badge_id === selectedBadge.id)
      .map((sb) => sb.student_id);

    return mockStudents.filter((student) =>
      studentBadgeIds.includes(student.id)
    );
  };

  const uploadProps = {
    listType: "picture-card",
    fileList: fileList,
    onChange: handleUploadChange,
    customRequest: customUploadRequest,
    maxCount: 1,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isImage && isLt2M;
    },
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Badges Management</h1>
        <Button type="primary" onClick={handleCreate}>
          <span className="fa fa-plus mr-2" />
          Create New Badge
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <Card
            key={badge.id}
            hoverable
            className="shadow-md dark:bg-black dark:text-white"
          >
            <div className="flex items-center mb-4">
              <img
                src={badge.photo}
                alt={badge.name}
                className="w-20 h-20 aspect-square rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{badge.name}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <Button onClick={() => handleViewStudents(badge)}>
                <span className="fa fa-users mr-2" />
                View Students
              </Button>
              <Button onClick={() => handleEdit(badge)}>
                <span className="fa fa-edit mr-2" />
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this badge?"
                onConfirm={() => handleDelete(badge.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>
                  <span className="fa fa-trash mr-2" />
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        title={editingBadge ? "Edit Badge" : "Create New Badge"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setFileList([]);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="name"
            label="Badge Name"
            rules={[{ required: true, message: "Please input badge name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Badge Photo"
            rules={[{ required: true, message: "Please upload a photo!" }]}
          >
            <Upload {...uploadProps}>
              {fileList.length < 1 && (
                <div>
                  <span className="fa-solid fa-upload" />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setFileList([]);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingBadge ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Students Modal */}
      <Modal
        title={`Students with ${selectedBadge?.name} Badge`}
        open={isStudentModalVisible}
        onCancel={() => setIsStudentModalVisible(false)}
        footer={null}
      >
        <div className="space-y-4">
          {getStudentsWithBadge().map((student) => (
            <Card key={student.id} size="small">
              <div className="flex items-center">
                <span className="fa fa-user-circle text-2xl mr-3" />
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-600">
                    {
                      mockStudentBadges.find(
                        (sb) =>
                          sb.student_id === student.id &&
                          sb.badge_id === selectedBadge?.id
                      )?.description
                    }
                  </p>
                </div>
              </div>
            </Card>
          ))}
          {getStudentsWithBadge().length === 0 && (
            <p className="text-center text-gray-500">
              No students have earned this badge yet.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BadgesManagement;
