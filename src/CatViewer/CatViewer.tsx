import styles from "./CatViewer.module.css";
import useResponsive from "./useResponsive";
import useInfiniteScroll from "./useInfiniteScroll";
import useGroupedImages from "./useGroupedImages";

function CatViewer() {
  const { images, loading, observerRef } = useInfiniteScroll();
  const { deviceType } = useResponsive();
  const groupedImages = useGroupedImages(images, deviceType);

  const handleClick = (id: string, url: string) => {
    // 클릭된 div의 참조를 가져옵니다.
    const element = document.getElementById(id);

    // 새로운 span 태그를 생성합니다.
    const imageTag = document.createElement("img");
    imageTag.src = url;
    imageTag.className = styles.clickedImg;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const imageWidth = imageTag.offsetWidth;
    const imageHeight = imageTag.offsetHeight;

    const translateX = (screenWidth - imageWidth) / 2;
    const translateY = (screenHeight - imageHeight) / 2;
    // 생성한 span 태그를 클릭된 div에 추가합니다.
    if (element) {
      element.appendChild(imageTag);
    }
    setTimeout(() => {
      imageTag.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
      imageTag.className = styles.zoomImg;
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div>1번 과제 - CatViewer</div>
      <div className={styles.imageCover}>
        {groupedImages.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.imageGroup}>
            {group.map((value) => (
              <div
                key={value.id}
                id={value.id}
                className={styles.imageWrap}
                onClick={() => {
                  handleClick(value.id, value.url);
                }}
              >
                <img src={value.url} alt={`Cat Image-${value.id}`} />
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
