// import "./App.css";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StorageName } from "./const/const";
import ReactRoutes from "./routes/Routes";
import { addLoginCheck, addUserDetails } from "./Store/actions/actions";
import "./assets/css/style.css";

function App() {
  const dispatch = useDispatch();
  useEffect(async () => {
    await getUserData();
  }, []);

  const getUserData = () => {
    const verifyUser = localStorage.getItem(StorageName);
    if (verifyUser != null) {
      dispatch(addLoginCheck());
      dispatch(addUserDetails(JSON.parse(verifyUser)));
    }
  };
  return (
    <div className="App">
      <ReactRoutes />
    </div>
  );
}

export default App;
