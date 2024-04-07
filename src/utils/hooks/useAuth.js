import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import { apiSignIn, apiSignOut } from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess } from "store/auth/sessionSlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { access, signedIn } = useSelector(state => state.auth.session);

  const signIn = async values => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data) {
        const { access } = resp.data;
        dispatch(onSignInSuccess(access));
        if (resp.data.user) {
          dispatch(
            setUser({
              username: resp.data.user.username,
              authority: [resp.data.user.role_name]
            })
          );
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
    signIn,
    signOut
  };
}

export default useAuth;
