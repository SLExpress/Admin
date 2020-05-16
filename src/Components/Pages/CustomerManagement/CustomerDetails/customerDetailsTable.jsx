import React, { Component } from "react";
import Tables from "../../../Common/tables";
import { DeveloperContext } from "../../../../context/developersContext";

class CustomerDetailsTable extends Component {
  static contextType = DeveloperContext;

  columns = [
    { date: "createdDate", label: "Date" },
    { path: "paid", label: "Payment Status" },
    { path: "price", label: "Price" },
    // { path: "customer", label: "Customer" },
    { id: "websiteId", label: "Website" },
  ];

  render() {
    const { purchases, onSort, sortColumn, currentPage } = this.props;
    const { webSites } = this.context;
    // console.log("PurchasesDD", purchases);
    // console.log("webSitesDD", webSites);
    return (
      <Tables
        columns={this.columns}
        data={purchases}
        id={webSites}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomerDetailsTable;
