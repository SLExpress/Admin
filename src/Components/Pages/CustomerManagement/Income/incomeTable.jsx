import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Tables from "../../../Common/tables";

class IncomeTable extends Component {
  columns = [
    { date: "paymentDate", label: "Date" },
    { path: "customer", label: "Customer Name" },
    { path: "developerId", label: "developer Name" },
    { path: "payment", label: "Payment (LKR)" },
  ];
  render() {
    const { earning, onSort, sortColumn, currentPage } = this.props;
    return (
      <Tables
        columns={this.columns}
        data={earning}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default IncomeTable;
