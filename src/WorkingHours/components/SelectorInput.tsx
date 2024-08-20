import { useState } from "react";
import { useController, Control } from "react-hook-form";
import { generateTimeOptions } from "../util/util";
import styles from "../style/WorkingHours.module.css";

// 드롭다운 리스트를 숨기거나 표시하는 컴포넌트
const SelectorInput = ({
  fieldName,
  control,
}: {
  fieldName: string;
  control: Control<any>;
}) => {
  const { field, fieldState } = useController({
    name: fieldName,
    control,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(field.value || "");

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedTime(option);
    setIsOpen(false);
    field.onChange(option);
  };

  return (
    <div>
      <div className={styles.selectorInput}>
        <input
          className={styles.dateInput}
          type="text"
          value={selectedTime}
          onClick={handleInputClick}
          readOnly
        />
        {isOpen && (
          <ul className={styles.timeOptions}>
            {generateTimeOptions().map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {fieldState.error && (
        <p className={styles.errorMessage}>{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default SelectorInput;
