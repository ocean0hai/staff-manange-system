import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: url,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const codetoken = localStorage.getItem("codetoken");
    if (codetoken) {
      config.headers.codetoken = codetoken;
    } else {
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

api.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      const { codetoken, token } = res.headers;
      if (codetoken) {
        localStorage.setItem("codetoken", codetoken);
        localStorage.removeItem("token");
      } else if (token) {
        localStorage.setItem("token", token);
      }
      return res.data;
    }
  },
  (err) => {
    console.log("request-err", err);
  }
);

export { api };
