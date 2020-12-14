import * as types from "./ActionTypes";

export const setUserState = (payload: any) => {
  return { type: types.USER_LOGIN_SUCCESS, payload };
};
export const resetUserState = () => {
  return { type: types.USER_LOGOUT };
};
// export const getError = (payload: any) => {
//   return { type: types.USER_LOGIN_ERROR, payload };
// };
// export const resetError = () => {
//   return { type: types.USER_LOGIN_ERROR,  };
// };
