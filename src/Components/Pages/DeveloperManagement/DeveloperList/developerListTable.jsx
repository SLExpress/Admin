import React, { Component } from "react";
import { Buttons } from "../../../Common/buttons";
import { IButton } from "../../../Common/icon";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";

class DeveloperListTable extends Component {
  myFunction(developer) {
    this.props.onDetails(developer);
    this.props.onSells(developer);
    // this.context.handleWebsites(developer);
  }

  columns = [
    { path: "username", label: "Username" },
    { path: "email", label: "E-mail" },
    { path: "phone", label: "Phone" },
    {
      key: "details",
      content: (developer) => (
        <Link to={`/developer-details`}>
          <Buttons
            onSubmit={() => this.myFunction(developer)}
            name="Details"
            color="#40a3dc"
          />
        </Link>
      ),
    },
    {
      key: "buttons",
      content: (developer) => (
        <IButton
          onSubmit={() => this.props.onDelete(developer)}
          name="trash alternate outline"
          color="red"
        />
      ),
    },
  ];
  render() {
    const { developers, onSort, sortColumn, currentPage } = this.props;
    console.log("developers", developers);
    return (
      <Tables
        columns={this.columns}
        data={developers}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DeveloperListTable;
