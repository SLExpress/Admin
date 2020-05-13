import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import _ from "lodash";
import Moment from "react-moment";
import moment from "moment";
import styled from "styled-components";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    else if (column.date)
      return <Moment format="DD/MM/YYYY ">{_.get(item, column.date)}</Moment>;
    else if (column.id) {
      const id = _.get(item, column.id);
      const name = this.props.id.filter((n) => n.id == id);
      //console.log("name", name);
      if (name.length == 0) return "Not Found";
      else return name[0].firstName || name[0].name;
    } else if (column.count) {
      var count;
      const id = _.get(item, column.count);
      console.log("id", id);
      var match = this.props.map2.filter((c) => c.scriptId == id);
      const length = match.length;
      console.log("length", length);
      if (length !== 0) {
        count = length;
        return count;
      } else return (count = 0);
    }

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns, id, map2, currentPage } = this.props;
    console.log("id", id);
    // console.log("buyers", map2);
    return (
      <>
        {data &&
          data.map((item, index) => (
            <Table.Body>
              <StyledTable key={item._id}>
                <Table.Cell key={index} styie={{ margin: "0px" }}>
                  {5 * (currentPage - 1) + index + 1}
                </Table.Cell>
                {columns.map((column) => (
                  <Table.Cell key={this.createKey(item, column)}>
                    {this.renderCell(item, column)}
                  </Table.Cell>
                ))}
              </StyledTable>
            </Table.Body>
          ))}
      </>
    );
  }
}

export default TableBody;

const StyledTable = styled(Table.Row)`
  padding: 9px 7px;
  border-top: 1px solid #e9ecef;
  white-space: nowrap;
`;
