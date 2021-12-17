import { User } from "./types";

export const setItem = (key: string, value: string | User) => {
  value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  let value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value!);
  } catch (e) {
    return null;
  }
};
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};
