import http from "./httpService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = apiUrl + "/admin";

/**
 * Get Customers
 */

export function getCustomers() {
  const type = { userType: "customer" };
  return http.post(apiEndpoint + "/" + "getUsers", type);
}

/**
 * Delete Customer
 */

export function deleteCustomer(id) {
  const data = {
    id: id,
    type: "customer",
  };
  return http.delete(apiEndpoint + "/" + "deleteUser", { data });
}

/**
 * Get Sites
 */

export function getSites() {
  // const type = { userType: "customer" };
  return http.get(apiEndpoint + "/" + "getCreatedWebsites");
}

/**
 * Delete Site
 */

export function deleteSite(siteId) {
  const data = {
    id: siteId,
    type: "customer",
  };
  return http.delete(apiEndpoint + "/" + "deleteUser", { data });
}

/**
 * View Developer Tickets
 */

export function getTickets() {
  // const type = { userType: "developer" };
  return http.get(apiEndpoint + "/" + "getTickets");
}

export function viewInquiries(ticketid) {
  //console.log("ticketid", ticketid);
  const id = { ticketId: ticketid };
  return http.post(apiEndpoint + "/" + "getTicket", id);
}

export function replyTickets(msg, id) {
  console.log("ticketid", msg, id);
  const data = { reply: msg, ticketId: id };
  return http.put(apiEndpoint + "/" + "ticketReply", data);
}
