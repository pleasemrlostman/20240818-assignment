import { useState, useEffect } from "react";
import { useImageFetcher } from "./useImageFetcher";
import { useIntersectionObserver } from "./useIntersectionObserver";

const useInfiniteScroll = () => {
  const [images, setImages] = useState<CatViewImage[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = useImageFetcher(pageNumber, 10);

  const loadImages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const catData = await fetchImages();
      setImages((prev) => [...prev, ...catData]);
    } finally {
      setLoading(false);
    }
  };

  const observerRef = useIntersectionObserver(() => {
    if (!loading) {
      setPageNumber((prev) => prev + 1);
    }
  });

  useEffect(() => {
    loadImages();
  }, [pageNumber]);

  return { images, loading, observerRef };
};

export default useInfiniteScroll;
