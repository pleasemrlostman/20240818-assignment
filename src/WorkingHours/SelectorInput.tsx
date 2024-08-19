import { useState } from "react";
import { useController, Control } from "react-hook-form";
import { generateTimeOptions } from "./util";
import styles from "./WorkingHours.module.css";

// 드롭다운 리스트를 숨기거나 표시하는 컴포넌트
const SelectorInput = ({
  fieldName,
  control,
}: {
  fieldName: string; // 'any' 대신 'string' 사용
  control: Control<any>; // 실제 타입을 적절히 수정하세요
}) => {
  const { field, fieldState } = useController({
    name: fieldName,
    control,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(field.value || "");

  const handleInputClick = () => {
    setIsOpen(!isOpen); // 클릭 시 드롭다운 토글
  };

  const handleOptionClick = (option: string) => {
    setSelectedTime(option);
    setIsOpen(false);
    field.onChange(option); // 폼 필드 값 업데이트
  };

  return (
    <div>
      <div className={styles.selectorInput}>
        <input
          className={styles.dateInput}
          type="text"
          value={selectedTime}
          onClick={handleInputClick}
          readOnly // 사용자가 직접 입력할 수 없도록 설정
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
