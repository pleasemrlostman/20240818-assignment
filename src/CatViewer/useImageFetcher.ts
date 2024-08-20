import api from "./api";
import { AxiosResponse } from "axios";

export const getImage = async <T>(params: { page: number; limit: number }) => {
  try {
    const result: AxiosResponse<T> = await api.get("/v1/images/search--", {
      params,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
