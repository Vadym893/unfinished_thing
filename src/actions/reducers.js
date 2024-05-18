import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  actionPending,
  actionFulfilled,
  actionRejected,
} from "../actions/promises";
import { history } from "../App";
import { actionInfoAboutUser } from "../gql/scripts";

const totalReducer = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
  
});

export const store = createStore(totalReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));


const jwtDecode = (token) => {
  try {
    let payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload);
    return payload;
  } catch (e) {
    return undefined;
  }
};


function promiseReducer(state = {}, { type, status, payload, error, name }) {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}


function authReducer(state = {}, { type, token }) {
  if (type === "AUTH_LOGOUT") {
    window.localStorage.removeItem("authToken");
    history.push("/");
    return {};
  }
  if (type === "AUTH_LOGIN") {
    try {
      window.localStorage.setItem("authToken", token);
      return {
        token: token,
        payload: jwtDecode(token),
      };
    } catch (e) {}
  }
  return state;
}

