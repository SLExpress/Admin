import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";

class IncomeTable extends Component {
  columns = [
    { date: "paymentDate", label: "Date" },
    { path: "firstName", label: "Customer Name" },
    // { path: "developerId", label: "developer Name" },
    { path: "payment", label: "Payment (LKR)" },
    {
      key: "link",
      content: (income) => (
        <Link to={{ pathname: `/income-summary`, incomes: income }}>
          more...
          {/* <Buttons
             onSubmit={() => this.props.onDetails(customer)}
            onSubmit={() => this.myFunction(customer)}
            name="Details"
            color="#40a3dc"
          />  */}
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
