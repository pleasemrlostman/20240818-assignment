import { z } from "zod";

// Zod 스키마 정의
const timeSlotSchema = z
  .object({
    start: z.string(),
    end: z.string(),
  })
  .refine((data) => data.start < data.end, {
    message: "Start time should be earlier than end time",
    path: ["start"], // 에러 메시지를 start에 연결
  })
  .refine((data) => data.start !== data.end, {
    message: "Start time and end time should be different",
    path: ["start"], // 에러 메시지를 start에 연결
  });

const meetingDaySchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.array(timeSlotSchema), // 배열로 여러 time slot을 검증
});

export const schema = z.object({
  meetingDate: z.array(meetingDaySchema),
});
