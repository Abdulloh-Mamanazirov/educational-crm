import React, { useState } from "react";
import {
  Avatar,
  Button,
  Tabs,
  Form,
  Input,
  DatePicker,
  Radio,
  Upload,
  message,
  Tooltip,
} from "antd";
import moment from "moment";

const { TextArea } = Input;

const StudentProfile = () => {
  // Initial mock data (replace with real data from your backend)
  const initialData = {
    name: "John Doe",
    username: "johndoe",
    phone: "+1 (555) 123-4567",
    parent_name: "Jane Doe",
    parent_phone: "+1 (555) 987-6543",
    birthdate: "2005-06-15",
    photo:
      "https://fastly.picsum.photos/id/953/200/300.jpg?hmac=8Bva5vDegltHxuHoyR882pbfhUI_t7iErL2SPtKrQRU",
    description: "Aspiring developer and avid learner.",
    gender: "Male",
    nationality: "American",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
  };

  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Handle form submission
  const onSave = (values) => {
    // Here you would typically send the updated data to your backend
    setFormData({ ...formData, ...values });
    setIsEditing(false);
    message.success("Profile updated successfully!");
  };

  // Handle edit button click
  const onEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      ...formData,
      birthdate: moment(formData.birthdate),
    });
  };

  // Handle cancel editing
  const onCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <div className="flex items-center flex-col md:flex-row">
          {/* Avatar */}
          <div className="relative mr-6">
            <Avatar
              size={200}
              src={formData.photo}
              alt="Student Avatar"
              style={{ outline: "1px solid gray" }}
            />
            {isEditing && (
              <Upload
                name="photo"
                showUploadList={false}
                beforeUpload={(file) => {
                  // Handle file upload logic here
                  // For now, we'll just simulate an upload
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setFormData({ ...formData, photo: e.target.result });
                  };
                  reader.readAsDataURL(file);
                  return false; // Prevent upload
                }}
              >
                <Button
                  icon={<span className="fa-solid fa-upload" />}
                  size="small"
                  className="absolute bottom-0 right-0"
                />
              </Upload>
            )}
          </div>
          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {formData.name}
              </h1>
              {!isEditing ? (
                <Button
                  icon={<span className="fa-solid fa-edit" />}
                  onClick={onEdit}
                >
                  Edit
                </Button>
              ) : (
                <div>
                  <Button
                    type="primary"
                    icon={<span className="fa-solid fa-save" />}
                    htmlType="submit"
                    form="profileForm"
                  >
                    Save
                  </Button>
                  <Button type="default" onClick={onCancel} className="ml-2">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              @{formData.username}
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {formData.description}
            </p>
            {/* Contact Info */}
            <div className="mt-4 space-y-2">
              {formData.email && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="fa-solid fa-envelope mr-2" />
                  {formData.email}
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="fa-solid fa-phone mr-2" />
                  {formData.phone}
                </div>
              )}
              {formData.address && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="fa-solid fa-location-dot mr-2" />
                  {formData.address}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: 1,
              label: <span className="dark:text-white">Profile</span>,
              children: (
                <div>
                  {!isEditing ? (
                    // Display Profile Information
                    <div className="space-y-4 dark:text-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong>Name:</strong> {formData.name}
                        </div>
                        <div>
                          <strong>Username:</strong> {formData.username}
                        </div>
                        <div>
                          <strong>Phone:</strong> {formData.phone}
                        </div>
                        <div>
                          <strong>Parent's Name:</strong> {formData.parent_name}
                        </div>
                        <div>
                          <strong>Parent's Phone:</strong>{" "}
                          {formData.parent_phone}
                        </div>
                        <div>
                          <strong>Birthdate:</strong>{" "}
                          {moment(formData.birthdate).format("YYYY-MM-DD")}
                        </div>
                        <div>
                          <strong>Gender:</strong> {formData.gender}
                        </div>
                        <div>
                          <strong>Nationality:</strong> {formData.nationality}
                        </div>
                        <div>
                          <strong>Email:</strong> {formData.email}
                        </div>
                        <div>
                          <strong>Address:</strong> {formData.address}
                        </div>
                      </div>
                      {formData.description && (
                        <div>
                          <strong>Description:</strong>
                          <p>{formData.description}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Editable Form
                    <Form
                      form={form}
                      id="profileForm"
                      layout="vertical"
                      onFinish={onSave}
                      initialValues={{
                        ...formData,
                        birthdate: moment(formData.birthdate),
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <Form.Item
                          label={<span className="dark:text-white">Name</span>}
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">Username</span>
                          }
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your username",
                            },
                          ]}
                        >
                          <Input disabled style={{ background: "#ddd" }} />
                        </Form.Item>
                        <Form.Item
                          label={<span className="dark:text-white">Phone</span>}
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your phone number",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">
                              Parent's Name
                            </span>
                          }
                          name="parent_name"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">
                              Parent's Phone
                            </span>
                          }
                          name="parent_phone"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">Birthdate</span>
                          }
                          name="birthdate"
                        >
                          <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">Gender</span>
                          }
                          name="gender"
                        >
                          <Radio.Group>
                            <Radio value="Male" className="dark:text-white">
                              Male
                            </Radio>
                            <Radio value="Female" className="dark:text-white">
                              Female
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">Nationality</span>
                          }
                          name="nationality"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={<span className="dark:text-white">Email</span>}
                          name="email"
                        >
                          <Input type="email" />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="dark:text-white">Address</span>
                          }
                          name="address"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <Form.Item
                        label={
                          <span className="dark:text-white">Description</span>
                        }
                        name="description"
                      >
                        <TextArea rows={4} />
                      </Form.Item>
                      {/* Save button is added to the header during editing */}
                    </Form>
                  )}
                </div>
              ),
            },
            {
              key: 2,
              label: <span className="dark:text-white">Badges</span>,
              children: (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Mock badges */}
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                    (badge, ind) => (
                      <Tooltip key={ind} title={badge}>
                        <div
                          key={badge}
                          className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg"
                        >
                          <img
                            src={`https://robohash.org/${badge}`}
                            alt={`${badge} Badge`}
                            className="mb-2 aspect-square object-cover rounded-full bg-white dark:bg-dark-s"
                          />
                          <span className="text-gray-800 dark:text-gray-100">
                            {badge}
                          </span>
                        </div>
                      </Tooltip>
                    )
                  )}
                </div>
              ),
            },
          ]}
        >
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;
