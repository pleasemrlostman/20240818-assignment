import { generateTimeOptions, meetingDayInfo } from "./util";
import styles from "./WorkingHours.module.css";
import { useForm, useFieldArray, Controller, Control } from "react-hook-form";

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

const timeOptions = [
  { label: "09:00", value: "09:00" },
  { label: "10:00", value: "10:00" },
  { label: "11:00", value: "11:00" },
  { label: "12:00", value: "12:00" },
  { label: "13:00", value: "13:00" },
  { label: "14:00", value: "14:00" },
  { label: "15:00", value: "15:00" },
  { label: "16:00", value: "16:00" },
  { label: "17:00", value: "17:00" },
];

function WorkingHours() {
  const { control } = useForm<FormValues>({
    defaultValues: meetingDayInfo,
  });

  const { fields } = useFieldArray({
    control,
    name: "meetingDate",
  });

  return (
    <div className={styles.container}>
      <div>2번 과제 - WorkingHours</div>
      {fields.map((day, dayIndex) => {
        return <테스트 fields={fields} control={control} index={dayIndex} />;
      })}
    </div>
  );
}

export default WorkingHours;

const 테스트 = ({
  fields,
  control,
  index: dayIndex,
}: {
  fields: any;
  control: any;
  index: number;
}) => {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `meetingDate.${dayIndex}.value`,
  });

  console.log("fields", fields[dayIndex]);

  return (
    <>
      <div key={fields[dayIndex]?.id}>
        <h3>{fields[dayIndex]?.name}</h3>
        {valueFields.map((valueItem, valueIndex) => (
          <div key={valueItem.id} style={{ marginBottom: "10px" }}>
            <label>
              Start Time:
              <Controller
                name={`meetingDate.${dayIndex}.value.${valueIndex}.start`}
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </label>
            <label>
              End Time:
              <Controller
                name={`meetingDate.${dayIndex}.value.${valueIndex}.end`}
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </label>
            <button type="button" onClick={() => removeValue(valueIndex)}>
              Delete Time Slot
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendValue({ start: "09:00", end: "09:00" })}
        >
          ADD Time Slot
        </button>
      </div>
    </>
  );
};
