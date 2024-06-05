import React, { useEffect, useCallback, useMemo } from "react";
import { Badge, Tooltip } from "components/ui";
import { DataTable } from "components/shared";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  markAsRead,
  markAsUnread,
  setTableData
} from "../store/dataSlice";
import { CiRead, CiUnread } from "react-icons/ci";
import {
  setSelectedRows,
  addRowItem,
  removeRowItem,
  setDeleteMode,
  setSelectedRow
} from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";

const levelColor = {
  info: {
    label: "Info",
    dotClass: "bg-blue-500",
    textClass: "text-blue-500"
  },
  success: {
    label: "Success",
    dotClass: "bg-green-500",
    textClass: "text-green-500"
  },
  warning: {
    label: "Warning",
    dotClass: "bg-yellow-500",
    textClass: "text-yellow-500"
  },
  error: {
    label: "Error",
    dotClass: "bg-red-500",
    textClass: "text-red-500"
  }
};

const NotificationColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onRowClick = useCallback(() => {
    const { target_type, target_object_id, target_slug } = row;
    if (!target_object_id) return;

    let link = "";
    switch (target_type) {
      case "question":
        link = `/questions/question-details?id=${target_slug}`;
        break;
      case "answer":
        link = `/questions/question-details?id=${target_slug}&highlight=${target_object_id}`;
        break;
      case "resource":
        link = `/resource-details?id=${target_object_id}`;
        break;
      default:
        break;
    }

    if (link) {
      navigate(link);
    }
  }, [navigate, row]);

  return (
    <span
      className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
      onClick={onRowClick}
    >
      {row.message}
    </span>
  );
};

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const tableData = useSelector(state => state.notificationList.data.tableData);

  const onDelete = () => {
    dispatch(setDeleteMode("single"));
    dispatch(setSelectedRow([row.id]));
  };

  const onMarkAsRead = async () => {
    await markAsRead([row.id]);
    dispatch(getNotifications(tableData));
  };

  const onMarkAsUnread = async () => {
    await markAsUnread([row.id]);
    dispatch(getNotifications(tableData));
  };

  return (
    <div className="flex justify-end text-lg">
      {row.is_read ? (
        <Tooltip title="Mark as Unread">
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onMarkAsUnread}
          >
            <CiUnread />
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Mark as Read">
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onMarkAsRead}
          >
            <CiRead />
          </span>
        </Tooltip>
      )}
      <Tooltip title="Delete">
        <span
          className="cursor-pointer p-2 hover:text-red-500"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      </Tooltip>
    </div>
  );
};

const NotificationsTable = () => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.notificationList.data.tableData
  );
  const loading = useSelector(state => state.notificationList.data.loading);
  const data = useSelector(
    state => state.notificationList.data.notificationList
  );

  const fetchData = useCallback(() => {
    dispatch(getNotifications({ pageIndex, pageSize, sort, query }));
  }, [dispatch, pageIndex, pageSize, sort, query]);

  useEffect(() => {
    dispatch(setSelectedRows([]));
    fetchData();
  }, [dispatch, fetchData, pageIndex, pageSize, sort]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Message",
        accessor: "message",
        Cell: props => <NotificationColumn row={props.row.original} />
      },
      {
        Header: "Level",
        accessor: "level",
        Cell: props => {
          const { level } = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={levelColor[level].dotClass} />
              <span
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${levelColor[level].textClass}`}
              >
                {levelColor[level].label}
              </span>
            </div>
          );
        }
      },
      {
        Header: "Date",
        accessor: "created_at",
        sortable: true,
        Cell: props => {
          const row = props.row.original;
          return <span>{dayjs(row.created_at).fromNow()}</span>;
        }
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
  };

  const onRowSelect = (checked, row) => {
    if (checked) {
      dispatch(addRowItem([row.id]));
    } else {
      dispatch(removeRowItem(row.id));
    }
  };

  const onAllRowSelect = useCallback(
    (checked, rows) => {
      if (checked) {
        const originalRows = rows.map(row => row.original);
        const selectedIds = [];
        originalRows.forEach(row => {
          selectedIds.push(row.id);
        });
        dispatch(setSelectedRows(selectedIds));
      } else {
        dispatch(setSelectedRows([]));
      }
    },
    [dispatch]
  );

  const getRowProps = row => {
    return {
      className: row.original.is_read
        ? "bg-white"
        : "bg-gray-100 dark:bg-gray-800"
    };
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pagingData={tableData}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
      onCheckBoxChange={onRowSelect}
      onIndeterminateCheckBoxChange={onAllRowSelect}
      selectable
      getRowProps={getRowProps}
    />
  );
};

export default NotificationsTable;
