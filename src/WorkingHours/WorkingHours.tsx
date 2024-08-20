import RangeInput from "./components/RangeInput";
import { meetingDayInfo } from "./util/util";
import styles from "./style/WorkingHours.module.css";
import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema/workingHours.schema";

import { useRecoilState } from "recoil";
import { meetingDayValuesState } from "./recoil/meetingDayState";

function WorkingHours() {
  const [meetingDayValues, setMeetingDayValues] = useRecoilState(
    meetingDayValuesState
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<MeetingDayValues>({
    resolver: zodResolver(schema),
    defaultValues:
      meetingDayValues.meetingDate.length === 0
        ? meetingDayInfo
        : meetingDayValues,
  });
  const { fields } = useFieldArray({
    control,
    name: "meetingDate",
  });

  const onSubmit = (data: MeetingDayValues) => {
    setMeetingDayValues(data);
    alert("Update completed");
  };

  return (
    <div className={styles.container}>
      <div>2번 과제 - WorkingHours</div>
      <main className={styles.wrap}>
        <section>
          <h2>Working hour</h2>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.cover}>
          <h3>set your weekly hours</h3>
          {fields.map((_, index) => {
            return (
              <RangeInput
                fields={fields}
                control={control}
                index={index}
                key={index}
              />
            );
          })}
          {isDirty && (
            <div className={styles.formButtonWrap}>
              <button
                className={`${styles.formButton} ${styles.formButtonClear}`}
                onClick={() => {
                  reset();
                  alert("Initialization complete");
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                disabled={errors.meetingDate ? true : false}
                className={`${styles.formButton} ${styles.formButtonSubmit} ${
                  errors.meetingDate ? styles.formButtonSubmitDisabled : null
                }`}
                type="submit"
              >
                {errors.meetingDate ? "Disabled" : "Update"}
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default WorkingHours;
