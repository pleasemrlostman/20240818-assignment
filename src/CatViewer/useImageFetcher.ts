// src/CatViewer/useInfiniteScroll/useImageFetcher.ts
import api from "./api";
import { AxiosResponse } from "axios";

const getImage = async <T>(params: { page: number; limit: number }) => {
  const result: AxiosResponse<T> = await api.get("/v1/images/search", {
    params,
  });
  return result;
};

export const useImageFetcher = (pageNumber: number, limit: number) => {
  return async () => {
    const { data: catData } = await getImage<CatViewImage[]>({
      page: pageNumber,
      limit,
    });
    return catData;
  };
};
