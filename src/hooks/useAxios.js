import axios from "axios";

export const useAxios = (method, url, data = null) => {
  return axios({ method, url, data })
    .then((res) => res.data)
    .catch((err) => err);
};

