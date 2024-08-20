import styles from "./CatViewer.module.css";
import useResponsive from "./useResponsive";
import useInfiniteScroll from "./useInfiniteScroll";
import useGroupedImages from "./useGroupedImages";
import { calculatePosition } from "./util";
import { useCallback } from "react";
import { AxiosError } from "axios";

function CatViewer() {
  const { images, loading, observerRef, status, error, refetch, isPending } =
    useInfiniteScroll();
  const { deviceType } = useResponsive();
  const groupedImages = useGroupedImages(images, deviceType);
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;

    if (element) {
      requestAnimationFrame(() => {
        calculatePosition("open")(element, 300);
      });

      const handleCloseClick = (event: MouseEvent) => {
        event.stopPropagation();
        calculatePosition("close")(element, 300);
        element.removeEventListener("click", handleCloseClick);
      };

      element.addEventListener("click", handleCloseClick);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>1번 과제 - CatViewer</div>
      {!error && !isPending ? (
        <>
          <div className={styles.imageCover}>
            {groupedImages.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.imageGroup}>
                {group.map((value) => (
                  <figure
                    key={value.id}
                    className={styles.imageWrap}
                    id={value.id}
                    onClick={() => {
                      handleClick(value.id);
                    }}
                  >
                    <img src={value.url} alt={`Cat Image-${value.id}`} />
                  </figure>
                ))}
                {loading && (
                  <div className={styles.skeleton}>
                    <div className={styles.shimmer}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {status === "success" && (
            <div ref={observerRef} style={{ height: "1px" }} />
          )}
        </>
      ) : (
        <>
          <div>
            <p>{(error as AxiosError)?.message}</p>
            <button
              onClick={() => {
                refetch();
              }}
            >
              restart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CatViewer;
