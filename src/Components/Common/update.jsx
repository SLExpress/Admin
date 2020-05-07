import React from "react";

export function update() {
  try {
    if (auth.getCurrentAdmin()) {
      return http.get(apiEndpoint + "/" + "getCategories");
    }
  } catch (ex) {}
}
