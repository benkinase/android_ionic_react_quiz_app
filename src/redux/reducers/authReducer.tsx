import * as Actions from "../ActionTypes";

const initialState = {};

export const authReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case Actions.USER_LOGIN_REQUEST:
      return Object.assign({}, state, { loading: true });
    case Actions.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { loading: false, user: payload });
    case Actions.USER_LOGIN_ERROR:
      return Object.assign({}, state, { loading: false, error: payload });
    case Actions.USER_REGISTER_REQUEST:
      return Object.assign({}, state, { loading: true });
    case Actions.USER_REGISTER_SUCCESS:
      return Object.assign({}, state, { loading: false, user: payload });
    case Actions.USER_REGISTER_ERROR:
      return Object.assign({}, state, { loading: false, error: payload });
    case Actions.USER_LOGOUT:
      return Object.assign({}, state, { user: {} });

    default:
      return state;
  }
};
