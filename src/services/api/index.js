require("dotenv").config();

const API = process.env.API_URL;
const VERSION = process.env.API_VERSION;

const endPoints = {
  encuesSatisIlforno: {
    getEncuesta: (id) => `${API}${VERSION}/encues_satis_ilforno/${id}`,
    getEncuestas: (limit, offset) =>
      `${API}${VERSION}/encues_satis_ilforno?limit=${limit}&offset=${offset}`,
    addEncuesta: `${API}${VERSION}/encues_satis_ilforno`,
  },
};

export default endPoints;
