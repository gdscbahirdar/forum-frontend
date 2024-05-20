import React, { useCallback, useMemo } from "react";
import { Card, Table, Avatar, Select, Badge } from "components/ui";
import { useTable } from "react-table";
import { HiCheck, HiOutlineUser } from "react-icons/hi";
import { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderBoardData, setFilterData } from "../store/dataSlice";
import { Link } from "react-router-dom";

const { Tr, Td, TBody, THead, Th } = Table;

const options = [
  { value: "", label: "All", color: "bg-gray-500" },
  { value: "daily", label: "Daily", color: "bg-emerald-500" },
  { value: "weekly", label: "Weekly", color: "bg-red-500" }
];

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${isSelected ? "bg-gray-100 dark:bg-gray-500" : "hover:bg-gray-50 dark:hover:bg-gray-600"}`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <Badge innerClass={data.color} />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const { Control } = components;

const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <Control {...props}>
      {selected && (
        <Badge className="ltr:ml-4 rtl:mr-4" innerClass={selected.color} />
      )}
      {children}
    </Control>
  );
};

const NameColumn = ({ row }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        shape="circle"
        icon={<HiOutlineUser />}
        size={25}
        src={row.avatar}
      />
      <span className="font-semibold">
        {" "}
        <Link to={`/users/${row.username}/answers`}>{row.fullname}</Link>
      </span>
    </div>
  );
};

const Leads = ({ data = [], className }) => {
  const dispatch = useDispatch();

  const handleFilterChange = useCallback(
    option => {
      dispatch(setFilterData({ timeframe: option.value }));
      dispatch(getLeaderBoardData(option.value));
    },
    [dispatch]
  );

  const { timeframe } = useSelector(state => state.leaderBoard.data.filterData);

  const columns = useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "name",
        Cell: props => {
          const row = props.row.original;
          return <NameColumn row={row} />;
        }
      },
      {
        Header: "Rank",
        accessor: "rank"
      },
      {
        Header: "Reputation",
        accessor: "reputation"
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useTable({ columns, data, initialState: { pageIndex: 0 } });

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4>Leads</h4>
        <Select
          options={options}
          size="sm"
          className="mb-4 min-w-[130px]"
          onChange={handleFilterChange}
          components={{
            Option: CustomSelectOption,
            Control: CustomControl
          }}
          value={options.filter(option => option.value === timeframe)}
        />
      </div>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </Card>
  );
};

export default Leads;
