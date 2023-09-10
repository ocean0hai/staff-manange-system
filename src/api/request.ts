import axios from "axios";
import { useMessage } from "naive-ui";
const messsage = useMessage();
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
    if (res.status === 200) {
      return res.data;
    }
    messsage.error(res.statusText);
  },
  (err) => {
    console.log(err);
  }
);

export { api };
