import React, { Component } from "react";
import { Buttons } from "../../../Common/buttons";
import { IButton } from "../../../Common/icon";
import Tables from "../../../Common/tables";
import { Status } from "../../../Common/icon";

class ScriptListTable extends Component {
  columns = [
    { date: "addedDate", label: "Date" },
    { path: "developer", label: "Developer Name" },
    { path: "name", label: "Site Name" },
    { path: "size", label: "Size" },
    { path: "price", label: "Price" },
    { count: "id", label: "Buyers" },
    {
      key: "button",
      label: "Approval",
      content: (developerSite) => (
        <Status
          onSubmit={() => this.props.onApprovel(developerSite)}
          name="Details"
          color="#40a3dc"
          liked={developerSite.approved}
        />
      ),
    },

    {
      key: "buttons",
      content: (developerSite) => (
        <Buttons
          onSubmit={() => this.props.onDownloadScripts(developerSite)}
          name="Download"
          color="#40a3dc"
        />
      ),
    },

    {
      key: "delete",
      content: (developerSite) => (
        <IButton
          onSubmit={() => this.props.onDelete(developerSite)}
          name="trash alternate outline"
          color="red"
        />
      ),
    },
  ];
  render() {
    const { scripts, map1, map2, onSort, sortColumn, currentPage } = this.props;

    return (
      <Tables
        columns={this.columns}
        data={scripts}
        // map1={map1}
        map2={map2}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ScriptListTable;
