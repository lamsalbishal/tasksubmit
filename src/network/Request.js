import axios from "axios";
import { BASE_URL } from "../const/Api";

/**
 * Request Wrapper with default success/error actions
 */

const request = async function (options) {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.debug('Status:', error.response.status);
      // console.debug('Data:', error.response.data);
      // console.debug('Headers:', error.response.headers);
      return error.response.data;
    } else {
      // Something else happened while setting up the request
      // triggered the error

      return error.message;
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
