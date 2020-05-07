import React, { Component } from "react";
import { Buttons } from "../../../Common/buttons";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";

class PaymentTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "details",
      content: movie => (
        <Link to={`/Payment/${movie._id}`}>
          {/* {movie.title} */}
          <Buttons
            name="Details"
            color="#40a3dc"
            // onSubmit={() => this.props.onDetails(movie)}
          />
        </Link>
      )
    },
    {
      key: "button",
      content: movie => (
        <Buttons
          onSubmit={() => this.props.onDelete(movie)}
          name="Delete"
          color="#e60000"
        />
      )
    }
  ];
  render() {
    const { movies, onSort, sortColumn, currentPage } = this.props;
    return (
      <Tables
        columns={this.columns}
        data={movies}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PaymentTable;
