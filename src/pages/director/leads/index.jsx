import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  Tabs,
  Statistic,
  Card,
  notification,
  Space,
  Dropdown,
  Menu,
  Tooltip,
} from "antd";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

// Empty arrays instead of mock data
const initialLeads = [
  {
    id: 1,
    name: "Akira Tanaka",
    age: 15,
    email: "akira@example.com",
    phone: "090-1234-5678",
    preferredCourse: "English",
    level: "Intermediate",
    availability: ["Monday", "Wednesday"],
    availabilityTime: "15:00-17:00",
    guardian: "Yuki Tanaka",
    guardianContact: "090-8765-4321",
    status: "New Inquiry",
    source: "Website",
    notes: "Interested in conversation practice",
    createdAt: "2025-02-20",
    lastContact: "2025-02-20",
    contactCount: 0,
    trialLesson: null,
  },
  {
    id: 2,
    name: "Emma Wilson",
    age: 12,
    email: "parent@example.com",
    phone: "080-2345-6789",
    preferredCourse: "English",
    level: "Beginner",
    availability: ["Tuesday", "Thursday", "Friday"],
    availabilityTime: "16:00-18:00",
    guardian: "James Wilson",
    guardianContact: "080-3456-7890",
    status: "Contacted",
    source: "Referral",
    notes: "Need help with school English",
    createdAt: "2025-02-15",
    lastContact: "2025-02-22",
    contactCount: 1,
    trialLesson: "2025-03-05 16:00",
  },
  {
    id: 3,
    name: "Mei Suzuki",
    age: 28,
    email: "mei.s@example.com",
    phone: "070-3456-7890",
    preferredCourse: "Japanese",
    level: "Advanced",
    availability: ["Saturday", "Sunday"],
    availabilityTime: "10:00-15:00",
    guardian: "",
    guardianContact: "",
    status: "Trial Lesson Booked",
    source: "Social Media",
    notes: "Preparing for JLPT N1",
    createdAt: "2025-02-10",
    lastContact: "2025-02-25",
    contactCount: 2,
    trialLesson: "2025-03-02 11:00",
  },
  {
    id: 4,
    name: "Thomas Brown",
    age: 32,
    email: "thomas@example.com",
    phone: "070-9876-5432",
    preferredCourse: "Japanese",
    level: "Beginner",
    availability: ["Monday", "Wednesday", "Friday"],
    availabilityTime: "19:00-21:00",
    guardian: "",
    guardianContact: "",
    status: "Enrolled",
    source: "Website",
    notes: "Business purposes",
    createdAt: "2025-02-05",
    lastContact: "2025-02-20",
    contactCount: 3,
    trialLesson: "2025-02-15 19:00",
  },
  {
    id: 5,
    name: "Sakura Ito",
    age: 8,
    email: "parent.ito@example.com",
    phone: "090-5678-1234",
    preferredCourse: "English",
    level: "Beginner",
    availability: ["Monday", "Tuesday", "Thursday"],
    availabilityTime: "16:00-18:00",
    guardian: "Kenji Ito",
    guardianContact: "090-1234-5678",
    status: "Not Interested",
    source: "Flyer",
    notes: "Price too high for parent",
    createdAt: "2025-02-12",
    lastContact: "2025-02-18",
    contactCount: 2,
    trialLesson: null,
  },
];

// Status color mapping
const statusColors = {
  "New Inquiry": "blue",
  Contacted: "orange",
  "Trial Lesson Booked": "purple",
  Enrolled: "green",
  "Not Interested": "red",
};

// Source data for chart
const sourceData = [
  { name: "Website", value: 35 },
  { name: "Referral", value: 25 },
  { name: "Social Media", value: 20 },
  { name: "Flyer", value: 10 },
  { name: "Other", value: 10 },
];

// Contact count data for chart
const contactData = [
  { name: "1 Contact", value: 45 },
  { name: "2 Contacts", value: 30 },
  { name: "3+ Contacts", value: 25 },
];

// Conversion data for chart
const conversionData = [
  { name: "New Inquiry", count: 50 },
  { name: "Contacted", count: 40 },
  { name: "Trial Lesson Booked", count: 30 },
  { name: "Enrolled", count: 20 },
  { name: "Not Interested", count: 10 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF00AA",
  "#8888FE",
  "#0000FE",
  "#1890ff",
  "#fa8c16",
  "#722ed1",
  "#52c41a",
];

const LeadManagement = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [visible, setVisible] = useState(false);
  const [trialVisible, setTrialVisible] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [currentLead, setCurrentLead] = useState(null);
  const [form] = Form.useForm();
  const [trialForm] = Form.useForm();
  const [filteredStatus, setFilteredStatus] = useState(null);

  // Handle form submission for new/edit lead
  const handleSubmit = (values) => {
    console.log("Form values:", values);

    const formattedValues = {
      ...values,
      createdAt: editingLead
        ? editingLead.createdAt
        : moment().format("YYYY-MM-DD"),
      lastContact: moment().format("YYYY-MM-DD"),
      contactCount: editingLead ? editingLead.contactCount : 0,
      trialLesson: editingLead ? editingLead.trialLesson : null,
    };

    if (editingLead) {
      // Update existing lead
      const updatedLeads = leads.map((lead) =>
        lead.id === editingLead.id ? { ...lead, ...formattedValues } : lead
      );
      setLeads(updatedLeads);
      notification.success({ message: "Lead updated successfully" });
    } else {
      // Add new lead
      const newLead = {
        id:
          leads.length > 0 ? Math.max(...leads.map((lead) => lead.id)) + 1 : 1,
        ...formattedValues,
      };
      setLeads([...leads, newLead]);
      notification.success({ message: "New lead added successfully" });
    }

    setVisible(false);
    form.resetFields();
    setEditingLead(null);
  };

  // Handle opening the trial lesson scheduling modal
  const handleScheduleTrial = (lead) => {
    setCurrentLead(lead);
    trialForm.setFieldsValue({
      leadId: lead.id,
      leadName: lead.name,
      trialDate: lead.trialLesson
        ? moment(lead.trialLesson, "YYYY-MM-DD HH:mm")
        : null,
    });
    setTrialVisible(true);
  };

  // Handle scheduling a trial lesson
  const handleTrialSubmit = (values) => {
    console.log("Trial lesson scheduled:", values);

    const trialDateTime = values.trialDate.format("YYYY-MM-DD HH:mm");
    const updatedLeads = leads.map((lead) => {
      if (lead.id === currentLead.id) {
        return {
          ...lead,
          trialLesson: trialDateTime,
          status: "Trial Lesson Booked",
          lastContact: moment().format("YYYY-MM-DD"),
          contactCount: lead.contactCount + 1,
        };
      }
      return lead;
    });

    setLeads(updatedLeads);
    setTrialVisible(false);
    trialForm.resetFields();
    notification.success({ message: "Trial lesson scheduled successfully" });
  };

  // Handle lead status change
  const handleStatusChange = (lead, newStatus) => {
    const updatedLeads = leads.map((l) => {
      if (l.id === lead.id) {
        return {
          ...l,
          status: newStatus,
          lastContact: moment().format("YYYY-MM-DD"),
          contactCount: l.contactCount + 1,
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    notification.success({ message: `Lead status updated to ${newStatus}` });
  };

  // Handle lead delete
  const handleDelete = (leadId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this lead?",
      content: "This action cannot be undone.",
      onOk: () => {
        const updatedLeads = leads.filter((lead) => lead.id !== leadId);
        setLeads(updatedLeads);
        notification.success({ message: "Lead deleted successfully" });
      },
    });
  };

  // Columns for leads table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Age: {record.age}
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "email",
      key: "contact",
      render: (_, record) => (
        <div>
          <div className="text-sm">{record.email}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {record.phone}
          </div>
          {record.guardian && (
            <div className="text-xs mt-1">
              <span className="text-gray-600 dark:text-gray-300">
                Guardian:{" "}
              </span>
              {record.guardian} ({record.guardianContact})
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Course Interest",
      key: "course",
      render: (_, record) => (
        <div>
          <div>{record.preferredCourse}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Level: {record.level}
          </div>
        </div>
      ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      filters: [
        { text: "Website", value: "Website" },
        { text: "Referral", value: "Referral" },
        { text: "Social Media", value: "Social Media" },
        { text: "Flyer", value: "Flyer" },
        { text: "Other", value: "Other" },
      ],
      onFilter: (value, record) => record.source === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]} className="px-2 py-1">
          {status}
        </Tag>
      ),
      filters: [
        { text: "New Inquiry", value: "New Inquiry" },
        { text: "Contacted", value: "Contacted" },
        { text: "Trial Lesson Booked", value: "Trial Lesson Booked" },
        { text: "Enrolled", value: "Enrolled" },
        { text: "Not Interested", value: "Not Interested" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Trial Lesson",
      key: "trial",
      render: (_, record) => (
        <div>
          {record.trialLesson ? (
            <div className="text-sm">
              <span className="mr-1">
                <i className="fa fa-calendar-check text-green-500"></i>
              </span>
              {moment(record.trialLesson).format("YYYY-MM-DD HH:mm")}
            </div>
          ) : (
            <Button
              type="link"
              onClick={() => handleScheduleTrial(record)}
              disabled={
                record.status === "Enrolled" ||
                record.status === "Not Interested"
              }
              className="p-0"
            >
              <i className="fa fa-calendar-plus mr-1"></i> Schedule
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Last Contact",
      key: "contact",
      render: (_, record) => (
        <div>
          <div>{record.lastContact}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Contact Count: {record.contactCount}
          </div>
        </div>
      ),
      sorter: (a, b) =>
        moment(a.lastContact).unix() - moment(b.lastContact).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Lead">
            <Button
              type="text"
              icon={<span className="fa-solid fa-edit" />}
              onClick={() => {
                setEditingLead(record);
                form.setFieldsValue({
                  ...record,
                  availability: record.availability || [],
                });
                setVisible(true);
              }}
            />
          </Tooltip>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => handleStatusChange(record, "New Inquiry")}
                  disabled={record.status === "New Inquiry"}
                >
                  <Tag color={statusColors["New Inquiry"]} className="mr-2">
                    New Inquiry
                  </Tag>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => handleStatusChange(record, "Contacted")}
                  disabled={record.status === "Contacted"}
                >
                  <Tag color={statusColors["Contacted"]} className="mr-2">
                    Contacted
                  </Tag>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() =>
                    handleStatusChange(record, "Trial Lesson Booked")
                  }
                  disabled={
                    record.status === "Trial Lesson Booked" ||
                    !record.trialLesson
                  }
                >
                  <Tag
                    color={statusColors["Trial Lesson Booked"]}
                    className="mr-2"
                  >
                    Trial Lesson Booked
                  </Tag>
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => handleStatusChange(record, "Enrolled")}
                  disabled={record.status === "Enrolled"}
                >
                  <Tag color={statusColors["Enrolled"]} className="mr-2">
                    Enrolled
                  </Tag>
                </Menu.Item>
                <Menu.Item
                  key="5"
                  onClick={() => handleStatusChange(record, "Not Interested")}
                  disabled={record.status === "Not Interested"}
                >
                  <Tag color={statusColors["Not Interested"]} className="mr-2">
                    Not Interested
                  </Tag>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              type="text"
              icon={<span className="fa-solid fa-filter" />}
            />
          </Dropdown>

          <Tooltip title="Delete Lead">
            <Button
              type="text"
              danger
              icon={<span className="fa-solid fa-trash" />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Calculate statistics
  const totalLeads = leads.length;
  const newInquiries = leads.filter(
    (lead) => lead.status === "New Inquiry"
  ).length;
  const enrolled = leads.filter((lead) => lead.status === "Enrolled").length;
  const conversionRate =
    totalLeads > 0 ? Math.round((enrolled / totalLeads) * 100) : 0;
  const multipleContacts = leads.filter((lead) => lead.contactCount > 1).length;
  const multipleContactRate =
    totalLeads > 0 ? Math.round((multipleContacts / totalLeads) * 100) : 0;

  return (
    <div className="p-6 pb-16 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Lead Management
        </h1>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setEditingLead(null);
              form.resetFields();
              setVisible(true);
            }}
            icon={<span className="fa-solid fa-user-plus" />}
          >
            Add New Lead
          </Button>
        </div>
      </div>

      <Tabs defaultActiveKey="leads" className="mb-6">
        <TabPane tab="Leads" key="leads">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <Statistic
                title="Total Leads"
                value={totalLeads}
                prefix={<span className="fa-solid fa-user-plus" />}
              />
            </Card>
            <Card>
              <Statistic
                title="New Inquiries"
                value={newInquiries}
                prefix={<i className="fa fa-bell text-blue-500 mr-2"></i>}
              />
            </Card>
            <Card>
              <Statistic
                title="Conversion Rate"
                value={conversionRate}
                suffix="%"
                prefix={
                  <span className="fa-solid fa-circle-check text-green-500 mr-1" />
                }
              />
            </Card>
            <Card>
              <Statistic
                title="Multiple Follow-ups"
                value={multipleContactRate}
                suffix="%"
                prefix={
                  <span className="fa-solid fa-phone text-orange-500 mr-1" />
                }
              />
            </Card>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
              <div className="text-lg font-medium">Potential Students</div>
              <div>
                <Space>
                  <Select
                    placeholder="Filter by Status"
                    allowClear
                    style={{ width: 180 }}
                    onChange={(value) => setFilteredStatus(value)}
                  >
                    <Option value="New Inquiry">New Inquiry</Option>
                    <Option value="Contacted">Contacted</Option>
                    <Option value="Trial Lesson Booked">
                      Trial Lesson Booked
                    </Option>
                    <Option value="Enrolled">Enrolled</Option>
                    <Option value="Not Interested">Not Interested</Option>
                  </Select>
                  <Button
                    type="default"
                    icon={<span className="fa-solid fa-upload" />}
                    onClick={() => console.log("Export leads")}
                  >
                    Export
                  </Button>
                </Space>
              </div>
            </div>
            <Table
              scroll={{ x: true }}
              dataSource={
                filteredStatus
                  ? leads.filter((lead) => lead.status === filteredStatus)
                  : leads
              }
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-semibold mb-1">
                          Availability
                        </div>
                        <div>
                          {record.availability.join(", ")} (
                          {record.availabilityTime})
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-1">
                          Created
                        </div>
                        <div>{record.createdAt}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-1">Notes</div>
                        <div>{record.notes}</div>
                      </div>
                    </div>
                  </div>
                ),
              }}
            />
          </div>
        </TabPane>

        <TabPane tab="Analytics" key="analytics">
          <Card title="Lead Source Distribution">
            <div className="flex items-center justify-center h-64">
              {sourceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {sourceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-gray-500 text-center">
                  No source data available. Add leads to see analytics.
                </div>
              )}
            </div>
          </Card>

          <Card title="Lead Conversion Funnel">
            <div className="flex items-center justify-center h-64">
              {conversionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-gray-500 text-center">
                  No conversion data available. Add leads to see analytics.
                </div>
              )}
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* Lead Form Modal */}
      <Modal
        title={editingLead ? "Edit Lead" : "Add New Lead"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          setEditingLead(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "New Inquiry",
            availability: [],
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Enter student's full name" />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please enter the age" }]}
            >
              <Input type="number" min={1} max={100} placeholder="Enter age" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter the phone number" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              name="preferredCourse"
              label="Preferred Course"
              rules={[{ required: true, message: "Please select a course" }]}
            >
              <Select placeholder="Select a course">
                <Option value="English">English</Option>
                <Option value="Japanese">Japanese</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="level"
              label="Level"
              rules={[{ required: true, message: "Please select a level" }]}
            >
              <Select placeholder="Select level">
                <Option value="Beginner">Beginner</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="availability"
              label="Availability Days"
              rules={[
                { required: true, message: "Please select availability" },
              ]}
            >
              <Select mode="multiple" placeholder="Select available days">
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
                <Option value="Saturday">Saturday</Option>
                <Option value="Sunday">Sunday</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="availabilityTime"
              label="Availability Time"
              rules={[
                { required: true, message: "Please enter available time" },
              ]}
            >
              <Input placeholder="e.g., 15:00-18:00" />
            </Form.Item>

            <Form.Item
              name="guardian"
              label="Parent/Guardian Name"
              rules={[
                {
                  required: form.getFieldValue("age") < 18,
                  message: "Please enter guardian name for minors",
                },
              ]}
            >
              <Input placeholder="For students under 18" />
            </Form.Item>

            <Form.Item
              name="guardianContact"
              label="Parent/Guardian Contact"
              rules={[
                {
                  required: form.getFieldValue("age") < 18,
                  message: "Please enter guardian contact for minors",
                },
              ]}
            >
              <Input placeholder="Phone or email" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Select status">
                <Option value="New Inquiry">New Inquiry</Option>
                <Option value="Contacted">Contacted</Option>
                <Option value="Trial Lesson Booked">Trial Lesson Booked</Option>
                <Option value="Enrolled">Enrolled</Option>
                <Option value="Not Interested">Not Interested</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="source"
              label="Lead Source"
              rules={[{ required: true, message: "Please select a source" }]}
            >
              <Select placeholder="Where did they hear about us?">
                <Option value="Website">Website</Option>
                <Option value="Referral">Referral</Option>
                <Option value="Social Media">Social Media</Option>
                <Option value="Flyer">Flyer</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={4} placeholder="Additional information..." />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button
              onClick={() => {
                setVisible(false);
                form.resetFields();
                setEditingLead(null);
              }}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingLead ? "Update Lead" : "Add Lead"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Trial Lesson Scheduling Modal */}
      <Modal
        title="Schedule Trial Lesson"
        visible={trialVisible}
        onCancel={() => {
          setTrialVisible(false);
          trialForm.resetFields();
        }}
        footer={null}
      >
        <Form form={trialForm} layout="vertical" onFinish={handleTrialSubmit}>
          <Form.Item name="leadId" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="leadName" label="Student">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="trialDate"
            label="Trial Lesson Date & Time"
            rules={[{ required: true, message: "Please select date and time" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea
              rows={3}
              placeholder="Any additional information..."
            />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button
              onClick={() => {
                setTrialVisible(false);
                trialForm.resetFields();
              }}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Schedule Trial
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeadManagement;
