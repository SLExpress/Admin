import React, { Component } from "react";
import { IButton } from "../../../Common/icon";
import Tables from "../../../Common/tables";
import { Link } from "react-router-dom";

class CategoryTable extends Component {
  columns = [
    { path: "name", label: "Category" },
    {
      key: "button",
      content: (category) => (
        <Link to={`/category/${category._id}`}>
          <IButton
            onSubmit={() => this.props.onUpdate(category, "mini")}
            name="edit outline"
            color="teal"
          />
        </Link>
      ),
    },

    {
      key: "button",
      content: (category) => (
        <IButton
          onSubmit={() => this.props.onDelete(category)}
          name="trash alternate outline"
          color="red"
        />
      ),
    },
  ];
  render() {
    const { categories, onSort, sortColumn, currentPage } = this.props;

    return (
      <Tables
        columns={this.columns}
        data={categories}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CategoryTable;
