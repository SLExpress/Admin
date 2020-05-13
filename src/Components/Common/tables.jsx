import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Table } from "semantic-ui-react";

const Tables = ({
  columns,
  sortColumn,
  onSort,
  data,
  map1,
  map2,
  currentPage,
  id,
}) => {
  // console.log("DEVS", col);
  return (
    <Table basic="very">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        columns={columns}
        data={data}
        id={id}
        map2={map2}
        currentPage={currentPage}
      />
    </Table>
  );
};

export default Tables;
