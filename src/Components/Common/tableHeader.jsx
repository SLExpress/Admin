import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Up, Down } from "./icon";

class TableHeader extends Component {
  raiseSort = (column) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === column.path || sortColumn.path === column.date)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = column.path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <Down />;
    return <Up />;
  };

  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key="No">No</Table.HeaderCell>
          {this.props.columns.map((column) => (
            <Table.HeaderCell
              key={
                column.path ||
                column.id ||
                column.count ||
                column.date ||
                column.key
              }
              onClick={() => this.raiseSort(column)}
            >
              {column.label} {this.renderSortIcon(column)}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  }
}
export default TableHeader;

// const TableHeader = ({ header }) => {
//   console.log(header);
//   return (
//     <Table.Header style={{ background: "#e9ecef" }}>
//       <Table.Row>
//         {header.map(title => (
//           <Table.HeaderCell key={title}>{title.label}</Table.HeaderCell>
//         ))}
//       </Table.Row>
//     </Table.Header>
//   );
// };

// export default TableHeader;
