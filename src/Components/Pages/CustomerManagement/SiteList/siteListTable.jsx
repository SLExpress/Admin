import React, { Component } from "react";
import Tables from "../../../Common/tables";
import { Status } from "../../../Common/icon";
import { DeveloperContext } from "../../../../context/developersContext";

class SiteListTable extends Component {
  static contextType = DeveloperContext;

  columns = [
    { date: "createdDate", label: "Date" },
    { path: "customer", label: "Customer Name" },
    { id: "scriptId", label: "Site Name" },
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
    const { scripts } = this.context;
    // console.log("dfdfdf", this.state.site);
    return (
      <Tables
        id={scripts}
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
