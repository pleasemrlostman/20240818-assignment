const START_HOUR = 0; // 시작 시간
const END_HOUR = 23; // 종료 시간
const INTERVAL = 15; // 15분 단위
export const START_TIME_VALUE: TimeSlot = { start: "09:00", end: "10:00" };

const formatTime = (hour: number, minute: number) => {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

export const generateTimeOptions = () => {
  return Array.from(
    { length: ((END_HOUR - START_HOUR) * 60) / INTERVAL + 60 / INTERVAL },
    (_, index) => {
      const totalMinutes = START_HOUR * 60 + index * INTERVAL;
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;

      if (hour > END_HOUR || (hour === END_HOUR && minute > 45)) return null;

      return formatTime(hour, minute);
    }
  ).filter(Boolean) as string[];
};

const dayNames: DayName[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const meetingDayInfo = {
  meetingDate: dayNames.map((value, index) => ({
    id: index,
    name: value,
    value: [START_TIME_VALUE],
  })),
};
