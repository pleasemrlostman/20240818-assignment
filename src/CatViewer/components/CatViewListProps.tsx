import styles from "../style/CatViewer.module.css";
import { useCallback } from "react";
import { calculatePosition } from "../util/util";

interface CatViewListProps {
  groupedImages: Array<Array<{ id: string; url: string }>>;
  loading: boolean;
  status: string;
  observerRef: React.RefObject<HTMLDivElement>;
}

const CatViewList = ({
  groupedImages,
  loading,
  status,
  observerRef,
}: CatViewListProps) => {
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
    <>
      <div className={styles.imageCover}>
        {groupedImages.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.imageGroup}>
            {group.map((value) => (
              <figure
                key={value.id}
                className={styles.imageWrap}
                id={value.id}
                onClick={() => handleClick(value.id)}
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
  );
};

export default CatViewList;
