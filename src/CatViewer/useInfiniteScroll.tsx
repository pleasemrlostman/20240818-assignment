import { useState, useEffect } from "react";
import { getImage } from "./useImageFetcher";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useQuery } from "@tanstack/react-query";

const useInfiniteScroll = () => {
  const [images, setImages] = useState<CatViewImage[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data,
    isLoading: loading,
    status,
    error,
    refetch,
    isPending,
  } = useQuery({
    queryKey: [`repoData-${pageNumber}`],
    queryFn: () =>
      getImage<CatViewImage[]>({
        page: pageNumber,
        limit: 10,
      }),
  });

  const observerRef = useIntersectionObserver(() => {
    if (!loading) {
      setPageNumber((prev) => prev + 1);
    }
  });

  const loadImages = async () => {
    if (data) {
      setImages((prev) => [...prev, ...data?.data]);
    }
  };

  useEffect(() => {
    loadImages();
  }, [status]);

  console.log("isPending", "isPending", isPending);

  return { images, loading, observerRef, status, error, refetch, isPending };
};

export default useInfiniteScroll;
