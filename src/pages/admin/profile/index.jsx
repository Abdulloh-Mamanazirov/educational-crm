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
  List,
  Modal,
} from "antd";
import moment from "moment";

const { TextArea } = Input;

const AdminProfile = () => {
  // Initial mock data (replace with real data from your backend)
  const initialData = {
    name: "Admin Smith",
    username: "adminsmith",
    phone: "+1 (555) 123-4567",
    rank: "Admin",
    photo:
      "https://fastly.picsum.photos/id/658/200/300.jpg?hmac=K1TI0jSVU6uQZCZkkCMzBiau45UABMHNIqoaB9icB_0",
    birthdate: "1980-05-20",
    description: "Dedicated, hard-working and kind.",
    gender: "Male",
    nationality: "American",
    email: "adminsmith@example.com",
    address: "456 College Ave, University Town, USA",
    certifications: "Bachelor in Economics",
  };

  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Experience and Education Data
  const [experience, setExperience] = useState([
    {
      id: 1,
      institution: "State University",
      position: "Lecturer",
      startDate: "2010-08-01",
      endDate: "2015-07-31",
    },
    // Add more experience entries as needed
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      institution: "Tech Institute",
      degree: "M.Sc. in Mathematics",
      startDate: "2005-09-01",
      endDate: "2007-06-30",
    },
    // Add more education entries as needed
  ]);

  // Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalForm] = Form.useForm();
  const [modalType, setModalType] = useState(""); // 'experience' or 'education'
  const [editingRecord, setEditingRecord] = useState(null);

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

  // Handle Modal Submission
  const handleModalOk = () => {
    modalForm.validateFields().then((values) => {
      const updatedData =
        modalType === "experience" ? [...experience] : [...education];

      if (editingRecord) {
        // Update existing record
        const index = updatedData.findIndex(
          (item) => item.id === editingRecord.id
        );
        updatedData[index] = { ...editingRecord, ...values };
      } else {
        // Add new record
        const newEntry = {
          id: Date.now(),
          ...values,
        };
        updatedData.push(newEntry);
      }

      if (modalType === "experience") {
        setExperience(updatedData);
      } else {
        setEducation(updatedData);
      }

      modalForm.resetFields();
      setEditingRecord(null);
      setIsModalVisible(false);
      message.success(
        `${
          modalType === "experience" ? "Experience" : "Education"
        } updated successfully!`
      );
    });
  };

  // Handle Modal Cancel
  const handleModalCancel = () => {
    modalForm.resetFields();
    setEditingRecord(null);
    setIsModalVisible(false);
  };

  // Open Modal for Adding or Editing
  const openModal = (type, record = null) => {
    setModalType(type);
    setEditingRecord(record);
    setIsModalVisible(true);
    if (record) {
      modalForm.setFieldsValue({
        ...record,
        startDate: moment(record.startDate),
        endDate: moment(record.endDate),
      });
    }
  };

  // Delete Entry
  const deleteEntry = (type, id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: () => {
        if (type === "experience") {
          setExperience(experience.filter((item) => item.id !== id));
        } else {
          setEducation(education.filter((item) => item.id !== id));
        }
        message.success("Entry deleted successfully!");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <div className="flex items-center">
          {/* Avatar */}
          <div className="relative mr-6">
            <Avatar size={200} src={formData.photo} alt="Admin Avatar" />
            {isEditing && (
              <Upload
                name="photo"
                showUploadList={false}
                beforeUpload={(file) => {
                  // Handle file upload logic here
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
              @{formData.username} - {formData.rank}
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
                          <strong>Rank:</strong> {formData.rank}
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
                        <div>
                          <strong>Certifications:</strong>{" "}
                          {formData.certifications}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          label={<span className="dark:text-white">Rank</span>}
                          name="rank"
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
                        <Form.Item
                          label={
                            <span className="dark:text-white">
                              Certifications
                            </span>
                          }
                          name="certifications"
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
              label: <span className="dark:text-white">Experience</span>,
              children: (
                <div>
                  <div className="mb-4 flex justify-end">
                    <Button
                      icon={<span className="fa-solid fa-plus" />}
                      type="primary"
                      onClick={() => openModal("experience")}
                    >
                      Add Experience
                    </Button>
                  </div>
                  <List
                    itemLayout="vertical"
                    dataSource={experience}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            type="link"
                            onClick={() => openModal("experience", item)}
                          >
                            Edit
                          </Button>,
                          <Button
                            type="link"
                            danger
                            onClick={() => deleteEntry("experience", item.id)}
                          >
                            Delete
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={
                            <span className="dark:text-white">
                              {item.institution}
                            </span>
                          }
                          description={
                            <span className="dark:text-white">
                              {item.position} (
                              {moment(item.startDate).format("MMM YYYY")} -
                              {item.endDate
                                ? moment(item.endDate).format("MMM YYYY")
                                : " present"}
                              )
                            </span>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
            {
              key: 3,
              label: <span className="dark:text-white">Education</span>,
              children: (
                <div>
                  <div className="mb-4 flex justify-end">
                    <Button
                      icon={<span className="fa-solid fa-plus" />}
                      type="primary"
                      onClick={() => openModal("education")}
                    >
                      Add Education
                    </Button>
                  </div>
                  <List
                    itemLayout="vertical"
                    dataSource={education}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            type="link"
                            onClick={() => openModal("education", item)}
                          >
                            Edit
                          </Button>,
                          <Button
                            type="link"
                            danger
                            onClick={() => deleteEntry("education", item.id)}
                          >
                            Delete
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={
                            <span className="dark:text-white">
                              {item.institution}
                            </span>
                          }
                          description={
                            <span className="dark:text-white">
                              {item.degree} (
                              {moment(item.startDate).format("MMM YYYY")} -
                              {item.endDate
                                ? moment(item.endDate).format("MMM YYYY")
                                : " present"}
                              )
                            </span>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
          ]}
        ></Tabs>
      </div>

      {/* Modal for Experience and Education */}
      <Modal
        title={
          editingRecord
            ? `Edit ${modalType}`
            : `Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
      >
        <Form form={modalForm} layout="vertical">
          <Form.Item
            label={modalType === "experience" ? "Workplace" : "Institution"}
            name="institution"
            rules={[
              {
                required: true,
                message: "Please enter the institution or workplace name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={modalType === "experience" ? "Position" : "Degree"}
            name={modalType === "experience" ? "position" : "degree"}
            rules={[
              {
                required: true,
                message: `Please enter your ${
                  modalType === "experience" ? "position" : "degree"
                }`,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please enter the start date" }]}
          >
            <DatePicker picker="month" format="YYYY-MM" />
          </Form.Item>
          <Form.Item label="End Date" name="endDate">
            <DatePicker picker="month" format="YYYY-MM" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProfile;
