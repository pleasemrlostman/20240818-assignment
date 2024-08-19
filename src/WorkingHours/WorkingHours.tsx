import RangeInput from "./RangeInput";
import { meetingDayInfo } from "./util";
import styles from "./WorkingHours.module.css";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./workingHours.schema";

import { useRecoilState } from "recoil";
import { meetingDayValuesState } from "./meetingDayState";

function WorkingHours() {
  const [meetingDayValues, setMeetingDayValues] = useRecoilState(
    meetingDayValuesState
  );

  console.log("meetingDayValues", meetingDayValues);

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
    console.log("data", data);
    setMeetingDayValues(data);
  };
  const onError = (error: FieldErrors<MeetingDayValues>) => {
    console.log("error", error);
  };

  return (
    <div className={styles.container}>
      <div>2번 과제 - WorkingHours</div>
      <main className={styles.wrap}>
        <section>
          <h2>Working hour</h2>
        </section>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles.cover}
        >
          <h3>set your weekly hours</h3>
          {fields.map((_, index) => {
            return (
              <RangeInput fields={fields} control={control} index={index} />
            );
          })}
          {isDirty && (
            <div className={styles.formButtonWrap}>
              <button
                className={`${styles.formButton} ${styles.formButtonClear}`}
                onClick={() => {
                  reset();
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
