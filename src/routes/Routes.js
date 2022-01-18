import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../component/PageNotFound/PageNotFound";

import Home from "../pages/Home";
import Login from "../pages/Login";
import RequireAuth from "./PrivateRoute";


function ReactRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth logincomponent={"auth"}>
                <Home />
              </RequireAuth>
            }
          />

          <Route
            path="/login"
            element={
              <RequireAuth logincomponent={"login"}>
                <Login />
              </RequireAuth>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default ReactRoutes;
