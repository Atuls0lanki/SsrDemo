import { AUTH_SIGN_UP } from "..";

const initialState = {
  loggedIn: false,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
}
