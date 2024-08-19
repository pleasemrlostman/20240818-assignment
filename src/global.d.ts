// src/globals.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Breeds Type
interface Breed {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

// Category Type
interface Category {
  id: number;
  name: string;
}

// Image Type
interface CatViewImage {
  breeds: Breed[];
  categories?: Category[];
  id: string;
  url: string;
  width: number;
  height: number;
  [key: string]: any; // To handle any additional properties that might be present
}

// here is woring hours section

interface TimeSlot {
  start: string;
  end: string;
}
type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

interface MeetingDay {
  id: number;
  name: DayName;
  value: TimeSlot[];
}

interface MeetingDayValues {
  meetingDate: MeetingDay[];
}

type ControllerNameType =
  | "meetingDate"
  | `meetingDate.${number}.value`
  | `meetingDate.${number}`
  | `meetingDate.${number}.id`
  | `meetingDate.${number}.name`
  | `meetingDate.${number}.value.${number}`
  | `meetingDate.${number}.value.${number}.start`
  | `meetingDate.${number}.value.${number}.end`;
