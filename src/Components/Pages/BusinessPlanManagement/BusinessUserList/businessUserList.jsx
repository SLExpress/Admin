import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  TitleWapper,
  StyleColumn,
  StyledPara,
  StyleGrid,
} from "./../../../Common/CommonStyle";
import Pagination from "../../../Common/pagination";
import { paginate } from "./../../../Common/paginate";
import BusinessUserListTable from "./businessUserListTable";
import { BusinessUserContext } from "../../../../context/businessUsersContext";
import { SearchBar, Loading } from "../../../Common/icon";
import _ from "lodash";

class BusinessUserList extends Component {
  static contextType = BusinessUserContext;

  render() {
    const {
      businessUsers,
      handleBusinessUserDelete,
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

    const { length: count } = businessUsers;

    let filtered = businessUsers;
    if (searchQuery)
      filtered = businessUsers.filter((sd) =>
        sd.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allBusinessUsers = paginate(sorted, currentPage, pageSize);
    const { length: totalCount } = filtered;

    if (loading) {
      return <Loading />;
    }

    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Business-User List</TitleWapper>
            <Grid>
              <Grid.Column mobile={1} tablet={1} computer={1}></Grid.Column>
              <StyleColumn mobile={14} tablet={14} computer={14}>
                <Grid>
                  <Grid.Column mobile={11} tablet={11} computer={11}>
                    {count === 0 ? (
                      <StyledPara>There are no Developers.</StyledPara>
                    ) : (
                      <StyledPara>Showing {totalCount} Developers.</StyledPara>
                    )}
                  </Grid.Column>
                  <Grid.Column mobile={5} tablet={5} computer={5}>
                    <SearchBar value={searchQuery} onChange={handleSearch} />
                  </Grid.Column>
                </Grid>
                <br />
                <BusinessUserListTable
                  businessUsers={allBusinessUsers}
                  currentPage={currentPage}
                  sortColumn={sortColumn}
                  onDelete={handleBusinessUserDelete}
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
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default BusinessUserList;
