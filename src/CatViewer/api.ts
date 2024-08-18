import axios from "axios";

const config = {
  baseURL: "https://api.thecatapi.com",
  params: {
    api_key:
      "live_k77YJ1Sa3RsUfqEwbuKzrsevPSBW7iCoeeTZKSuj0ahl51TyYwbMXoLhVwwyIIvF",
  },
};

const api = axios.create(config);

export default api;
