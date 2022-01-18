import { LOGIN_URL } from "../const/Api";
import request from "./Request";

const LoginPage = (formData) => {
  return request({
    url: LOGIN_URL,
    method: "POST",
    data: formData,
  });
};

export { LoginPage };
