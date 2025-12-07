"use client";
import React from "react";

import { Provider } from "react-redux";
import { store } from "./store";
import MyApp from "../components/myapp";

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <MyApp>{children}</MyApp>
    </Provider>
  );
}
