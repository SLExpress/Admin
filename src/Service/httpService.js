import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

// axios({
//   url: "http://slexpress.tk:3000/admin/downloadScript",
//   method: "post",
//   data: {
//     scriptId: "5eb3b4bba053506cec1da026",
//     // year: "2020",
//     //   lastname: "Saubhagyaqsd",
//     //   email: "yasmikasyasssdhq@gmail.com",
//     //   password: "qqqqqqqsdq",
//     //   phone: 1501762822
//   },

//   headers: {
//     "Content-Type": "application/json",

//     responseType: "blob",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWM0YWNhNjAwYTM2ZjY0ZGM2MjI1NWUiLCJlbWFpbCI6Inp6enpAZ21haWwuY29tIiwiaWF0IjoxNTkwMDc0NDM0LCJleHAiOjE1OTAwNzgwMzR9.k_AyH1HA-BuX6j_up1kYGkff4eFTKwocI6Opa2fPOWw",
//   },
// })
//   .then((response) => {
//     const url = window.URL.createObjectURL(
//       new Blob([response], { type: "application/zip" })
//     );
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("href", url);
//     link.setAttribute("download", "script.zip");
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     // link.parentNode.removeChild(link);
//   })

//   .catch((error) => {
//     console.log(error);
//   });

export function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
