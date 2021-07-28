import { useTable } from "react-table";
import React from "react";
//import { GenHeader } from "./GenHeader";

export const BaseTable = (props) => {
  const { Records, cols } = { ...props };
  if (Records.length === 0) {
    return <h2>No Records found</h2>;
  } else {
    return Table(Records, cols);
  }
};
const Table = (Records, cols) => {
  var abc = [];
  if (cols === undefined || cols.length === 0) {
    abc = GenHeader(Records);
  } else {
    abc = cols;
  }
  const data = React.useMemo(() => Records, [Records]);
  const columns = React.useMemo(() => abc, [Records]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table class="table text-nowrap text-md-nowrap mg-b-0" {...getTableProps()} >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th scope="row" {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

var list = [];
const GenHeader = (Data) => {
  iterate(Data[0]);
  return list;
};
const iterate = (obj, str = "", num = -1) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      list.push({ Header: key, columns: [] });
      str === "" ? (str = key) : (str = str + "." + key);
      num = list.length - 1;
      iterate(obj[key], str, num);
      return;
    }
    num !== -1
      ? list[num].columns.push({
          Header: key,
          accessor: `${str}.${key}`,
        })
      : list.push({ Header: key, accessor: key });
  });
};
