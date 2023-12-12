const isDevelopment = process.env.NODE_ENV === 'development';

const API = isDevelopment ? process.env.API_URL : 'https://lareceta-server.azurewebsites.net/api';
const VERSION = isDevelopment ? process.env.API_VERSION : '/v1';

const endPoints = {
  encuesSatisIlforno: {
    getEncuesta: (id) => `${API}${VERSION}/encues_satis_ilforno/${id}`,
    getEncuestas: (limit, offset) =>
      `${API}${VERSION}/encues_satis_ilforno?limit=${limit}&offset=${offset}`,
    addEncuesta: `${API}${VERSION}/encues_satis_ilforno`,
  },
};

export default endPoints;
