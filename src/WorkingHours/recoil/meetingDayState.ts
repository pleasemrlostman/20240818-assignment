// meetingDayState.ts
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "meetingDayValues", // 브라우저의 localStorage에서 사용할 key
  storage: localStorage, // localStorage에 저장
});

// Define the initial state if needed
const initialMeetingDayValues: MeetingDayValues = {
  meetingDate: [],
};

export const meetingDayValuesState = atom<MeetingDayValues>({
  key: "meetingDayValuesState",
  default: initialMeetingDayValues,
  effects_UNSTABLE: [persistAtom],
});
