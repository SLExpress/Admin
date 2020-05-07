import http from "./httpService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = apiUrl + "/admin/sign-in";
const tokenKey = "token";

// http.setJwt(getJwt());

export async function adminLogin(admin) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: admin.email,
    password: admin.password,
  });
  //console.log(jwt);
  localStorage.setItem(tokenKey, jwt.token);
  localStorage.setItem("username", jwt.username);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function adminLogOut() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("username");
  localStorage.removeItem("open");
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());

export function getCurrentAdmin() {
  try {
    const username = localStorage.getItem("username");
    return username;
  } catch (EX) {
    return null;
  }
}

export default {
  adminLogin,
  adminLogOut,
  getCurrentAdmin,
};
