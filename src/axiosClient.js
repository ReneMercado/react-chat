import axios from "axios";

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://chatbox-node.herokuapp.com/"
  });

  instance.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem("token");

  return instance;
};

export default AxiosInstance;
