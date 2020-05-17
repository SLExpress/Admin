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
import ScriptListTable from "./scriptListTable";
import { DeveloperContext } from "../../../../context/developersContext";
import { SearchBar, Loading } from "../../../Common/icon";
import _ from "lodash";

class ScriptList extends Component {
  static contextType = DeveloperContext;

  render() {
    const {
      developers,
      scripts,
      buyers,
      handleScriptDelete,
      handleApprovel,
      handleDownloadScripts,
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

    const { length: count } = scripts;

    let filtered = scripts;
    if (searchQuery)
      filtered = scripts.filter((sd) =>
        sd.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allScripts = paginate(sorted, currentPage, pageSize);
    const { length: totalCount } = filtered;

    if (loading) {
      return <Loading />;
    }
    //   console.log("buyers", buyers);

    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Script List</TitleWapper>
            <Grid>
              <Grid.Column mobile={1} tablet={1} computer={1}></Grid.Column>
              <StyleColumn mobile={14} tablet={14} computer={14}>
                <Grid>
                  <Grid.Column mobile={11} tablet={11} computer={11}>
                    {count === 0 ? (
                      <StyledPara>There are no Scripts.</StyledPara>
                    ) : (
                      <StyledPara>Showing {totalCount} Scripts.</StyledPara>
                    )}
                  </Grid.Column>
                  <Grid.Column mobile={5} tablet={5} computer={5}>
                    <SearchBar value={searchQuery} onChange={handleSearch} />
                  </Grid.Column>
                </Grid>
                <br />
                <ScriptListTable
                  scripts={allScripts}
                  // map1={developers}
                  map2={buyers}
                  onApprovel={handleApprovel}
                  onDownloadScripts={handleDownloadScripts}
                  currentPage={currentPage}
                  sortColumn={sortColumn}
                  onDelete={handleScriptDelete}
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
export default ScriptList;
