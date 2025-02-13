import React, { useMemo } from "react";
import { Card, Typography, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const WeeklySchedule = ({ groups }) => {
  const parseDays = (daysString) => {
    if (daysString === "everyday") {
      return ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    }
    return daysString.toLowerCase().split("-");
  };

  // Organize groups by days
  const scheduleData = useMemo(() => {
    const schedule = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };

    groups.forEach((group) => {
      const groupDays = parseDays(group.days);
      groupDays.forEach((day) => {
        if (schedule[day]) {
          schedule[day].push(group);
        }
      });
    });

    return schedule;
  }, [groups]);

  // Helper function to render group card
  const renderGroupCard = (group) => (
    <Tooltip
      title={
        <>
          <div>Type: {group.type}</div>
          <div>Level: {group.level || "N/A"}</div>
          <div>
            Time: {group.start_time || "N/A"} - {group.end_time || "N/A"}
          </div>
          <div>Description: {group.description || "No description"}</div>
        </>
      }
      key={`${group.name}-${group.teacher_id}`}
    >
      <Card
        size="small"
        style={{
          marginBottom: 8,
          backgroundColor: group.type === "online" ? "#f0f5ff" : "#f6ffed",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong>{group.name}</Text>
          <InfoCircleOutlined style={{ color: "#1890ff" }} />
        </div>
      </Card>
    </Tooltip>
  );

  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  return (
    <Card
      title={<p className="dark:text-white">Weekly Schedule</p>}
      style={{ width: "100%", maxWidth: "100%" }}
      className="dark:bg-gradient-to-br from-dark-m/95 to-dark-l shadow-md"
    >
      <div className="flex gap-4 py-3 overflow-x-auto">
        {days.map((day) => (
          <div key={day} style={{ flex: 1, minWidth: 200 }}>
            <Card
              title={day.toUpperCase()}
              style={{ backgroundColor: "#fafafa" }}
              styles={{
                body: {
                  padding: "12px",
                  minHeight: 300,
                  maxHeight: 600,
                  overflowY: "auto",
                },
              }}
            >
              {scheduleData[day].length > 0 ? (
                scheduleData[day].map((group) => renderGroupCard(group))
              ) : (
                <Text type="secondary">No groups scheduled</Text>
              )}
            </Card>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeeklySchedule;
