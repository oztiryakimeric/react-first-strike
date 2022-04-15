import React, { useEffect, useState } from "react";

import { useUser } from "context/UserContext";
import { useOverlay } from "context/OverlayContext";

import Login from "../component/Login";
import ResetPassword from "../component/ResetPassword";
import Register from "../component/Register";

function AuthDialog() {
  const { loading, user } = useUser();
  const { hide } = useOverlay();
  const [currentTab, setCurrentTab] = useState("login");

  useEffect(() => {
    // Closes auth dialog when there is an already authenticated user
    if (!loading && user?.uid) {
      hide();
    }
  }, [user?.uid, loading]);

  return (
    <>
      {currentTab === "login" && <Login changeTab={setCurrentTab} />}
      {currentTab === "reset" && <ResetPassword />}
      {currentTab === "register" && <Register />}
    </>
  );
}

export default AuthDialog;
