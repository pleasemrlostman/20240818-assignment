import { useState, useEffect } from "react";

function useResponsive() {
  // 기본값을 'PC'로 설정합니다.
  const [deviceType, setDeviceType] = useState<"PC" | "Mobile" | "Tablet">(
    "PC"
  );

  useEffect(() => {
    // 화면 크기에 따른 디바이스 타입을 결정하는 함수
    const determineDeviceType = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        // 모바일
        setDeviceType("Mobile");
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        // 태블릿
        setDeviceType("Tablet");
      } else {
        // PC
        setDeviceType("PC");
      }
    };

    // 화면 크기 변화 감지를 위해 미디어 쿼리 리스너를 등록합니다.
    const handleResize = () => {
      determineDeviceType();
    };

    // 초기값 설정
    determineDeviceType();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { deviceType };
}

export default useResponsive;
