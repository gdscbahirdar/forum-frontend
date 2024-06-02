import React, { lazy, Suspense, useState } from "react";
import { AdaptableCard, Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import { Tabs } from "components/ui";

injectReducer("bookmarks", reducer);

const BookmarkedPosts = lazy(() => import("./components/BookmarkedPosts"));
const BookmarkedResources = lazy(
  () => import("./components/BookmarkedResources")
);

const { TabNav, TabList } = Tabs;

const settingsMenu = {
  posts: { label: "Posts", path: "posts" },
  resources: { label: "Resources", path: "resources" }
};

const Questions = () => {
  const [currentTab, setCurrentTab] = useState("posts");

  const onTabChange = val => {
    setCurrentTab(val);
  };

  return (
    <>
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
              {currentTab === "posts" && <BookmarkedPosts />}
              {currentTab === "resources" && <BookmarkedResources />}
            </Suspense>
          </div>
        </AdaptableCard>
      </Container>
    </>
  );
};

export default Questions;
