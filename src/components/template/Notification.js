import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import withHeaderItem from "utils/hoc/withHeaderItem";
import {
  Dropdown,
  ScrollBar,
  Spinner,
  Badge,
  Button,
  Tooltip
} from "components/ui";
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineMailOpen,
  HiOutlineXCircle
} from "react-icons/hi";
import {
  apiGetNotificationList,
  apiPostNotificationAction,
  apiGetUnreadNotificationCount
} from "services/NotificationService";
import { Link } from "react-router-dom";
import isLastChild from "utils/isLastChild";
import useThemeClass from "utils/hooks/useThemeClass";
import { useSelector } from "react-redux";
import useResponsive from "utils/hooks/useResponsive";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const notificationHeight = "h-72";

const notificationLevelIcon = level => {
  switch (level) {
    case "info":
      return (
        <HiOutlineInformationCircle className="text-blue-600 dark:text-blue-100" />
      );
    case "success":
      return (
        <HiOutlineCheckCircle className="text-emerald-600 dark:text-emerald-100" />
      );
    case "warning":
      return (
        <HiOutlineExclamationCircle className="text-yellow-600 dark:text-yellow-100" />
      );
    case "error":
      return <HiOutlineXCircle className="text-red-600 dark:text-red-100" />;
    default:
      return (
        <HiOutlineInformationCircle className="text-gray-600 dark:text-gray-100" />
      );
  }
};

const NotificationToggle = ({ className, dot }) => {
  return (
    <div className={classNames("text-2xl", className)}>
      {dot ? (
        <Badge badgeStyle={{ top: "3px", right: "6px" }}>
          <HiOutlineBell />
        </Badge>
      ) : (
        <HiOutlineBell />
      )}
    </div>
  );
};

export const Notification = ({ className }) => {
  const [notificationList, setNotificationList] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const { bgTheme } = useThemeClass();

  const { larger } = useResponsive();

  const direction = useSelector(state => state.theme.direction);

  const getUnreadNotificationCount = useCallback(async () => {
    const resp = await apiGetUnreadNotificationCount();
    setUnreadNotification(resp.data.unread_count > 0);
  }, []);

  const getNotificationList = useCallback(async () => {
    setLoading(true);
    const resp = await apiGetNotificationList({ size: 5 });
    setLoading(false);
    const notifications = resp.data.results;
    setNotificationList(notifications);
    setNoResult(notifications.length === 0);
    setUnreadNotification(notifications.some(item => !item.is_read));
  }, []);

  useEffect(() => {
    getUnreadNotificationCount();
    getNotificationList();
  }, [getUnreadNotificationCount, getNotificationList]);

  const onNotificationOpen = useCallback(() => {
    if (notificationList.length === 0) {
      getNotificationList();
    }
  }, [notificationList, getNotificationList]);

  const onMarkAllAsRead = useCallback(async () => {
    await apiPostNotificationAction("mark_as_read", {
      ids: notificationList.map(item => item.id)
    });
    const updatedList = notificationList.map(item => {
      item.is_read = true;
      return item;
    });
    setNotificationList(updatedList);
    setUnreadNotification(false);
  }, [notificationList]);

  const onMarkAsRead = useCallback(
    async id => {
      await apiPostNotificationAction("mark_as_read", { ids: [id] });
      const updatedList = notificationList.map(item => {
        if (item.id === id) {
          item.is_read = true;
        }
        return item;
      });
      setNotificationList(updatedList);
      setUnreadNotification(updatedList.some(item => !item.is_read));
    },
    [notificationList]
  );

  return (
    <Dropdown
      renderTitle={
        <NotificationToggle dot={unreadNotification} className={className} />
      }
      menuClass="p-0 min-w-[280px] md:min-w-[340px]"
      placement={larger.md ? "bottom-end" : "bottom-center"}
      onOpen={onNotificationOpen}
    >
      <Dropdown.Item variant="header">
        <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
          <h6>Notifications</h6>
          <Tooltip title="Mark all as read">
            <Button
              variant="plain"
              shape="circle"
              size="sm"
              icon={<HiOutlineMailOpen className="text-xl" />}
              onClick={onMarkAllAsRead}
            />
          </Tooltip>
        </div>
      </Dropdown.Item>
      <div className={classNames("overflow-y-auto", notificationHeight)}>
        <ScrollBar direction={direction}>
          {notificationList.length > 0 &&
            notificationList.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20 ${!isLastChild(notificationList, index) ? "border-b border-gray-200 dark:border-gray-600" : ""}`}
                onClick={() => onMarkAsRead(item.id)}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  {notificationLevelIcon(item.level)}
                </div>
                <div className="ltr:ml-3 rtl:mr-3">
                  <div>
                    {item.target && (
                      <span className="font-semibold heading-text">
                        {item.target}{" "}
                      </span>
                    )}
                    <span>{item.message}</span>
                  </div>
                  <span className="text-xs">
                    {dayjs(item.created_at).fromNow()}
                  </span>
                </div>
                <Badge
                  className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
                  innerClass={`${item.is_read ? "bg-gray-300" : bgTheme} `}
                />
              </div>
            ))}
          {loading && (
            <div
              className={classNames(
                "flex items-center justify-center",
                notificationHeight
              )}
            >
              <Spinner size={40} />
            </div>
          )}
          {noResult && (
            <div
              className={classNames(
                "flex items-center justify-center",
                notificationHeight
              )}
            >
              <div className="text-center">
                <img
                  className="mx-auto mb-2 max-w-[150px]"
                  src="/img/others/no-notification.png"
                  alt="no-notification"
                />
                <h6 className="font-semibold">No notifications!</h6>
                <p className="mt-1">Please try again later</p>
              </div>
            </div>
          )}
        </ScrollBar>
      </div>
      <Dropdown.Item variant="header">
        <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
          <Link
            to="/forum/notifications"
            className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
          >
            View All Notifications
          </Link>
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default withHeaderItem(Notification);
