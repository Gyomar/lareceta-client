const isDevelopment = import.meta.env.MODE === 'development';

const API = isDevelopment ? import.meta.env.VITE_API_URL : 'https://lareceta-server.azurewebsites.net';

const apiKey = import.meta.env.VITE_API_KEY;


const endPoints = {
  apiKey,
  encuesSatisIlforno: {
    addEncuesta: `${API}/encues-satis-ilforno`,
  },
};

export default endPoints;