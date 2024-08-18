import { useEffect, useState } from "react";

function useGroupedImages(images: CatViewImage[], deviceType: string) {
  const [groupedImages, setGroupedImages] = useState<CatViewImage[][]>([]);

  // 빈 열을 생성하는 함수 (CatViewImage 배열로 정의)
  const createEmptyColumns = (count: number): CatViewImage[][] => {
    return Array.from({ length: count }, () => [] as CatViewImage[]);
  };

  // 장치 타입에 따라 열 수 설정
  const getColumns = (deviceType: string) => {
    switch (deviceType) {
      case "PC":
        return 3;
      case "Tablet":
        return 2;
      case "Mobile":
      default:
        return 1;
    }
  };

  // 이미지를 장치 타입에 맞게 그룹화하는 함수
  const groupImages = (images: CatViewImage[], columns: number) => {
    const grouped = createEmptyColumns(columns);
    images.forEach((value, index) => {
      grouped[index % columns].push(value);
    });
    setGroupedImages(grouped); // 그룹화된 이미지를 상태에 저장
  };

  // 이미지와 장치 타입이 변경될 때마다 그룹화 로직을 실행
  useEffect(() => {
    if (images.length > 0) {
      const columns = getColumns(deviceType);
      groupImages(images, columns);
    }
  }, [deviceType, images]);

  return groupedImages;
}

export default useGroupedImages;
