import axios, { AxiosResponse } from "axios";

const config = {
  baseURL: "https://api.thecatapi.com",
  params: {
    api_key:
      "live_k77YJ1Sa3RsUfqEwbuKzrsevPSBW7iCoeeTZKSuj0ahl51TyYwbMXoLhVwwyIIvF",
  },
};

const api = axios.create(config);

export const getImage = async <T>(params: { page: number; limit: number }) => {
  try {
    const result: AxiosResponse<T> = await api.get("/v1/images/search", {
      params,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default api;
