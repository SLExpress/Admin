import http from "./httpService";
import auth from "../Service/authAdminService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = apiUrl + "/admin";

/**
 * Get Admin Profile
 */

export function getAdmin() {
  try {
    if (auth.getCurrentAdmin()) {
      return http.get(apiEndpoint + "/" + "getAdmin");
    }
  } catch (ex) {}
}

/**
 *Delete Admin
 */

export function deleteAdmin() {
  console.log("handleAdminDeleteServices");
  // const data = { categoryId: id };
  // console.log(data);

  return http.delete(apiEndpoint + "/" + "deleteAdmin");
}

/**
 * Get Category
 */

export function getCategories() {
  try {
    if (auth.getCurrentAdmin()) {
      return http.get(apiEndpoint + "/" + "getCategories");
    }
  } catch (ex) {}
}

/**
 *Delete Category
 */
export function deleteCategory(id) {
  const data = { categoryId: id };
  console.log(data);

  return http.delete(apiEndpoint + "/" + "deleteCategory", { data });
}

/**
 * Update Category / Add Category
 */
export function saveCategory(category) {
  if (category._id) {
    const data = {
      categoryId: category._id,
      name: category.name,
    };
    return http.patch(apiEndpoint + "/" + "updateCategory ", data);
  }
  const data = {
    name: category.name,
  };
  return http.put(apiEndpoint + "/" + "addCategory", data);
}

/**
 *
 * Get Mission
 */

export function getMission() {
  try {
    return http.get(apiEndpoint + "/" + "getMission");
  } catch (ex) {}
}

export function updateMission(text) {
  const data = {
    content: text,
  };
  return http.patch(apiEndpoint + "/" + "updateMission ", data);
}

/**
 *
 * Get Mission
 */

export function getVision() {
  try {
    return http.get(apiEndpoint + "/" + "getVision");
  } catch (ex) {}
}

export function updateVision(text) {
  const data = {
    content: text,
  };
  return http.patch(apiEndpoint + "/" + "updateVision ", data);
}

/**
 *
 * Get Terms of Services
 */

export function getToS() {
  try {
    return http.get(apiEndpoint + "/" + "getToS");
  } catch (ex) {}
}

export function updateToS(text) {
  const data = {
    content: text,
  };
  return http.patch(apiEndpoint + "/" + "updateToS ", data);
}

/**
 *
 * Get ComapnyDetails
 */

export function getContactDetails() {
  try {
    return http.get(apiEndpoint + "/" + "getCompanyDetails");
  } catch (ex) {}
}

export function updateContactDetails(text) {
  console.log("api", text);
  const data = {
    phone: text.phone,
    address: text.address,
    branches: [text.branch1, text.branch2, text.branch3],
    hours: { opening: text.opening, closing: text.closing },
    email: text.email,
  };
  return http.patch(apiEndpoint + "/" + "updateCompanyDetails ", data);
}
