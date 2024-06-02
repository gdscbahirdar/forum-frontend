import React, { useEffect } from "react";
import classNames from "classnames";
import { Menu, Drawer } from "components/ui";
import useResponsive from "utils/hooks/useResponsive";
import {
  updateSelectedCategory,
  toggleMobileSidebar
} from "../Settings/store/stateSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { MenuItem } = Menu;

export const groupList = [
  // { value: "summary", label: "Summary" },
  { value: "answers", label: "Answers" },
  { value: "questions", label: "Questions" },
  { value: "badges", label: "Badges" },
  { value: "reputation", label: "Reputation" }
];

const ActivitySidebarContent = ({ activityPath }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    state => state.settings.state.selectedCategory
  );

  const onMenuClick = category => {
    dispatch(updateSelectedCategory(getCategory(category.value)));
    navigate(`/forum/account/settings/activity/${category.value}`, {
      replace: true
    });
  };

  useEffect(() => {
    const selected = getCategory(activityPath);
    dispatch(updateSelectedCategory(selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategory = value => {
    const categories = [...groupList];
    let category = value;
    return {
      value: category,
      label: categories.find(cat => cat.value === category)?.label
    };
  };

  return (
    <div className="h-full">
      <div>
        <Menu variant="transparent" className="mx-2 mb-10">
          {groupList?.map(menu => (
            <MenuItem
              key={menu.value}
              eventKey={menu.value}
              className={`mb-2 ${selectedCategory.value === menu.value ? "bg-gray-100 dark:bg-gray-700" : ""}`}
              onSelect={() => onMenuClick(menu)}
            >
              <span>{menu.label}</span>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

const ActivitySidebar = ({ activityPath }) => {
  const sideBarExpand = useSelector(
    state => state.settings.state.sideBarExpand
  );

  const mobileSideBarExpand = useSelector(
    state => state.settings.state.mobileSideBarExpand
  );

  const dispatch = useDispatch();

  const { smaller } = useResponsive();

  const onMobileSideBarClose = () => {
    dispatch(toggleMobileSidebar(false));
  };

  return smaller.xl ? (
    <Drawer
      bodyClass="p-0"
      title="Mail"
      isOpen={mobileSideBarExpand}
      onClose={onMobileSideBarClose}
      onRequestClose={onMobileSideBarClose}
      placement="left"
      width={280}
    >
      <ActivitySidebarContent activityPath={activityPath} />
    </Drawer>
  ) : (
    <div
      className={classNames(
        "w-[280px] ease-in-out duration-300 bg-white dark:bg-gray-800 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600 z-10",
        sideBarExpand
          ? "ltr:left-0 rtl:right-0"
          : "ltr:left-[-280px] rtl:right-[-280px]"
      )}
    >
      <ActivitySidebarContent activityPath={activityPath} />
    </div>
  );
};

export default ActivitySidebar;
