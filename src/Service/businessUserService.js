import http from "./httpService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = apiUrl + "/admin";

/**
 * Business Users List
 */

export function getBusinessUsers() {
  return http.get(apiEndpoint + "/" + "getBusinessUsers");
}

export function deleteBusinessUser(userId) {
  const data = {
    id: userId,
  };
  return http.delete(apiEndpoint + "/" + "deleteBusinessUser", { data });
}
