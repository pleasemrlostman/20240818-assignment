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

      {/*
        현재는 에러응답을 따로 받고있지만 
        서버에서 에러를 200응답값과 함께 보낸다면 
        아래의 코드를 추가해주면 됨

        => 추가적으로 src/CatViewer/hooks/useInfiniteScroll.tsx에서 
        getImage 제네릭에도 유니언 타입으로 에러 응답값 추가해야함
    */}
      {error && <ErrorInform refetch={refetch} />}
    </div>
  );
};

export default CatViewer;
