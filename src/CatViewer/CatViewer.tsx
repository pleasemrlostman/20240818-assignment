import styles from "./CatViewer.module.css";
import useResponsive from "./useResponsive";
import useInfiniteScroll from "./useInfiniteScroll";
import useGroupedImages from "./useGroupedImages";
import { calculatePosition } from "./util";
import { useRef, useState } from "react";

function CatViewer() {
  const { images, loading, observerRef } = useInfiniteScroll();
  const { deviceType } = useResponsive();
  const groupedImages = useGroupedImages(images, deviceType);

  const handleClick = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;

    if (element) {
      // 애니메이션을 열기 시작
      requestAnimationFrame(() => {
        calculatePosition("open")(element, 300); // 300ms 애니메이션
      });

      // 클릭 이벤트 리스너의 핸들러 함수를 정의합니다.
      const handleCloseClick = (event: MouseEvent) => {
        event.stopPropagation(); // 이벤트 버블링을 방지합니다.
        calculatePosition("close")(element, 300); // 300ms 애니메이션

        // 이벤트 리스너를 제거합니다.
        element.removeEventListener("click", handleCloseClick);
      };

      // 클릭 이벤트 리스너를 추가합니다.
      element.addEventListener("click", handleCloseClick);
    }
  };
  return (
    <div className={styles.container}>
      <div>1번 과제 - CatViewer</div>
      <div className={styles.imageCover}>
        {groupedImages.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.imageGroup}>
            {group.map((value) => (
              <div key={value.id} className={styles.imageWrap} id={value.id}>
                <img
                  onClick={() => {
                    handleClick(value.id);
                  }}
                  src={value.url}
                  alt={`Cat Image-${value.id}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
}

export default CatViewer;
