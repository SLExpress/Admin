import React, { Component } from "react";
import Pagination from "../../../Common/pagination";
import { paginate } from "../../../Common/paginate";
import { Grid } from "semantic-ui-react";
import CustomerDetailsTable from "./customerDetailsTable";
import { CustomerContext } from "../../../../context/customersContext";
import { SearchBar, Loading } from "../../../Common/icon";
import _ from "lodash";
import { StyledPara, StyleColumn } from "../../../Common/CommonStyle";

class CustomerPurchases extends Component {
  static contextType = CustomerContext;

  render() {
    const {
      purchases,
      handleSiteDelete,
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

    const { length: count } = purchases;

    let filtered = purchases;
    if (searchQuery)
      filtered = purchases.filter((s) =>
        s.price.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allPurchases = paginate(sorted, currentPage, pageSize);
    const { length: totalCount } = filtered;
    if (loading) {
      return <Loading />;
    }
    console.log("allPurchases", allPurchases);
    console.log("purchases", purchases);

    return (
      <Grid>
        {/* <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column> */}
        <Grid.Column mobile={15} tablet={15} computer={15}>
          <Grid>
            <Grid.Column mobile={15} tablet={15} computer={15}>
              {count === 0 ? (
                <StyledPara>There are no Payments.</StyledPara>
              ) : (
                <StyledPara>Showing {totalCount} Payments.</StyledPara>
              )}
            </Grid.Column>
            <Grid.Column mobile={5} tablet={5} computer={5}>
              <SearchBar value={searchQuery} onChange={handleSearch} />
            </Grid.Column>
          </Grid>
          <br />
          <CustomerDetailsTable
            purchases={allPurchases}
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default CustomerPurchases;
