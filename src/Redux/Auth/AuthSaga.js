import { all } from "redux-saga/effects";
import { AUTH_SIGN_UP } from "..";

function* SignUpSaga() {
  console.log("hello2");
}

export default all([AUTH_SIGN_UP, SignUpSaga]);
