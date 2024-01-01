import { DecodedToken } from "./authentication";
import { jwtDecode } from "jwt-decode";

export const getDecodedToken = (token: string): DecodedToken => {
  return jwtDecode(token);
};

export const addTokenToLocalStorage = (token: string): void => {
  localStorage.setItem("token", token);
};

export const addExpirationDateToLocalStorage = (
  expirationDate: number
): void => {
  localStorage.setItem("tokenExpirationDate", `${expirationDate}`);
};

export const removeTokenFromLocalStorage = (): void => {
  localStorage.removeItem("token");
};

export const removeExpirationDateFromLocalStorage = (): void => {
  localStorage.removeItem("tokenExpirationDate");
};

export const removeAuthenticationDataFromLocalStorage = (): void => {
  removeTokenFromLocalStorage();
  removeExpirationDateFromLocalStorage();
};
