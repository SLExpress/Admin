import http from "./httpService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = apiUrl + "/admin/addQuestion";

export function adminQuestion(title, total, answers) {
  return http.put(apiEndpoint, {
    title,
    total,
    answers
  });
}
