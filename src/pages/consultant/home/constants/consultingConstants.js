// src/constants/consultingConstants.js (Example file path)

export const PAYMENT_IDS = {
  CONSULTATION: "payment_consultation",
  APP_FEE: "payment_app_fee",
  BANK_STATEMENT: "payment_bank_statement", // New fee
  TUITION: "payment_tuition",
  DORM: "payment_dorm",
  OTHER: "payment_other",
};

export const SERVICE_KEYS = {
  DOC_TRANSLATION: "doc_translation",
  DOC_SUBMISSION: "doc_submission",
  BANK_STATEMENT: "bank_statement",
  VISA: "visa_service",
  TICKET: "ticket_service",
};

export const DOCUMENT_STATUS = {
  PENDING: "pending",
  UPLOADED: "uploaded",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
};

export const RECEIPT_STATUS = {
  NONE: "none",
  UPLOADED: "uploaded",
  VERIFIED: "verified",
};

export const SERVICE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  // Add more specific statuses as needed
  GUIDANCE_PROVIDED: "guidance_provided",
  STATEMENT_RECEIVED: "statement_received",
  VERIFIED: "verified", // Can overlap with doc status, maybe rename if confusing
  DOCS_COLLECTED: "docs_collected",
  APP_SUBMITTED: "application_submitted",
  APPROVED: "approved",
  REJECTED: "rejected", // Service status can also be rejected
  OPTIONS_PROVIDED: "options_provided",
  BOOKED: "booked",
};

export const UNIVERSITY_STATUS = {
  PROPOSED: "proposed",
  AGREED: "agreed",
  REJECTED: "rejected", // Student or consultant might reject a proposal
};

export const servicePackages = {
  1: {
    name: "Package 1",
    description:
      "Select university, documents translation, document submission, application fee handling.",
    services: [
      "select_university",
      SERVICE_KEYS.DOC_TRANSLATION,
      SERVICE_KEYS.DOC_SUBMISSION,
      "app_fee",
    ],
  },
  2: {
    name: "Package 2",
    description: "Package 1 + Bank Balance Statement assistance.",
    services: [
      "select_university",
      SERVICE_KEYS.DOC_TRANSLATION,
      SERVICE_KEYS.DOC_SUBMISSION,
      "app_fee",
      SERVICE_KEYS.BANK_STATEMENT,
    ],
  },
  3: {
    name: "Package 3",
    description:
      "Package 1 + Package 2 + Tuition, Dorm, Other Fees payment handling, Visa assistance, Ticket service.",
    services: [
      "select_university",
      SERVICE_KEYS.DOC_TRANSLATION,
      SERVICE_KEYS.DOC_SUBMISSION,
      "app_fee",
      SERVICE_KEYS.BANK_STATEMENT,
      "tuition_payment",
      "dorm_payment",
      "other_fees_payment",
      SERVICE_KEYS.VISA,
      SERVICE_KEYS.TICKET,
    ],
  },
};

export const defaultRequiredDocs = [
  {
    id: "doc_passport",
    name: "Passport Copy",
    status: DOCUMENT_STATUS.PENDING,
  },
  {
    id: "doc_lang_cert",
    name: "Language Certificate (IELTS/TOEFL etc.)",
    status: DOCUMENT_STATUS.PENDING,
  },
  {
    id: "doc_diploma",
    name: "High School Diploma/Transcript",
    status: DOCUMENT_STATUS.PENDING,
  },
];

// Helper to get status tag properties (color, icon, text)
export const getDocumentStatusProps = (status) => {
  switch (status) {
    case DOCUMENT_STATUS.UPLOADED:
      return {
        icon: "fas fa-file-upload",
        color: "text-blue-500 dark:text-blue-400",
        text: "Uploaded (Pending Verification)",
      };
    case DOCUMENT_STATUS.VERIFIED:
      return {
        icon: "fas fa-check-circle",
        color: "text-green-500 dark:text-green-400",
        text: "Verified",
      };
    case DOCUMENT_STATUS.REJECTED:
      return {
        icon: "fas fa-times-circle",
        color: "text-red-500 dark:text-red-400",
        text: "Rejected",
      };
    case DOCUMENT_STATUS.PENDING:
    default:
      return {
        icon: "fas fa-clock",
        color: "text-yellow-500 dark:text-yellow-400",
        text: "Pending Upload",
      };
  }
};

export const getPaymentTagProps = (paymentStatus, receiptStatus) => {
  if (paymentStatus === PAYMENT_STATUS.PAID) {
    let text = "Paid";
    let icon = "fas fa-check-circle"; // Default for paid
    let color = "success";

    switch (receiptStatus) {
      case RECEIPT_STATUS.UPLOADED:
        text = "Paid (Receipt Uploaded)";
        icon = "fas fa-file-upload";
        break;
      case RECEIPT_STATUS.VERIFIED:
        text = "Paid (Receipt Verified)";
        icon = "fas fa-user-check";
        break;
      case RECEIPT_STATUS.NONE:
      default:
        text = "Paid (Receipt Pending)";
        icon = "fas fa-receipt";
        break;
    }
    return { text, icon, color };
  } else {
    // Pending
    return { text: "Pending", icon: "fas fa-hourglass-half", color: "warning" };
  }
};
