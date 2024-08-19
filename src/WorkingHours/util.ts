import MeetingDaysDefaultValueType from "./WorkingHours";
const startHour = 9; // 시작 시간 (9 AM)
const endHour = 23; // 종료 시간 (11 PM)
const interval = 15; // 15분 단위

export const formatTime = (hour: number, minute: number) => {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

export const generateTimeOptions = () => {
  return Array.from(
    { length: ((endHour - startHour) * 60) / interval + 1 },
    (_, index) => {
      const totalMinutes = startHour * 60 + index * interval;
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      return formatTime(hour, minute);
    }
  );
};

export const userInfo = {
  meetingDate: [
    {
      SUN: [{ start: "09:00", end: "10:00" }],
      MON: [{ start: "09:00", end: "10:00" }],
      TUE: [{ start: "09:00", end: "10:00" }],
      WED: [{ start: "09:00", end: "10:00" }],
      THU: [{ start: "09:00", end: "10:00" }],
      FRI: [{ start: "09:00", end: "10:00" }],
      SAT: [{ start: "09:00", end: "10:00" }],
    },
  ],
};

export const meetingDayInfo = {
  meetingDate: [
    {
      id: 0,
      name: "SUN",
      value: [{ start: "09:00", end: "10:00" }],
    },
    {
      id: 1,
      name: "MON",
      value: [{ start: "09:00", end: "10:00" }],
    },
    {
      id: 2,
      name: "TUE",
      value: [{ start: "09:00", end: "10:00" }],
    },
    {
      id: 3,
      name: "WED",
      value: [{ start: "09:00", end: "10:00" }],
    },
    {
      id: 4,
      name: "THU",
      value: [{ start: "09:00", end: "10:00" }],
    },
    {
      id: 5,
      name: "FRI",
      value: [{ start: "09:00", end: "10:00" }],
    },
    {
      id: 6,
      name: "SAT",
      value: [{ start: "09:00", end: "10:00" }],
    },
  ],
};
