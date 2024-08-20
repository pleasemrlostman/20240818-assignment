import { useState, useEffect } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useQuery } from "@tanstack/react-query";
import { getImage } from "../api/api";

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
        limit: 30,
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

  return { images, loading, observerRef, status, error, refetch, isPending };
};

export default useInfiniteScroll;
