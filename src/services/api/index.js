const API = process.env.API_URL;
const VERSION = process.env.API_VERSION;

const endPoints = {
  auth: {
    login: `${API}${VERSION}/auth/login`,
    profile: `${API}${VERSION}/auth/profile`,
  },
  encuesSatisIlforno: {
    getCountEncuestas: `${API}${VERSION}/encues_satis_ilforno/count`,
    getEncuesta: (id) => `${API}${VERSION}/encues_satis_ilforno/${id}`,
    getEncuestas: (limit, offset) => `${API}${VERSION}/encues_satis_ilforno?limit=${limit}&offset=${offset}`,
    addEncuesta: `${API}${VERSION}/encues_satis_ilforno`,
    updateEncuesta: (id) => `${API}${VERSION}/encues_satis_ilforno/${id}`,
    deleteEncuesta: (id) => `${API}${VERSION}/encues_satis_ilforno/${id}`,
  },
  files: {
    addImage: `${API}${VERSION}/files/upload/`,
  },
};

export default endPoints;