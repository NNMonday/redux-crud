import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import UserReducer from "./reducers/UserReducer";

export default function StoreProvider({ children }) {
  const store = configureStore({
    reducer: { users: UserReducer },
  });
  return <Provider store={store}>{children}</Provider>;
}
