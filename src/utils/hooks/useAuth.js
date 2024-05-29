import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import { apiSignIn, apiSignOut } from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess } from "store/auth/sessionSlice";
import { setFaculties } from "store/meta/facultySlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";
import { apiGetFaculties } from "services/FacultyService";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { access, signedIn } = useSelector(state => state.auth.session);
  const { is_first_time_login } = useSelector(state => state.auth.user);

  const signIn = async values => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data) {
        const { access, refresh } = resp.data;
        dispatch(onSignInSuccess({ access, refresh }));
        if (resp.data.user) {
          dispatch(
            setUser({
              username: resp.data.user.username,
              full_name:
                resp.data.user.first_name +
                " " +
                resp.data.user.middle_name +
                " " +
                resp.data.user.last_name,
              is_first_time_login: resp.data.user.is_first_time_login,
              authority: [resp.data.user.role_name],
              faculty: resp.data.user.faculty,
              avatar: resp.data.user.avatar,
              reputation: resp.data.user.reputation,
              badges: resp.data.user.badges
            })
          );
          const faculties = await apiGetFaculties();
          if (faculties.data) {
            dispatch(setFaculties(faculties.data.results));
          }
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: ""
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data.non_field_errors || errors.toString()
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    await apiSignOut();
    handleSignOut();
  };

  return {
    authenticated: access && signedIn,
    isFirstTimeLogin: is_first_time_login,
    signIn,
    signOut
  };
}

export default useAuth;
