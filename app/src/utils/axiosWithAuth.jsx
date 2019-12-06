import axios from "axios";

const AxiosWithAuth = () => {
  return axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUSH,POST,PATCH,DELETE,OPTIONS,PUT"
    }
  });
};

export default AxiosWithAuth;
