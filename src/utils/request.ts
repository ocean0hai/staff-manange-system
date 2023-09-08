import axios from "axios";

const url = import.meta.env.BASE_URL;
const api = axios.create({
  baseURL: url,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);

api.interceptors.response.use(
  (res) => {
    console.log(res);

    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export { api };
