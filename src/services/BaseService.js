import axios from "axios";
import appConfig from "configs/app.config";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "constants/api.constant";
import { PERSIST_STORE_NAME } from "constants/app.constant";
import deepParseJson from "utils/deepParseJson";
import store from "../store";
import { onSignOutSuccess, onSignInSuccess } from "../store/auth/sessionSlice";

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix
});

BaseService.interceptors.request.use(
  config => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);

    const accessToken = persistData.auth.session.access;

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

async function refreshToken() {
  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
  const persistData = deepParseJson(rawPersistData);
  const refreshToken = persistData.auth.session.refresh;

  try {
    const response = await axios.post(
      appConfig.apiPrefix + "/users/token/refresh/",
      {
        refresh: refreshToken
      }
    );
    const { access, refresh } = response.data;
    store.dispatch(onSignInSuccess({ access, refresh }));

    return access;
  } catch (error) {
    store.dispatch(onSignOutSuccess());
    return null;
  }
}

BaseService.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;
    const originalRequest = config;

    if (response && response.data.code === "token_not_valid") {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers[REQUEST_HEADER_AUTH_KEY] =
          `${TOKEN_TYPE} ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(onSignOutSuccess());
    }

    return Promise.reject(error);
  }
);

export default BaseService;
