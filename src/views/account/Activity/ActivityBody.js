import React from "react";
import classNames from "classnames";
import { Button } from "components/ui";
import { HiMenu, HiMenuAlt2 } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import useResponsive from "utils/hooks/useResponsive";
import { toggleMobileSidebar } from "views/account/Settings/store/stateSlice";
// import { Summary } from "./Summary";
import UserQuestions from "./UserQuestions";
import UserAnswers from "./UserAnswers";
import { Badges } from "./Badges";
import { Reputation } from "./Reputation";

const ToggleButton = ({ mobileSidebarExpand }) => {
  const dispatch = useDispatch();

  const { smaller } = useResponsive();

  const onMobileSideBar = () => {
    dispatch(toggleMobileSidebar(!mobileSidebarExpand));
  };

  return (
    <Button
      icon={smaller.xl && (mobileSidebarExpand ? <HiMenu /> : <HiMenuAlt2 />)}
      onClick={smaller.xl && onMobileSideBar}
      size="sm"
      variant="plain"
      shape="circle"
    />
  );
};

const ActivityBody = () => {
  const sideBarExpand = useSelector(
    state => state.settings.state.sideBarExpand
  );
  const mobileSidebarExpand = useSelector(
    state => state.settings.state.mobileSidebarExpand
  );
  const selectedCategory = useSelector(
    state => state.settings.state.selectedCategory
  );

  const { smaller } = useResponsive();

  return (
    <div
      className={classNames(
        "w-full ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600"
        // sideBarExpand && "ltr:xl:ml-[280px] rtl:xl:mr-[280px]"
      )}
    >
      <div className="relative flex flex-0 items-center justify-between border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-1">
          {smaller.xl && (
            <ToggleButton
              sideBarExpand={sideBarExpand}
              mobileSidebarExpand={mobileSidebarExpand}
            />
          )}
        </div>
      </div>
      <div>
        {(() => {
          switch (selectedCategory.value) {
            // case "summary":
            //   return <Summary />;
            case "answers":
              return <UserAnswers />;
            case "questions":
              return <UserQuestions />;
            case "badges":
              return <Badges />;
            case "reputation":
              return <Reputation />;
            default:
              return <div>No content</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default ActivityBody;
