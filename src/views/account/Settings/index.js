import React, { useState, useEffect, Suspense, lazy } from "react";
import { Tabs } from "components/ui";
import { AdaptableCard, Container } from "components/shared";
import { useNavigate, useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { apiGetProfileData } from "services/AccountServices";
import { injectReducer } from "store";
import reducer from "./store";

injectReducer("settings", reducer);

const Profile = lazy(() => import("../Profile"));
const Password = lazy(() => import("../Password"));
const Activity = lazy(() => import("../Activity"));

const { TabNav, TabList } = Tabs;

const settingsMenu = {
  profile: { label: "Profile", path: "profile" },
  activity: { label: "Activity", path: "activity" },
  password: { label: "Password", path: "password" }
};

const Settings = () => {
  const [currentTab, setCurrentTab] = useState("profile");
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const settingsIndex = pathSegments.indexOf("settings");

  let path;
  let activityPath;

  if (settingsIndex !== -1 && settingsIndex < pathSegments.length - 1) {
    path = pathSegments[settingsIndex + 1];
    activityPath = pathSegments[settingsIndex + 2];
  }

  const onTabChange = val => {
    setCurrentTab(val);
    if (val === "activity") {
      navigate(`/forum/account/settings/activity/answers`);
    } else {
      navigate(`/forum/account/settings/${val}`);
    }
  };

  const fetchData = async () => {
    const response = await apiGetProfileData();
    setData(response.data);
  };

  useEffect(() => {
    setCurrentTab(path);
    if (isEmpty(data)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <AdaptableCard>
        <Tabs value={currentTab} onChange={val => onTabChange(val)}>
          <TabList>
            {Object.keys(settingsMenu).map(key => (
              <TabNav key={key} value={key}>
                {settingsMenu[key].label}
              </TabNav>
            ))}
          </TabList>
        </Tabs>
        <div className="px-4 py-6">
          <Suspense fallback={<></>}>
            {currentTab === "profile" && <Profile data={data} />}
            {currentTab === "activity" && (
              <Activity activityPath={activityPath} />
            )}
            {currentTab === "password" && <Password />}
          </Suspense>
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default Settings;
