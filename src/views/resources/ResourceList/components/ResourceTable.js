import React, { useEffect, useMemo, useCallback } from "react";
import { DataTable } from "components/shared";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getMyResources, getResources, setTableData } from "../store/dataSlice";
import { setSortedColumn, setSelectedResource } from "../store/stateSlice";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import ResourceDeleteConfirmation from "./ResourceDeleteConfirmation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/resource-edit/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedResource(row.id));
  };

  const user = useSelector(state => state.auth.user);

  return (
    <div className="flex justify-end text-lg">
      {user?.username === row.user && (
        <>
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onEdit}
          >
            <HiOutlinePencil />
          </span>
          <span
            className="cursor-pointer p-2 hover:text-red-500"
            onClick={onDelete}
          >
            <HiOutlineTrash />
          </span>
        </>
      )}
    </div>
  );
};

const TitleColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      <Link
        className={`hover:${textTheme} rtl:mr-2 font-semibold`}
        to={`/resource-details/${row.id}`}
      >
        {row.name}
      </Link>
    </div>
  );
};

const ResourceTable = () => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.resources.data.tableData
  );
  const filterData = useSelector(state => state.resources.data.filterData);
  const loading = useSelector(state => state.resources.data.loading);
  const data = useSelector(state => state.resources.data.resourceList);
  const location = useLocation();

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  let path;
  if (location.pathname.includes("my-uploads")) {
    path = "my-uploads";
  } else {
    path = "resources";
  }

  const fetchData = useCallback(() => {
    if (path === "my-uploads") {
      dispatch(
        getMyResources({
          pageIndex,
          pageSize,
          sort,
          query,
          ...filterData
        })
      );
      return;
    } else {
      dispatch(
        getResources({ pageIndex, pageSize, sort, query, ...filterData })
      );
    }
  }, [dispatch, path]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, fetchData]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: props => {
          const row = props.row.original;
          return <TitleColumn row={row} />;
        }
      },
      {
        Header: "Category",
        accessor: "category",
        sortable: false,
        Cell: props => {
          const row = props.row.original;
          return (
            <span className="capitalize">
              {row?.categories?.slice(0, 2).join(", ")}
              {row?.categories?.length > 2 && "..."}
            </span>
          );
        }
      },
      {
        Header: "Uploaded By",
        accessor: "user"
      },
      {
        Header: "Views",
        accessor: "view_count",
        sortable: true
      },
      {
        Header: "",
        id: "action",
        accessor: row => row,
        Cell: props => <ActionColumn row={props.row.original} />
      }
    ],
    []
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
      {data.length === 0 && !loading && (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="mt-6 text-center">
            <p className="text-base">No resources found.</p>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <DataTable
          columns={columns}
          data={data}
          skeletonAvatarColumns={[0]}
          skeletonAvatarProps={{ className: "rounded-md" }}
          loading={loading}
          pagingData={tableData}
          onPaginationChange={onPaginationChange}
          onSelectChange={onSelectChange}
          onSort={onSort}
        />
      )}
      <ResourceDeleteConfirmation />
    </>
  );
};

export default ResourceTable;
