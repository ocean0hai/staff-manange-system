import axios from "axios";

const url ='https://wowms.sszsj.com' 
const apitest = axios.create({
  baseURL: url,
  timeout: 10000,
});

apitest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);

apitest.interceptors.response.use(
  (res) => {
    console.log(res);

    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export { apitest };