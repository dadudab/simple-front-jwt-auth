import { clearLogoutTimer, logoutTimer, setLogoutTimer } from "./logoutTimer";
import {
  addExpirationDateToLocalStorage,
  addTokenToLocalStorage,
  getDecodedToken,
  removeAuthenticationDataFromLocalStorage,
} from "./utils";

export interface DecodedToken {
  sub: number | string;
  isAdmin?: boolean;
  roles?: any;
}

export class AuthenticatedUser {
  id: number | string;
  isAdmin?: boolean;
  roles?: any;
}

let user: AuthenticatedUser | null = null;

let loginCallback: () => void = null;
let autologinCallback: () => void = null;
let logoutCallback: () => void = null;

export const getUser = (): AuthenticatedUser | null => user;

export const setLoginCallback = (callback: () => void): void => {
  loginCallback = callback;
};

export const setAutologinCallback = (callback: () => void): void => {
  autologinCallback = callback;
};

export const setLogoutCallback = (callback: () => void): void => {
  logoutCallback = callback;
};

export const handleLogin = (token: string, expiresInSeconds: number): void => {
  const decodedToken = getDecodedToken(token);
  const currentDate = Date.now();
  const expirationDate = currentDate + expiresInSeconds * 1000;
  // token expires in milliseconds
  const expiresIn = expirationDate - currentDate;

  addTokenToLocalStorage(token);
  addExpirationDateToLocalStorage(expirationDate);

  user = new AuthenticatedUser();
  user.id = decodedToken.sub;
  user.isAdmin = decodedToken.isAdmin;
  user.roles = decodedToken.roles;

  setLogoutTimer(expiresIn);
  if (typeof loginCallback === "function") loginCallback();
};

export const checkAutologin = (): void => {
  const token = localStorage.getItem("token");
  const expirationDate = Number(localStorage.getItem("tokenExpirationDate"));
  const currentDate = Date.now();

  if (!token || !expirationDate || currentDate > expirationDate) {
    removeAuthenticationDataFromLocalStorage();
    if (logoutTimer) clearLogoutTimer();
    return;
  }

  handleAutologin(token, expirationDate);
};

export const handleAutologin = (
  token: string,
  expirationDate: number
): void => {
  const decodedToken = getDecodedToken(token);
  const currentDate = Date.now();
  // expires in milliseconds
  const expiresIn = expirationDate - currentDate;

  user = new AuthenticatedUser();
  user.id = decodedToken.sub;
  user.isAdmin = decodedToken.isAdmin;
  user.roles = decodedToken.roles;

  setLogoutTimer(expiresIn);
  if (typeof autologinCallback === "function") autologinCallback();
};

export const handleLogout = (): void => {
  removeAuthenticationDataFromLocalStorage();
  clearLogoutTimer();
  if (typeof logoutCallback === "function") logoutCallback();
};
