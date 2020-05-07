import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper, StyleGrid } from "../../../Common/CommonStyle";
import Pagination from "../../../Common/pagination";
import { paginate } from "../../../Common/paginate";
import { getMovies } from "../../../../FakeDatabase/fakeMovieService";
import PaymentTable from "./paymentTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Payment extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount = () => {
    this.setState({ movies: getMovies() });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleDetails = (movie) => {
    console.log("details");
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePreviousPageChange = (page) => {
    this.setState({ currentPage: page - 1 });
  };

  handleNextPageChange = (page) => {
    this.setState({ currentPage: page + 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { pageSize, currentPage, sortColumn, movies: allMovies } = this.state;

    const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no Payments in the database.</p>;

    const { data: movies } = this.getPageData();

    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            {/* <img src="./images/background.jpg" /> */}
            <TitleWapper>Payment</TitleWapper>
            {/* <img src="./images/.jpg" /> */}
            <p>Showing {count} Payments in the database.</p>
            <Link
              to="Payment/newPayment"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <PaymentTable
              movies={movies}
              currentPage={currentPage}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onDetails={this.handleDetails}
              onSort={this.handleSort}
            />
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPreviousPageChange={this.handlePreviousPageChange}
              onPageChange={this.handlePageChange}
              onNextPageChange={this.handleNextPageChange}
            />
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default Payment;
