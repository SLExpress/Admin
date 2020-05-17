import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { DeveloperContext } from "../../../../context/developersContext";
import PaymentForm from "./paymentForm";
import PaymentTable from "./paymentTable";
import Pagination from "../../../Common/pagination";
import { paginate } from "../../../Common/paginate";
import { SearchBar, Loading } from "../../../Common/icon";
import _ from "lodash";

class Payments extends Component {
  static contextType = DeveloperContext;

  renderTotalpayment(payment) {
    let totalPayment = 0;
    var total = payment.map((t) => {
      totalPayment += parseInt(t.payment);

      //   console.log("totalincome", totalIncome);
    });
    // for(var i = 0 ; i<= income.length; i++){
    console.log("totalPayment", totalPayment);

    // }

    return totalPayment;
  }

  render() {
    const {
      payments,
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

    const { length: count } = payments;

    let filtered = payments;
    if (searchQuery)
      filtered = payments.filter((i) =>
        i.developer.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allPayments = paginate(sorted, currentPage, pageSize);
    const { length: totalCount } = filtered;

    if (loading) {
      return <Loading />;
    }
    console.log("allPayments", allPayments);
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
            <TitleWapper>Payments</TitleWapper>
            <Grid>
              <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
              <StyleColumn
                mobile={12}
                tablet={12}
                computer={12}
                style={{ marginBottom: "15rem" }}
              >
                <PaymentForm />

                {payments && (
                  <>
                    <PaymentTable
                      payments={allPayments}
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
                  Total = Rs.{this.renderTotalpayment(payments)} /=
                </Header>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default Payments;
