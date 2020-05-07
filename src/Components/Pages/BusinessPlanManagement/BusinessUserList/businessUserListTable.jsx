import React, { Component } from "react";
import { Buttons } from "../../../Common/buttons";
import { IButton } from "../../../Common/icon";
import Tables from "../../../Common/tables";

class BusinessUserListTable extends Component {
  columns = [
    { path: "username", label: "Username" },
    { path: "email", label: "E-mail" },
    { path: "phone", label: "Phone" },
    {
      key: "details",
      content: (businessUser) => (
        <Buttons
          onSubmit={() => this.props.onDelete(businessUser)}
          name="Details"
          color="#40a3dc"
        />
      ),
    },
    {
      key: "button",
      content: (businessUser) => (
        <IButton
          onSubmit={() => this.props.onDelete(businessUser)}
          name="trash alternate outline"
          color="red"
        />
      ),
    },
  ];
  render() {
    const { businessUsers, onSort, sortColumn, currentPage } = this.props;
    console.log("businessUsers", businessUsers);
    return (
      <Tables
        columns={this.columns}
        data={businessUsers}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BusinessUserListTable;
