import { START_TIME_VALUE } from "./util";
import styles from "./WorkingHours.module.css";
import { useFieldArray, FieldArrayWithId, Control } from "react-hook-form";
import { RiDeleteBin2Line, RiAddLine } from "@remixicon/react";
import SelectorInput from "./SelectorInput";

const RangeInput = ({
  fields,
  control,
  index: dayIndex,
}: {
  fields: FieldArrayWithId<MeetingDayValues, "meetingDate", "id">[];
  control: Control<MeetingDayValues, any>;
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

  return (
    <div key={fields[dayIndex]?.id} className={styles.rangeInputWrap}>
      <h3>{fields[dayIndex]?.name}</h3>
      <div className={styles.hoursSelectCover}>
        {valueFields.map((valueItem, valueIndex) => (
          <div key={valueItem.id} className={styles.timeSlot}>
            <SelectorInput
              fieldName={`meetingDate.${dayIndex}.value.${valueIndex}.start`}
              control={control}
            />
            <span>-</span>
            <SelectorInput
              fieldName={`meetingDate.${dayIndex}.value.${valueIndex}.end`}
              control={control}
            />
            {valueFields.length === valueIndex + 1 && (
              <button
                className={`${styles.formButton} ${styles.icon}`}
                type="button"
                onClick={() => appendValue(START_TIME_VALUE)}
              >
                <RiAddLine size={14} color="gray" />
              </button>
            )}
            <button
              className={`${styles.formButton} ${styles.icon}`}
              type="button"
              onClick={() => removeValue(valueIndex)}
            >
              <RiDeleteBin2Line size={14} color="gray" />
            </button>
          </div>
        ))}
      </div>
      {valueFields.length === 0 && (
        <button
          className={`${styles.formButton} ${styles.icon}`}
          type="button"
          onClick={() => appendValue(START_TIME_VALUE)}
        >
          <RiAddLine size={14} color="gray" />
        </button>
      )}
    </div>
  );
};

export default RangeInput;
