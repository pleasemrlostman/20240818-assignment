// types.ts
export interface TimeSlot {
  start: string;
  end: string;
}

export interface MeetingDay {
  id: number;
  name: string;
  value: TimeSlot[];
}

export interface FormValues {
  meetingDate: MeetingDay[];
}
