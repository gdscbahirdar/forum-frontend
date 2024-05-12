const baseUrl = process.env.REACT_APP_BASE_URL;

const appConfig = {
  apiPrefix: baseUrl,
  authenticatedEntryPath: "/home",
  unAuthenticatedEntryPath: "/sign-in",
  tourPath: "/",
  enableMock: false
};

export default appConfig;
