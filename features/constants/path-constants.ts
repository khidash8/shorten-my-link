const homePath = () => "/";
const loginPath = () => "/login";
const termsPath = () => "/terms";
const privacyPath = () => "/privacy";
const dashboardPath = () => "/dashboard";
const userPath = () => "/user";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export {
  loginPath,
  homePath,
  termsPath,
  privacyPath,
  baseUrl,
  dashboardPath,
  userPath,
};
