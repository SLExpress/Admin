import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";
import { DeveloperContext } from "../../../../context/developersContext";

class IncomeTable extends Component {
  static contextType = DeveloperContext;

  columns = [
    { date: "paymentDate", label: "Date" },
    { path: "customer", label: "Customer Name" },
    // { path: "customerId", label: "Customer Name" },
    // { path: "developerId", label: "developer Name" },
    { path: "payment", label: "Payment (LKR)" },
    // { path: "purchaseId", label: "PurchaseId" },
    {
      key: "link",
      content: (income) => (
        <Link
          to={{ pathname: `/income-summary`, incomes: income }}
          onClick={() => this.context.handlePurchase(income)}
        >
          more...
        </Link>
      ),
    },
  ];
  render() {
    const { incomes, onSort, sortColumn, currentPage } = this.props;
    return (
      <Tables
        columns={this.columns}
        data={incomes}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default IncomeTable;
