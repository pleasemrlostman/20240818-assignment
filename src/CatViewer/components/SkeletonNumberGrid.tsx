import styles from "../style/CatViewer.module.css";
import { generateRandomNumber } from "../util/util";

const SkeletonNumberGrid = ({ number }: { number: number }) => {
  const generateArray = () =>
    Array.from({ length: number }, () => generateRandomNumber(300, 500));
  const array2D = Array.from({ length: 9 }, () => generateArray());

  return (
    <>
      {array2D.map((row, index) => (
        <div key={index}>
          {row.map((value, index) => (
            <div
              className={`${styles.skeleton} ${styles.pendingSkeleton}`}
              style={{
                height: `${value}px`,
              }}
              key={index}
            >
              <div className={styles.shimmer} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default SkeletonNumberGrid;
