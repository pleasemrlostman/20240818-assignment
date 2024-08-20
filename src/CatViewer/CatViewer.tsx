import styles from "./style/CatViewer.module.css";
import useResponsive from "./hooks/useResponsive";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import useGroupedImages from "./hooks/useGroupedImages";
import CatViewList from "./components/CatViewListProps";
import SkeletonNumberGrid from "./components/SkeletonNumberGrid";
import ErrorInform from "./components/ErrorInform";

const CatViewer = () => {
  // 무한 스크롤을 이용해 서버에서 데이터 전달 받는 커스텀 훅
  const { images, loading, observerRef, status, error, refetch, isPending } =
    useInfiniteScroll();

  // 반응형을 위한 커스텀 훅
  const { deviceType } = useResponsive();

  // 서버로 부터 받은 이미지를 2차원 배열로 만들어주는 커스텀 훅
  const groupedImages = useGroupedImages(images, deviceType);

  return (
    <div className={styles.container}>
      <div>1번 과제 - CatViewer</div>
      {!error && (
        <CatViewList
          groupedImages={groupedImages}
          loading={loading}
          status={status}
          observerRef={observerRef}
        />
      )}
      {isPending && (
        <div className={styles.pendingSkeletonWrap}>
          {deviceType === "Mobile" && <SkeletonNumberGrid number={3} />}
          {deviceType === "Tablet" && <SkeletonNumberGrid number={2} />}
          {deviceType === "PC" && <SkeletonNumberGrid number={1} />}
        </div>
      )}
      {error && <ErrorInform refetch={refetch} />}
    </div>
  );
};

export default CatViewer;
