import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { CustomerContext } from "../../../../context/customersContext";
import IncomeForm from "./incomeForm";
import IncomeTable from "./incomeTable";
import Pagination from "../../../Common/pagination";
import { paginate } from "../../../Common/paginate";
import { SearchBar, Loading } from "../../../Common/icon";
import _ from "lodash";

class Income extends Component {
  static contextType = CustomerContext;

  renderTotalIncome(income) {
    let totalIncome = 0;
    var total = income.map((t) => {
      totalIncome += parseInt(t.payment);

      //   console.log("totalincome", totalIncome);
    });
    // for(var i = 0 ; i<= income.length; i++){
    console.log("totalIncome", totalIncome);

    // }

    return totalIncome;
  }

  render() {
    const {
      income,
      handlePageChange,
      handlePreviousPageChange,
      handleNextPageChange,
      handleSort,
      loading,
      currentPage,
      pageSize,
      searchQuery,
      handleSearch,
      sortColumn,
    } = this.context;

    const { length: count } = income;

    let filtered = income;
    if (searchQuery)
      filtered = income.filter((i) =>
        i.customer.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allIncome = paginate(sorted, currentPage, pageSize);
    const { length: totalCount } = filtered;

    if (loading) {
      return <Loading />;
    }
    console.log("INCOME", income);
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid
        // style={{ overflowX: "scroll" }}
        >
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Income</TitleWapper>
            <Grid>
              <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
              <StyleColumn
                mobile={12}
                tablet={12}
                computer={12}
                style={{ marginBottom: "15rem" }}
              >
                <IncomeForm />

                {income && (
                  <>
                    <IncomeTable
                      incomes={allIncome}
                      currentPage={currentPage}
                      sortColumn={sortColumn}
                      onSort={handleSort}
                    />

                    <Pagination
                      itemCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPreviousPageChange={handlePreviousPageChange}
                      onPageChange={handlePageChange}
                      onNextPageChange={handleNextPageChange}
                    />
                  </>
                )}

                <Header as="h3">
                  Total = Rs.{this.renderTotalIncome(income)} /=
                </Header>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default Income;
