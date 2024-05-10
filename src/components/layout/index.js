import React, { memo, useMemo, lazy, Suspense } from "react";
import { Loading } from "components/shared";
import { useSelector } from "react-redux";
import {
  LAYOUT_TYPE_CLASSIC,
  LAYOUT_TYPE_MODERN,
  LAYOUT_TYPE_SIMPLE,
  LAYOUT_TYPE_STACKED_SIDE,
  LAYOUT_TYPE_DECKED,
  LAYOUT_TYPE_BLANK
} from "constants/theme.constant";
import useAuth from "utils/hooks/useAuth";
import useLocale from "utils/hooks/useLocale";
import { Alert } from "components/ui";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const layouts = {
  [LAYOUT_TYPE_CLASSIC]: lazy(() => import("./ClassicLayout")),
  [LAYOUT_TYPE_MODERN]: lazy(() => import("./ModernLayout")),
  [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import("./StackedSideLayout")),
  [LAYOUT_TYPE_SIMPLE]: lazy(() => import("./SimpleLayout")),
  [LAYOUT_TYPE_DECKED]: lazy(() => import("./DeckedLayout")),
  [LAYOUT_TYPE_BLANK]: lazy(() => import("./BlankLayout"))
};

const Layout = () => {
  const layoutType = useSelector(state => state.theme.layout.type);

  const location = useLocation();
  const { pathname } = location;

  const { authenticated, isFirstTimeLogin } = useAuth();

  useLocale();

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType];
    }
    return lazy(() => import("./AuthLayout"));
  }, [layoutType, authenticated]);

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      {isFirstTimeLogin && pathname !== "/reset-password" && authenticated && (
        <div className="p-4">
          <div className="rounded-md border border-red-200">
            <Alert showIcon title="Change your password!" type="danger">
              You are still using the old password, make sure to change it to
              keep your account secure. &nbsp;
              <Link to="/reset-password">
                <b>
                  <u>Click here to Reset Your Password </u>
                </b>
              </Link>
            </Alert>
          </div>
        </div>
      )}

      <AppLayout />
    </Suspense>
  );
};

export default memo(Layout);
