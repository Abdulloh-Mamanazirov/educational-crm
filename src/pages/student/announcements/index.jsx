import React, { useState } from "react";
import { Card, Tag, Tabs } from "antd";
import moment from "moment";

// Mock data
const mockAnnouncements = [
  {
    id: "1",
    title: "End of Semester Exams",
    content: "Final exams will be held from March 15th to March 30th.",
    type: "ACADEMIC",
    target_audience: "ALL",
    start_date: "2025-02-19T00:00:00",
    end_date: "2025-03-30T00:00:00",
    created_by: "1",
    is_pinned: true,
    created_at: "2025-02-19T10:00:00",
  },
  {
    id: "2",
    title: "Teacher Training Workshop",
    content: "Mandatory training session for all teaching staff.",
    type: "EVENT",
    target_audience: "TEACHERS",
    start_date: "2025-02-25T00:00:00",
    end_date: null,
    created_by: "1",
    is_pinned: false,
    created_at: "2025-02-19T11:00:00",
  },
];

const ANNOUNCEMENT_TYPES = [
  { label: "General", value: "GENERAL", color: "blue" },
  { label: "Academic", value: "ACADEMIC", color: "green" },
  { label: "Event", value: "EVENT", color: "purple" },
  { label: "Urgent", value: "URGENT", color: "red" },
];

const TARGET_AUDIENCES = [
  { label: "All", value: "ALL" },
  { label: "Students", value: "STUDENTS" },
  { label: "Teachers", value: "TEACHERS" },
  { label: "Staff", value: "STAFF" },
];

const AnnouncementsManagement = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [activeTab, setActiveTab] = useState("all");

  const filterAnnouncements = () => {
    let filtered = [...announcements];

    // Sort by pinned first, then by date
    filtered.sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) return b.is_pinned - a.is_pinned;
      return moment(b.created_at).diff(moment(a.created_at));
    });

    // Filter based on active tab
    if (activeTab !== "all") {
      filtered = filtered.filter((a) => a.type === activeTab.toUpperCase());
    }

    return filtered;
  };

  const renderAnnouncement = (announcement) => (
    <Card
      key={announcement.id}
      className="mb-4 dark:bg-dark-l dark:text-white"
      title={
        <h3 className="text-lg font-semibold m-0 dark:text-white">
          {announcement.title}
        </h3>
      }
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag
              color={
                ANNOUNCEMENT_TYPES.find((t) => t.value === announcement.type)
                  ?.color
              }
            >
              {announcement.type}
            </Tag>
            <Tag>
              {
                TARGET_AUDIENCES.find(
                  (t) => t.value === announcement.target_audience
                )?.label
              }
            </Tag>
          </div>
          <p className="whitespace-pre-line">{announcement.content}</p>
          {announcement.attachment_url && (
            <a href={announcement.attachment_url} className="text-blue-500">
              <span className="fa fa-paperclip mr-2" />
              Attachment
            </a>
          )}
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-4">
        Posted: {moment(announcement.created_at).format("MMMM D, YYYY")}
        {announcement.end_date &&
          ` • Expires: ${moment(announcement.end_date).format("MMMM D, YYYY")}`}
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-bold">Announcements & Notices</h1>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            label: <span className="dark:text-white">All Announcements</span>,
            key: "all",
          },
          ...ANNOUNCEMENT_TYPES.map((type) => ({
            label: <span className="dark:text-white">{type.label}</span>,
            key: type.value.toLowerCase(),
          })),
        ]}
        className="mb-6"
      />

      <div>{filterAnnouncements().map(renderAnnouncement)}</div>
    </div>
  );
};

export default AnnouncementsManagement;
