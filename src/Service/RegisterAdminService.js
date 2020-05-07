import http from "./httpService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = apiUrl + "/admin/sign-up";

export function adminRegister(admin) {
  // const data = {
  //   username: admin.username,
  //   firstname: admin.firstname,
  //   lastname: admin.lastname,
  //   email: admin.email,
  //   password: admin.password,
  //   phone: admin.phone
  // };
  // console.log(data);
  return http.put(apiEndpoint, {
    // data
    username: admin.username,
    firstname: admin.firstname,
    lastname: admin.lastname,
    email: admin.email,
    password: admin.password,
    phone: admin.phone
  });
}
