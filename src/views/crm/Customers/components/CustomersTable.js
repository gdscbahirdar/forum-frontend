import React, { useEffect, useCallback, useMemo } from "react";
import { DataTable } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, setTableData } from "../store/dataSlice";
import {
  setSelectedCustomer,
  setDrawerOpen,
  setSortedColumn
} from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import CustomerEditDialog from "./CustomerEditDialog";
import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setDrawerOpen());
    dispatch(setSelectedCustomer(row));
  };

  return (
    <div
      className={`${textTheme} cursor-pointer select-none font-semibold`}
      onClick={onEdit}
    >
      Edit
    </div>
  );
};

const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      <Link
        className={`hover:${textTheme} rtl:mr-2 font-semibold`}
        to={`/students/student-details?id=${row.id}`}
      >
        {row.name}
      </Link>
    </div>
  );
};

const columns = [
  {
    Header: "Name",
    accessor: "name",
    sortable: true,
    Cell: props => {
      const row = props.row.original;
      return <NameColumn row={row} />;
    }
  },
  {
    Header: "Username",
    accessor: "username",
    sortable: true
  },
  {
    Header: "Faculty",
    accessor: "faculty",
    sortable: true
  },
  {
    Header: "Department",
    accessor: "department",
    sortable: true
  },
  {
    Header: "Year in School",
    accessor: "year_in_school",
    sortable: true
  },
  {
    Header: "",
    id: "action",
    accessor: row => row,
    Cell: props => <ActionColumn row={props.row.original} />
  }
];

const Customers = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.crmCustomers.data.customerList);
  const loading = useSelector(state => state.crmCustomers.data.loading);
  const filterData = useSelector(state => state.crmCustomers.data.filterData);

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.crmCustomers.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const onPaginationChange = page => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = value => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort, sortingColumn) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
    dispatch(setSortedColumn(sortingColumn));
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
        loading={loading}
        pagingData={{ pageIndex, pageSize, sort, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />
      <CustomerEditDialog />
    </>
  );
};

export default Customers;
