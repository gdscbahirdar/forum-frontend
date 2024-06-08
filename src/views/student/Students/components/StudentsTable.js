import React, { useEffect, useCallback, useMemo } from "react";
import { DataTable } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, setTableData } from "../store/dataSlice";
import {
  setSelectedStudent,
  setDrawerOpen,
  setSortedColumn
} from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import StudentEditDialog from "./StudentEditDialog";
import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setDrawerOpen());
    dispatch(setSelectedStudent(row));
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
        to={`/students/student-details?id=${row.id}`}
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
    Header: "Department",
    accessor: "department"
  },
  {
    Header: "Year in School",
    accessor: "year_in_school"
  },
  {
    Header: "",
    id: "action",
    accessor: row => row,
    Cell: props => <ActionColumn row={props.row.original} />
  }
];

const Students = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.students.data.studentList);
  const loading = useSelector(state => state.students.data.loading);
  const filterData = useSelector(state => state.students.data.filterData);

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.students.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getStudents({ pageIndex, pageSize, sort, query, filterData }));
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
      <StudentEditDialog />
    </>
  );
};

export default Students;
