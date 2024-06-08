import React, { useEffect, useCallback, useMemo } from "react";
import { DataTable } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { getFacultyAdmins, setTableData } from "../store/dataSlice";
import {
  setSelectedFacultyAdmin,
  setDrawerOpen,
  setSortedColumn
} from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import FacultyAdminEditDialog from "./FacultyAdminEditDialog";
import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setDrawerOpen());
    dispatch(setSelectedFacultyAdmin(row));
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

const UsernameColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      <Link
        className={`hover:${textTheme} rtl:mr-2 font-semibold`}
        to={`/faculty_admins/faculty_admin-details?id=${row.id}`}
      >
        {row.username}
      </Link>
    </div>
  );
};

const columns = [
  {
    Header: "Username",
    accessor: "username",
    sortable: true,
    Cell: props => {
      const row = props.row.original;
      return <UsernameColumn row={row} />;
    }
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Faculty",
    accessor: "faculty"
  },
  {
    Header: "",
    id: "action",
    accessor: row => row,
    Cell: props => <ActionColumn row={props.row.original} />
  }
];

const FacultyAdmins = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.faculty_admins.data.facultyAdminList);
  const loading = useSelector(state => state.faculty_admins.data.loading);
  const filterData = useSelector(state => state.faculty_admins.data.filterData);

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.faculty_admins.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(
      getFacultyAdmins({ pageIndex, pageSize, sort, query, filterData })
    );
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
      <FacultyAdminEditDialog />
    </>
  );
};

export default FacultyAdmins;
