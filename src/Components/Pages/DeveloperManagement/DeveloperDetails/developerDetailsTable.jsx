import React, { Component } from "react";
import Tables from "../../../Common/tables";
import { DeveloperContext } from "../../../../context/developersContext";

class DeveloperDetailsTable extends Component {
  static contextType = DeveloperContext;

  columns = [
    { date: "addedDate", label: "Date" },
    { path: "name", label: "Site Name" },
    { path: "price", label: "Price" },
    // { path: "developer", label: "developer" },
    { path: "size", label: "Size" },
  ];

  render() {
    const { singleScript, onSort, sortColumn, currentPage } = this.props;
    const { webSites } = this.context;
    // console.log("singleScript", singleScript);
    // console.log("webSitesDD", webSites);
    return (
      <Tables
        columns={this.columns}
        data={singleScript}
        id={webSites}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DeveloperDetailsTable;
