import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";
import { DeveloperContext } from "../../../../context/developersContext";

class ProfitTable extends Component {
  static contextType = DeveloperContext;

  columns = [
    { date: "paymentDate", label: "Date" },
    { path: "developer", label: "Developer Name" },
    { path: "payment", label: "Payment (LKR)" },

    {
      key: "link",
      content: (payment) => (
        <Link
          to={{ pathname: `/profit-summary`, payments: payment }}
          onClick={() => this.context.handlePurchase(payment)}
        >
          more...
        </Link>
      ),
    },
  ];
  render() {
    const { payments, onSort, sortColumn, currentPage } = this.props;
    return (
      <Tables
        columns={this.columns}
        data={payments}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default ProfitTable;
