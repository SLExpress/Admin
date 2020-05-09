import React, { Component } from "react";
import Tables from "../../../Common/tables";
import { Status } from "../../../Common/icon";
class SiteListTable extends Component {
  columns = [
    { date: "createdDate", label: "Date" },
    { path: "customerId", label: "Customer Name" },
    { path: "scriptId", label: "Site Name" },
    { path: "defaultUrl", label: "Url" },
    { path: "price", label: "Price" },
    {
      key: "button",
      label: "Paid",
      content: (site) => (
        <Status
          // onSubmit={() => this.props.onDelete(site)}
          name="Details"
          color="#40a3dc"
          liked={site.paid}
        />
      ),
    },

    // {
    //   key: "button",
    //   content: site => (
    //     <Buttons
    //       onSubmit={() => this.props.onDelete(site)}
    //       name="Delete"
    //       color="#e60000"
    //     />
    //   )
    // }
  ];
  render() {
    const { sites, onSort, sortColumn, currentPage } = this.props;

    return (
      <Tables
        columns={this.columns}
        data={sites}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SiteListTable;
