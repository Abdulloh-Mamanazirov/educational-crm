import React from "react";
import { WeeklySchedule } from "../../../../components";

const Schedule = () => {
  // Mock data for demonstration
  const mockGroups = [
    {
      name: "English Beginners",
      days: "mon-wed-fri",
      type: "offline",
      level: 1,
      start_time: "10:30",
      end_time: "12:00",
      teacher_id: "123e4567-e89b-12d3-a456-426614174000",
      description: "Beginner level English class",
    },
    {
      name: "Math Advanced",
      days: "tue-thu-sat",
      type: "online",
      level: 3,
      start_time: "8:00",
      end_time: "10:00",
      teacher_id: "123e4567-e89b-12d3-a456-426614174001",
      description: "Advanced mathematics",
    },
    {
      name: "Science Basic",
      days: "everyday",
      type: "offline",
      level: 1,
      start_time: "13:30",
      end_time: "14:30",
      teacher_id: "123e4567-e89b-12d3-a456-426614174002",
      description: "Basic science concepts",
    },
  ];

  return <WeeklySchedule groups={mockGroups} />;
};

export default Schedule;
