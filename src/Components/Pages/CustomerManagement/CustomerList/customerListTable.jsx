import React, { Component } from "react";
import { Buttons } from "../../../Common/buttons";
import { IButton } from "../../../Common/icon";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";
import { DeveloperContext } from "../../../../context/developersContext";

class CustomerListTable extends Component {
  static contextType = DeveloperContext;

  myFunction(customer) {
    this.props.onDetails(customer);
    this.props.onPurchases(customer);
    this.context.handleWebsites(customer);
  }
  columns = [
    { path: "username", label: "Username" },
    { path: "email", label: "E-mail" },
    { path: "phone", label: "Phone" },
    {
      key: "button",
      content: (customer) => (
        <Link to={`/user-details`}>
          <Buttons
            // onSubmit={() => this.props.onDetails(customer)}
            onSubmit={() => this.myFunction(customer)}
            name="Details"
            color="#40a3dc"
          />
        </Link>
      ),
    },

    {
      key: "buttons",
      content: (customer) => (
        <IButton
          onSubmit={() => this.props.onDelete(customer)}
          name="trash alternate outline"
          color="red"
        />
      ),
    },
  ];
  render() {
    const { customers, onSort, sortColumn, currentPage } = this.props;
    console.log("customer", customers);
    return (
      <Tables
        columns={this.columns}
        data={customers}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomerListTable;
