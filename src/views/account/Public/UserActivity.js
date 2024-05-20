import React, { useState, useEffect, Suspense } from "react";
import { Tabs } from "components/ui";
import { AdaptableCard, Container } from "components/shared";
import { useNavigate, useLocation } from "react-router-dom";
// import { Summary } from "views/account/Activity/Summary";
import { Badges } from "views/account/Activity/Badges";
import UserQuestions from "../Activity/UserQuestions";
import UserAnswers from "../Activity/UserAnswers";
import { Reputation } from "../Activity/Reputation";

const { TabNav, TabList } = Tabs;

const activityMenu = {
  // summary: { label: "Summary", path: "summary" },
  answers: { label: "Answers", path: "answers" },
  questions: { label: "Questions", path: "questions" },
  badges: { label: "Badges", path: "badges" },
  reputations: { label: "Reputations", path: "reputations" }
};

const UserActivity = ({ username, data = {} }) => {
  const [currentTab, setCurrentTab] = useState("answers");

  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const onTabChange = val => {
    setCurrentTab(val);
    navigate(`/users/${username}/${val}`);
  };

  useEffect(() => {
    setCurrentTab(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <AdaptableCard>
        <Tabs value={currentTab} onChange={val => onTabChange(val)}>
          <TabList>
            {Object.keys(activityMenu).map(key => (
              <TabNav key={key} value={key}>
                {activityMenu[key].label}
              </TabNav>
            ))}
          </TabList>
        </Tabs>
        <div className="px-4 py-6">
          <Suspense fallback={<></>}>
            {/* {currentTab === "summary" && <Summary data={data} />} */}
            {currentTab === "answers" && <UserAnswers />}
            {currentTab === "questions" && <UserQuestions />}
            {currentTab === "badges" && <Badges />}
            {currentTab === "reputations" && <Reputation />}
          </Suspense>
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default UserActivity;
