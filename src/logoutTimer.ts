import { handleLogout } from "./authentication";

export let logoutTimer = null;

export const setLogoutTimer = (expiresIn: number): void => {
  logoutTimer = setTimeout(() => {
    handleLogout();
  }, expiresIn);
};

export const clearLogoutTimer = (): void => {
  clearTimeout(logoutTimer);
};
