import React, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Tabs,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button,
  Card,
  List,
  Typography,
  Space,
  Table,
  Tag,
  message,
  Popconfirm,
  Divider,
  Tooltip,
  Spin,
  Alert,
  Modal, // Added Modal
} from "antd";
import moment from "moment";
// Import constants and helpers
import {
  PAYMENT_IDS,
  SERVICE_KEYS,
  DOCUMENT_STATUS,
  PAYMENT_STATUS,
  RECEIPT_STATUS,
  SERVICE_STATUS,
  UNIVERSITY_STATUS,
  servicePackages,
  defaultRequiredDocs,
  getDocumentStatusProps,
  getPaymentTagProps,
} from "./constants/consultingConstants";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text, Link } = Typography;

// --- Reusable Service Status Card (SRP) ---
const ServiceStatusCard = ({
  serviceKey,
  title,
  icon,
  currentStatus,
  availableStatuses,
  onStatusChange,
  loading,
  requiredPackage,
}) => {
  // Check if the service is relevant for the current package implicitly via props or explicitly
  // For simplicity, we assume the parent component filters which cards to render

  const handleChange = (value) => {
    onStatusChange(serviceKey, value);
  };

  return (
    <Card
      title={
        <span className="dark:text-white">
          <i className={`${icon} mr-2`}></i>
          {title} {requiredPackage && `(Package ${requiredPackage}+)`}
        </span>
      }
      size="small"
      className="dark:bg-gray-700 dark:border-gray-600"
    >
      <Select
        value={currentStatus}
        onChange={handleChange}
        style={{ width: "100%" }} // Make select wider
        disabled={loading}
        loading={loading}
        className="dark:bg-gray-600 rounded-md [&>div]:dark:text-white"
      >
        {availableStatuses.map((status) => (
          <Option key={status.value} value={status.value}>
            <span className="dark:text-gray-800">{status.label}</span>
          </Option>
        ))}
      </Select>
    </Card>
  );
};

// --- Main Detail Component ---
const ConsultantStudentManagementPage = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [paymentsForm] = Form.useForm();
  const [newDocName, setNewDocName] = useState("");
  const [newUniversityName, setNewUniversityName] = useState(""); // For adding universities
  const [isModalVisible, setIsModalVisible] = useState(false); // For viewing uploaded receipt (example)
  const [receiptUrl, setReceiptUrl] = useState(""); // For viewing uploaded receipt (example)

  // --- Enhanced Dummy Data Structure ---
  const initialDummyData = {
    id: studentId,
    name: "Alice Wonderland",
    email: "alice.w@example.com",
    dob: "2005-08-15",
    phone: "+1-555-123-4567",
    major: "Computer Science",
    country: "USA",
    semester: "Fall 2025",
    budget: 30000,
    servicePackage: 1,
    // -- University Management --
    universities: [
      // { id: 'uni_1', name: 'Stanford University', status: UNIVERSITY_STATUS.PROPOSED },
      // { id: 'uni_2', name: 'MIT', status: UNIVERSITY_STATUS.PROPOSED }
    ],
    agreedUniversityId: null, // ID of the university student agreed upon
    // -- Documents --
    requiredDocuments: [...defaultRequiredDocs],
    // -- Payments (Now includes Bank Statement Fee) --
    payments: [
      {
        id: PAYMENT_IDS.CONSULTATION,
        type: "Consultation Fee",
        amount: null,
        status: PAYMENT_STATUS.PENDING,
        receiptStatus: RECEIPT_STATUS.NONE,
        receiptUrl: null,
      },
      {
        id: PAYMENT_IDS.APP_FEE,
        type: "Application Fee",
        amount: null,
        status: PAYMENT_STATUS.PENDING,
        receiptStatus: RECEIPT_STATUS.NONE,
        receiptUrl: null,
      },
      {
        id: PAYMENT_IDS.BANK_STATEMENT,
        type: "Bank Statement Service Fee",
        amount: null,
        status: PAYMENT_STATUS.PENDING,
        receiptStatus: RECEIPT_STATUS.NONE,
        receiptUrl: null,
      }, // Added
      {
        id: PAYMENT_IDS.TUITION,
        type: "Tuition Fee",
        amount: null,
        status: PAYMENT_STATUS.PENDING,
        receiptStatus: RECEIPT_STATUS.NONE,
        receiptUrl: null,
      },
      {
        id: PAYMENT_IDS.DORM,
        type: "Dormitory Fee",
        amount: null,
        status: PAYMENT_STATUS.PENDING,
        receiptStatus: RECEIPT_STATUS.NONE,
        receiptUrl: null,
      },
      {
        id: PAYMENT_IDS.OTHER,
        type: "Other Fees",
        amount: null,
        status: PAYMENT_STATUS.PENDING,
        receiptStatus: RECEIPT_STATUS.NONE,
        receiptUrl: null,
      },
    ],
    // -- Service Status --
    serviceStatus: {
      [SERVICE_KEYS.DOC_TRANSLATION]: SERVICE_STATUS.PENDING,
      [SERVICE_KEYS.DOC_SUBMISSION]: SERVICE_STATUS.PENDING,
      [SERVICE_KEYS.BANK_STATEMENT]: SERVICE_STATUS.PENDING, // Status for the service itself
      [SERVICE_KEYS.VISA]: SERVICE_STATUS.PENDING,
      [SERVICE_KEYS.TICKET]: SERVICE_STATUS.PENDING,
    },
  };

  // --- Data Fetching ---
  const fetchStudentData = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      console.log(`Workspaceing data for student ID: ${id}`);
      try {
        // Simulate API Call
        await new Promise((resolve) => setTimeout(resolve, 500));
        // In real app, fetch data for 'id', for now use initial dummy enhanced
        const fetchedData = { ...initialDummyData, id: id }; // Use the passed ID

        // Add some example dynamic data
        if (id === "102") {
          fetchedData.servicePackage = 3;
          fetchedData.universities = [
            {
              id: "uni_3",
              name: "Harvard University",
              status: UNIVERSITY_STATUS.PROPOSED,
            },
          ];
        } else if (id === "103") {
          fetchedData.servicePackage = 2;
        }

        setStudentData(fetchedData);

        // Set form values AFTER data is loaded
        form.setFieldsValue({
          ...fetchedData,
          dob: fetchedData.dob ? moment(fetchedData.dob, "YYYY-MM-DD") : null,
        });

        const paymentFields = fetchedData.payments.reduce((acc, payment) => {
          acc[`payment_amount_${payment.id}`] = payment.amount;
          return acc;
        }, {});
        paymentsForm.setFieldsValue(paymentFields);
      } catch (err) {
        console.error("Failed to fetch student details:", err);
        setError(`Could not load details for student ${id}.`);
        setStudentData(null); // Ensure no stale data is shown
      } finally {
        setLoading(false);
      }
    },
    [form, paymentsForm]
  ); // Dependencies for useCallback

  useEffect(() => {
    if (studentId) {
      fetchStudentData(studentId);
    } else {
      // Should not happen if used within ConsultantDashboard, but handle defensively
      setError("No student selected.");
      setLoading(false);
    }
  }, [studentId, fetchStudentData]); // fetchStudentData is now stable due to useCallback

  // --- API Update Function (Example Abstraction) ---
  const updateStudentData = async (updatedFields) => {
    setLoading(true);
    try {
      // Simulate API call to PATCH student data
      await new Promise((resolve) => setTimeout(resolve, 300));
      const updatedData = { ...studentData, ...updatedFields };

      // Update local state - IMPORTANT: merge carefully
      setStudentData((prevData) => ({ ...prevData, ...updatedFields }));

      // Update forms if necessary (e.g., if API returns slightly different data)
      // form.setFieldsValue({ ...updatedData, dob: ... });
      // paymentsForm.setFieldsValue({ ... });

      message.success("Student data updated successfully!");
      return updatedData; // Return updated data if needed
    } catch (error) {
      console.error("API Update Failed:", error);
      message.error("Failed to update student data.");
      // Optionally revert local state or re-fetch
      // fetchStudentData(studentId);
      throw error; // Re-throw error for caller to handle if needed
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers using the abstracted update function ---
  const handleBasicInfoSave = async (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
    };
    await updateStudentData(formattedValues);
  };

  const handlePackageChange = async (value) => {
    await updateStudentData({ servicePackage: value });
    // Maybe clear/reset certain fields based on package change?
  };

  const handleAddUniversity = async () => {
    if (!newUniversityName.trim()) {
      message.warning("Please enter a university name.");
      return;
    }
    const newUni = {
      id: `uni_${Date.now()}`, // Use UUID in real app
      name: newUniversityName.trim(),
      status: UNIVERSITY_STATUS.PROPOSED,
    };
    const updatedUniversities = [...studentData.universities, newUni];
    await updateStudentData({ universities: updatedUniversities });
    setNewUniversityName(""); // Clear input
  };

  const handleRemoveUniversity = async (uniId) => {
    const updatedUniversities = studentData.universities.filter(
      (u) => u.id !== uniId
    );
    // If removing the agreed university, reset the agreement status
    const updatedFields = { universities: updatedUniversities };
    if (studentData.agreedUniversityId === uniId) {
      updatedFields.agreedUniversityId = null;
    }
    await updateStudentData(updatedFields);
  };

  const handleAgreeUniversity = async (uniId) => {
    // Mark the selected university as agreed, and others potentially as rejected or just back to proposed
    const updatedUniversities = studentData.universities.map((u) => ({
      ...u,
      status:
        u.id === uniId
          ? UNIVERSITY_STATUS.AGREED
          : u.status === UNIVERSITY_STATUS.AGREED
          ? UNIVERSITY_STATUS.PROPOSED
          : u.status, // Ensure only one is agreed
    }));
    await updateStudentData({
      universities: updatedUniversities,
      agreedUniversityId: uniId,
    });
    message.info(
      "Consultation fee payment can now proceed for the agreed university."
    );
  };

  const handleAddDocument = async () => {
    if (!newDocName.trim()) {
      message.warning("Please enter a document name.");
      return;
    }
    const newDoc = {
      id: `doc_${Date.now()}`,
      name: newDocName.trim(),
      status: DOCUMENT_STATUS.PENDING,
    };
    const updatedDocs = [...studentData.requiredDocuments, newDoc];
    await updateStudentData({ requiredDocuments: updatedDocs });
    setNewDocName("");
  };

  const handleRemoveDocument = async (docId) => {
    if (defaultRequiredDocs.some((doc) => doc.id === docId)) {
      message.error("Cannot remove default required documents.");
      return;
    }
    const updatedDocs = studentData.requiredDocuments.filter(
      (doc) => doc.id !== docId
    );
    await updateStudentData({ requiredDocuments: updatedDocs });
  };

  const handlePaymentsSave = async (values) => {
    const updatedPayments = studentData.payments.map((payment) => ({
      ...payment,
      amount:
        values[`payment_amount_${payment.id}`] !== undefined
          ? values[`payment_amount_${payment.id}`]
          : payment.amount, // Keep old amount if field wasn't rendered/present
    }));
    await updateStudentData({ payments: updatedPayments });
  };

  const handleServiceStatusChange = async (serviceKey, newStatus) => {
    const updatedServiceStatus = {
      ...studentData.serviceStatus,
      [serviceKey]: newStatus,
    };
    await updateStudentData({ serviceStatus: updatedServiceStatus });
  };

  const showReceiptModal = (url) => {
    if (url) {
      setReceiptUrl(url); // Set the URL for the image/PDF
      setIsModalVisible(true);
    } else {
      message.info("No receipt uploaded for this payment.");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setReceiptUrl("");
  };

  // --- Render Logic ---
  if (loading && !studentData) {
    // Initial load spinner
    return (
      <div className="flex justify-center items-center pt-10">
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="m-4"
      />
    );
  }
  if (!studentData) {
    // Should not happen normally if error handling is correct
    return (
      <Alert
        message="Error"
        description="Student data could not be loaded or found."
        type="error"
        showIcon
        className="m-4"
      />
    );
  }

  // Current agreed university name
  const agreedUniversity = studentData.universities.find(
    (u) => u.id === studentData.agreedUniversityId
  );
  const isAgreementMade = !!agreedUniversity; // Boolean check if agreement exists

  // Filter payments based on package for display/editability
  const getFilteredPayments = () => {
    return studentData.payments.filter((p) => {
      switch (p.id) {
        case PAYMENT_IDS.CONSULTATION:
        case PAYMENT_IDS.APP_FEE:
          return studentData.servicePackage >= 1;
        case PAYMENT_IDS.BANK_STATEMENT:
          return studentData.servicePackage >= 2;
        case PAYMENT_IDS.TUITION:
        case PAYMENT_IDS.DORM:
        case PAYMENT_IDS.OTHER:
          return studentData.servicePackage >= 3;
        default:
          return false; // Hide unknown payments? Or show always?
      }
    });
  };

  // Payment Table Columns - Enhanced
  const paymentColumns = [
    {
      title: "Fee Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <Text className="dark:text-gray-300">{text}</Text>,
    },
    {
      title: "Amount (Consultant Sets)",
      key: "amount",
      render: (_, record) => {
        // Determine if amount should be editable based on package
        let canEdit = false;
        switch (record.id) {
          case PAYMENT_IDS.CONSULTATION:
          case PAYMENT_IDS.APP_FEE:
            canEdit = studentData.servicePackage >= 1;
            break;
          case PAYMENT_IDS.BANK_STATEMENT:
            canEdit = studentData.servicePackage >= 2;
            break;
          case PAYMENT_IDS.TUITION:
          case PAYMENT_IDS.DORM:
          case PAYMENT_IDS.OTHER:
            canEdit = studentData.servicePackage >= 3;
            break;
          default:
            break;
        }

        return (
          <Form.Item
            name={`payment_amount_${record.id}`}
            noStyle
            rules={[{ type: "number", min: 0, message: "Invalid amount" }]}
          >
            <InputNumber
              prefix="$"
              className="w-32 dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-500"
              disabled={loading || !canEdit} // Disable if loading or package doesn't allow
              placeholder={!canEdit ? "N/A for Pkg" : "Set Amount"}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Payment Status (Student Action)",
      key: "status",
      render: (_, record) => {
        const { text, icon, color } = getPaymentTagProps(
          record.status,
          record.receiptStatus
        );
        return (
          <Space>
            <Tag color={color} icon={<i className={`${icon} mr-1`}></i>}>
              <span className="dark:text-gray-800">{text}</span>
            </Tag>
            {/* Add button to view receipt if uploaded */}
            {(record.receiptStatus === RECEIPT_STATUS.UPLOADED ||
              record.receiptStatus === RECEIPT_STATUS.VERIFIED) &&
              record.receiptUrl && (
                <Tooltip title="View Uploaded Receipt">
                  <Button
                    type="link"
                    size="small"
                    icon={<i className="fas fa-receipt"></i>}
                    onClick={() => showReceiptModal(record.receiptUrl)}
                    className="dark:text-blue-400"
                  />
                </Tooltip>
              )}
          </Space>
        );
      },
    },
    // Optional Action column for consultant (e.g., Mark as Verified - requires backend logic)
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         (record.receiptStatus === RECEIPT_STATUS.UPLOADED) ? (
    //             <Button size="small" onClick={() => handleVerifyReceipt(record.id)} disabled={loading}>Verify Receipt</Button>
    //         ) : null
    //     ),
    // },
  ];

  return (
    // No outer Layout/Content here as it's provided by ConsultantDashboard
    <div className="dark:text-white transition-colors duration-300">
      {/* Sticky Header potentially? */}
      <Title level={2} className="mb-6 dark:text-white flex items-center">
        <i className="fas fa-user-graduate mr-3"></i>
        Manage Student: {studentData.name}
        {loading && <Spin className="ml-4" />}{" "}
        {/* Show spinner next to title when loading */}
      </Title>

      <Tabs defaultActiveKey="1" type="card" className="dark:text-white">
        {/* --- Tab 1: Basic Information --- */}
        <TabPane
          tab={
            <span>
              <i className="fas fa-info-circle mr-2"></i>Student Info
            </span>
          }
          key="1"
          className="dark:bg-gray-800 p-4 rounded-b-md"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleBasicInfoSave}
            disabled={loading}
          >
            {/* ... (Form Items as before - check classNames for dark mode) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Form.Item
                label={<span className="dark:text-gray-300">Name</span>}
                name="name"
                rules={[{ required: true }]}
              >
                <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </Form.Item>
              <Form.Item
                label={<span className="dark:text-gray-300">Email</span>}
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="dark:text-gray-300">Date of Birth</span>
                }
                name="dob"
                rules={[{ required: true }]}
              >
                <DatePicker
                  className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 [&>input]:dark:text-white"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
              <Form.Item
                label={<span className="dark:text-gray-300">Phone</span>}
                name="phone"
                rules={[{ required: true }]}
              >
                <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="dark:text-gray-300">Desired Major</span>
                }
                name="major"
                rules={[{ required: true }]}
              >
                <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="dark:text-gray-300">Desired Country</span>
                }
                name="country"
                rules={[{ required: true }]}
              >
                <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="dark:text-gray-300">Target Semester</span>
                }
                name="semester"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select semester"
                  className="dark:bg-gray-700 rounded-md [&>div]:dark:text-white"
                >
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
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <span className="dark:text-gray-300">
                    Budget (Approx. USD)
                  </span>
                }
                name="budget"
                rules={[{ required: true, type: "number", min: 0 }]}
              >
                <InputNumber
                  prefix="$"
                  className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<i className="fas fa-save mr-2"></i>}
              >
                Save Basic Info
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* --- Tab 2: Service Package & Progress --- */}
        <TabPane
          tab={
            <span>
              <i className="fas fa-tasks mr-2"></i>Service & Progress
            </span>
          }
          key="2"
          className="dark:bg-gray-800 p-4 rounded-b-md"
        >
          <Space direction="vertical" size="large" className="w-full">
            {/* --- Package Selection --- */}
            <Card
              title={<span className="dark:text-white">Service Package</span>}
              size="small"
              className="dark:bg-gray-700 dark:border-gray-600"
            >
              <Select
                value={studentData.servicePackage}
                onChange={handlePackageChange}
                style={{ width: "100%" }}
                placeholder="Select a service package"
                loading={loading}
                disabled={loading}
                className="dark:bg-gray-600 rounded-md [&>div]:dark:text-white"
              >
                {Object.entries(servicePackages).map(([key, pkg]) => (
                  <Option key={key} value={parseInt(key, 10)}>
                    <span className="dark:text-gray-800">
                      {pkg.name} - {pkg.description}
                    </span>
                  </Option>
                ))}
              </Select>
            </Card>

            {/* --- University Selection (Package 1+) --- */}
            {studentData.servicePackage >= 1 && (
              <Card
                title={
                  <span className="dark:text-white">
                    <i className="fas fa-university mr-2"></i>University
                    Selection & Agreement
                  </span>
                }
                size="small"
                className="dark:bg-gray-700 dark:border-gray-600"
              >
                <Title level={5} className="dark:text-white mb-2">
                  Proposed Universities
                </Title>
                <List
                  size="small"
                  bordered
                  dataSource={studentData.universities}
                  className="mb-4 dark:bg-gray-600 dark:border-gray-500 rounded-md"
                  renderItem={(item) => (
                    <List.Item
                      className="dark:border-gray-500"
                      actions={[
                        item.status !== UNIVERSITY_STATUS.AGREED && (
                          <Tooltip title="Mark as Agreed (Student confirms)">
                            <Button
                              type="link"
                              size="small"
                              onClick={() => handleAgreeUniversity(item.id)}
                              disabled={loading}
                              icon={
                                <i className="fas fa-check text-green-500"></i>
                              }
                            />
                          </Tooltip>
                        ),
                        <Popconfirm
                          title="Remove this university proposal?"
                          onConfirm={() => handleRemoveUniversity(item.id)}
                          okText="Yes"
                          cancelText="No"
                          disabled={loading}
                        >
                          <Tooltip title="Remove Proposal">
                            <Button
                              type="link"
                              danger
                              size="small"
                              disabled={loading}
                              icon={<i className="fas fa-trash-alt"></i>}
                            />
                          </Tooltip>
                        </Popconfirm>,
                      ]}
                    >
                      <Text className="dark:text-white">{item.name}</Text>
                      {item.status === UNIVERSITY_STATUS.AGREED && (
                        <Tag
                          color="success"
                          icon={<i className="fas fa-check-circle mr-1"></i>}
                          className="ml-2"
                        >
                          <span className="dark:text-gray-800">Agreed</span>
                        </Tag>
                      )}
                      {/* Add other statuses like Rejected if needed */}
                    </List.Item>
                  )}
                  locale={{
                    emptyText: (
                      <span className="dark:text-gray-400">
                        No universities proposed yet.
                      </span>
                    ),
                  }}
                />

                <Space.Compact style={{ width: "100%" }} className="mb-4">
                  <Input
                    placeholder="Add university name to propose"
                    value={newUniversityName}
                    onChange={(e) => setNewUniversityName(e.target.value)}
                    disabled={loading}
                    className="dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  />
                  <Button
                    type="primary"
                    onClick={handleAddUniversity}
                    loading={loading}
                    disabled={loading || !newUniversityName.trim()}
                    icon={<i className="fas fa-plus mr-1"></i>}
                  >
                    Add
                  </Button>
                </Space.Compact>

                <Divider className="dark:border-gray-600" />

                {isAgreementMade ? (
                  <Text className="dark:text-green-400">
                    <i className="fas fa-check-circle mr-2"></i>Agreement
                    reached for:{" "}
                    <strong className="dark:text-white">
                      {agreedUniversity?.name}
                    </strong>
                    . Consultation fee can be paid.
                  </Text>
                ) : (
                  <Text type="warning" className="dark:text-yellow-400">
                    <i className="fas fa-exclamation-triangle mr-2"></i>No
                    university agreement finalized yet. Mark a proposed
                    university as 'Agreed' once confirmed by the student.
                  </Text>
                )}
              </Card>
            )}

            {/* --- Service Status Cards --- */}
            {studentData.servicePackage >= 1 && (
              <ServiceStatusCard
                serviceKey={SERVICE_KEYS.DOC_TRANSLATION}
                title="Document Translation"
                icon="fas fa-language"
                currentStatus={
                  studentData.serviceStatus[SERVICE_KEYS.DOC_TRANSLATION]
                }
                availableStatuses={[
                  { value: SERVICE_STATUS.PENDING, label: "Pending" },
                  { value: SERVICE_STATUS.IN_PROGRESS, label: "In Progress" },
                  { value: SERVICE_STATUS.COMPLETED, label: "Completed" },
                ]}
                onStatusChange={handleServiceStatusChange}
                loading={loading}
                requiredPackage={1}
              />
            )}
            {studentData.servicePackage >= 1 && (
              <ServiceStatusCard
                serviceKey={SERVICE_KEYS.DOC_SUBMISSION}
                title="Document Submission"
                icon="fas fa-file-export"
                currentStatus={
                  studentData.serviceStatus[SERVICE_KEYS.DOC_SUBMISSION]
                }
                availableStatuses={[
                  { value: SERVICE_STATUS.PENDING, label: "Pending" },
                  {
                    value: SERVICE_STATUS.IN_PROGRESS,
                    label: "Awaiting Docs / In Progress",
                  },
                  {
                    value: SERVICE_STATUS.APP_SUBMITTED,
                    label: "Application Submitted",
                  }, // Changed status
                  {
                    value: SERVICE_STATUS.COMPLETED,
                    label: "Submission Confirmed",
                  }, // Changed status
                ]}
                onStatusChange={handleServiceStatusChange}
                loading={loading}
                requiredPackage={1}
              />
            )}
            {studentData.servicePackage >= 2 && (
              <ServiceStatusCard
                serviceKey={SERVICE_KEYS.BANK_STATEMENT}
                title="Bank Balance Statement"
                icon="fas fa-file-invoice"
                currentStatus={
                  studentData.serviceStatus[SERVICE_KEYS.BANK_STATEMENT]
                }
                availableStatuses={[
                  { value: SERVICE_STATUS.PENDING, label: "Pending Guidance" },
                  {
                    value: SERVICE_STATUS.GUIDANCE_PROVIDED,
                    label: "Guidance Provided",
                  },
                  {
                    value: SERVICE_STATUS.STATEMENT_RECEIVED,
                    label: "Statement Received (Student Uploaded)",
                  },
                  { value: SERVICE_STATUS.VERIFIED, label: "Verified" },
                ]}
                onStatusChange={handleServiceStatusChange}
                loading={loading}
                requiredPackage={2}
              />
            )}
            {studentData.servicePackage >= 3 && (
              <ServiceStatusCard
                serviceKey={SERVICE_KEYS.VISA}
                title="Visa Assistance"
                icon="fas fa-passport"
                currentStatus={studentData.serviceStatus[SERVICE_KEYS.VISA]}
                availableStatuses={[
                  { value: SERVICE_STATUS.PENDING, label: "Pending" },
                  {
                    value: SERVICE_STATUS.DOCS_COLLECTED,
                    label: "Documents Collected",
                  },
                  {
                    value: SERVICE_STATUS.APP_SUBMITTED,
                    label: "Application Submitted",
                  },
                  { value: SERVICE_STATUS.APPROVED, label: "Approved" },
                  { value: SERVICE_STATUS.REJECTED, label: "Rejected" },
                ]}
                onStatusChange={handleServiceStatusChange}
                loading={loading}
                requiredPackage={3}
              />
            )}
            {studentData.servicePackage >= 3 && (
              <ServiceStatusCard
                serviceKey={SERVICE_KEYS.TICKET}
                title="Ticket Service"
                icon="fas fa-plane-departure"
                currentStatus={studentData.serviceStatus[SERVICE_KEYS.TICKET]}
                availableStatuses={[
                  { value: SERVICE_STATUS.PENDING, label: "Pending" },
                  {
                    value: SERVICE_STATUS.OPTIONS_PROVIDED,
                    label: "Options Provided",
                  },
                  { value: SERVICE_STATUS.BOOKED, label: "Booked" },
                ]}
                onStatusChange={handleServiceStatusChange}
                loading={loading}
                requiredPackage={3}
              />
            )}

            {/* Display App Fee Status (read-only here) */}
            {studentData.servicePackage >= 1 && (
              <Card
                title={
                  <span className="dark:text-white">
                    <i className="fas fa-file-invoice-dollar mr-2"></i>
                    Application Fee Status
                  </span>
                }
                size="small"
                className="dark:bg-gray-700 dark:border-gray-600"
              >
                <Text className="dark:text-gray-300 block">
                  Amount set in 'Payments' tab:{" "}
                  <strong className="dark:text-white">
                    {studentData.payments.find(
                      (p) => p.id === PAYMENT_IDS.APP_FEE
                    )?.amount
                      ? `$${
                          studentData.payments.find(
                            (p) => p.id === PAYMENT_IDS.APP_FEE
                          )?.amount
                        }`
                      : "Not set"}
                  </strong>
                </Text>
                <Text className="dark:text-gray-300 block mt-1">
                  Status:{" "}
                  {(() => {
                    const payment = studentData.payments.find(
                      (p) => p.id === PAYMENT_IDS.APP_FEE
                    );
                    if (!payment)
                      return (
                        <Tag color="default">
                          <span className="dark:text-gray-800">N/A</span>
                        </Tag>
                      );
                    const { text, icon, color } = getPaymentTagProps(
                      payment.status,
                      payment.receiptStatus
                    );
                    return (
                      <Tag
                        color={color}
                        icon={<i className={`${icon} mr-1`}></i>}
                      >
                        <span className="dark:text-gray-800">{text}</span>
                      </Tag>
                    );
                  })()}
                </Text>
              </Card>
            )}
          </Space>
        </TabPane>

        {/* --- Tab 3: Documents --- */}
        <TabPane
          tab={
            <span>
              <i className="fas fa-folder-open mr-2"></i>Documents
            </span>
          }
          key="3"
          className="dark:bg-gray-800 p-4 rounded-b-md"
        >
          <Title level={4} className="dark:text-white mb-4">
            Required Documents
          </Title>
          <Text className="block mb-4 dark:text-gray-400">
            Consultant defines requirements. Student uploads via their portal.
          </Text>

          <List
            itemLayout="horizontal"
            dataSource={studentData.requiredDocuments}
            loading={loading}
            className="dark:bg-gray-700 rounded-md p-4 dark:border dark:border-gray-600 mb-6"
            renderItem={(item) => {
              const { icon, color, text } = getDocumentStatusProps(item.status);
              const isDefaultDoc = defaultRequiredDocs.some(
                (doc) => doc.id === item.id
              );
              return (
                <List.Item
                  className="dark:border-gray-600"
                  actions={[
                    !isDefaultDoc && (
                      <Popconfirm
                        title="Remove this requirement?"
                        onConfirm={() => handleRemoveDocument(item.id)}
                        okText="Yes"
                        cancelText="No"
                        disabled={loading}
                      >
                        <Button
                          type="link"
                          danger
                          size="small"
                          disabled={loading}
                          icon={<i className="fas fa-trash-alt"></i>}
                        />
                      </Popconfirm>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <span className="dark:text-white">
                        {item.name}{" "}
                        {isDefaultDoc && (
                          <Tag className="ml-2">
                            <span className="dark:text-gray-800">Default</span>
                          </Tag>
                        )}
                      </span>
                    }
                    description={
                      <Space className={`${color}`}>
                        <i className={icon}></i>
                        <span>{text}</span>
                      </Space>
                    }
                  />
                  {/* Add View button if file exists - needs file URL from backend */}
                  {/* {item.fileUrl && <Button size="small" href={item.fileUrl} target="_blank">View</Button>} */}
                </List.Item>
              );
            }}
          />

          <Title level={5} className="dark:text-white mt-6 mb-2">
            Add University-Specific Document
          </Title>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Enter document name"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              disabled={loading}
              className="dark:bg-gray-600 dark:text-white dark:border-gray-500"
            />
            <Button
              type="primary"
              onClick={handleAddDocument}
              loading={loading}
              disabled={loading || !newDocName.trim()}
              icon={<i className="fas fa-plus mr-1"></i>}
            >
              Add Requirement
            </Button>
          </Space.Compact>
        </TabPane>

        {/* --- Tab 4: Payments --- */}
        <TabPane
          tab={
            <span>
              <i className="fas fa-dollar-sign mr-2"></i>Payments
            </span>
          }
          key="4"
          className="dark:bg-gray-800 p-4 rounded-b-md"
        >
          <Title level={4} className="dark:text-white mb-2">
            Manage Fees
          </Title>
          <Text className="block mb-4 dark:text-gray-400">
            Consultant enters fee amounts based on package/university. Status
            reflects student payments.
          </Text>

          <Form
            form={paymentsForm}
            onFinish={handlePaymentsSave}
            layout="vertical"
            disabled={loading}
          >
            <Table
              dataSource={getFilteredPayments()} // Use filtered data
              columns={paymentColumns}
              rowKey="id"
              pagination={false}
              className="[&_th]:dark:bg-gray-700 [&_th]:dark:text-white [&_td]:dark:bg-gray-750 [&_td]:dark:border-gray-600 [&_table]:dark:border-gray-600"
              loading={loading}
            />
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<i className="fas fa-save mr-2"></i>}
              >
                Save Fee Amounts
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>

      {/* Modal for viewing receipts */}
      <Modal
        title="View Receipt"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={800} // Adjust as needed
      >
        {receiptUrl ? (
          <img alt="Receipt" style={{ width: "100%" }} src={receiptUrl} />
        ) : (
          // Or handle PDF viewing if needed:
          // <iframe src={receiptUrl} style={{ width: '100%', height: '600px' }} title="Receipt Viewer" />
          <p className="dark:text-gray-300">
            Receipt image could not be loaded.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ConsultantStudentManagementPage;
