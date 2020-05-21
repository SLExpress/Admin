import http from "./httpService";
import { apiUrl } from "../Config/Config.json";

const apiEndpoint = `${apiUrl}/admin`;

/**
 * View Developers
 */

export function getDevelopers() {
  const data = { userType: "developer" };
  return http.post(`${apiEndpoint}/getUsers`, { data });
}

/**
 * Delete Developer
 */

export function deleteDeveloper(id) {
  const data = {
    id: id,
    type: "developer",
  };
  return http.delete(`${apiEndpoint}/deleteUser`, { data });
}

/**
 * View Scripts
 */

export function getScripts() {
  return http.get(`${apiEndpoint}/getScripts`);
}

/**
 * Delete Scripts
 */

export function deleteScript(scriptid) {
  const data = { scriptId: scriptid };
  console.log("data", data);
  return http.delete(`${apiEndpoint}/deleteScript`, { data });
}

/**
 * Approve Scripts
 */

export function approveScript(scriptid) {
  console.log("scriptid", scriptid);
  const data = { scriptId: scriptid };
  return http.patch(`${apiEndpoint}/approveScript`, data);
}

/**
 * Download Scripts
 */
export function downloadScript(id) {
  console.log("scriptid", id);
  const data = { scriptId: id };
  const responseType = "blob";

  const ab = http
    .post(`${apiEndpoint}/downloadScript`, data, responseType)

    .then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/zip" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("href", url);
      link.setAttribute("download", "script.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      link.parentNode.removeChild(link);
    });

  return ab;
}

/**
 * View Developer Tickets
 */

export function getTickets() {
  return http.get(`${apiEndpoint}/getTickets`);
}

export function viewInquiries(ticketid) {
  const id = { ticketId: ticketid };
  return http.post(`${apiEndpoint}/getTicket`, id);
}

export function replyTickets(msg, id) {
  console.log("ticketid", msg, id);
  const data = { reply: msg, ticketId: id };
  return http.put(`${apiEndpoint}/ticketReply`, data);
}

/**
 * Get Payments
 */

export function getPayments(period) {
  console.log("ticketid", period);
  const data = { month: period.month, year: period.year };
  return http.post(`${apiEndpoint}/getEarnings`, data);
}

/**
 * View SinglePurchase
 */

export function getPurchase(id) {
  const data = { purchaseId: id };
  return http.post(`${apiEndpoint}/getPurchase`, data);
}
