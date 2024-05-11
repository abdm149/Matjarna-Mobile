import axios from 'axios';
import {BASE_URL} from '../commons/constants';

export class ResponseApi {
  status: number | undefined;
  message: string | undefined;
  data: any;
}

// Create axios instance
const commInstance = axios.create({
  baseURL: BASE_URL,
});

commInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorResponse = new ResponseApi();
    if (!error.response) {
      errorResponse.status = 500;
    } else {
      errorResponse.status = error.response?.status || 500;
    }
    return errorResponse;
  },
);

commInstance.interceptors.request.use(
  config => {
    return config;
  },
  _ => {
    const errorResponse = new ResponseApi();
    errorResponse.status = 500;
    return errorResponse;
  },
);

export default commInstance;
