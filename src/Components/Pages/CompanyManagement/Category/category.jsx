import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyledPara,
  StyleColumn,
} from "../../../Common/CommonStyle";
import Pagination from "../../../Common/pagination";
import { paginate } from "../../../Common/paginate";
import CategoryTable from "./categoryTable";
import { CompanyContext } from "../../../../context/companyContext";
import { IButtons } from "../../../Common/buttons";
import { SearchBar, Loading } from "../../../Common/icon";
import _ from "lodash";
import { Link } from "react-router-dom";

class Category extends Component {
  static contextType = CompanyContext;

  render() {
    const {
      categories,
      handleCategoryDelete,
      handleCategoryUpdate,
      show,
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

    const { length: count } = categories;

    let filtered = categories;
    if (searchQuery)
      filtered = categories.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allCategories = paginate(sorted, currentPage, pageSize);
    const { length: totalCount } = filtered;

    if (loading) {
      return <Loading />;
    }

    return (
      <>
        <Grid.Column
          mobile={13}
          tablet={13}
          computer={13}
          style={{ animation: "fadeIn 1s ease-in" }}
        >
          <StyleGrid>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <TitleWapper>Categories List</TitleWapper>
              <Grid>
                <Grid.Column mobile={3} tablet={3} computer={3}></Grid.Column>
                <StyleColumn mobile={10} tablet={10} computer={10}>
                  <Grid>
                    <Grid.Column mobile={10} tablet={10} computer={10}>
                      {count === 0 ? (
                        <StyledPara>There are no sites.</StyledPara>
                      ) : (
                        <StyledPara>Showing {totalCount} sites.</StyledPara>
                      )}
                      <br />
                      <Link to="/category/category-form">
                        <IButtons name="Add New" color="blue" icon="add" />
                      </Link>
                    </Grid.Column>
                    <Grid.Column mobile={5} tablet={5} computer={5}>
                      <SearchBar value={searchQuery} onChange={handleSearch} />
                    </Grid.Column>
                  </Grid>
                  <br />
                  <CategoryTable
                    categories={allCategories}
                    currentPage={currentPage}
                    sortColumn={sortColumn}
                    onDelete={handleCategoryDelete}
                    onUpdate={handleCategoryUpdate}
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
      </>
    );
  }
}
export default Category;
