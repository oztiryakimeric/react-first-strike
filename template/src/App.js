import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "common/localization/i18n";

import { UserContextProvider } from "context/UserContext";
import { ThemeContextProvider } from "context/ThemeContext";
import { OverlayContextProvider } from "context/OverlayContext";
import { SnackbarContextProvider } from "context/SnackbarContext";

import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "scene/Navigation";
import OverlayContainer from "common/component/layout/OverlayContainer";
import SnackbarContainer from "common/component/layout/SnackbarContainer";
import Loading from "common/component/Loading";

import { initializeFirebase } from "common/firebase/Firebase";

// eslint-disable-next-line react/prop-types
function AppContext({ children }) {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <SnackbarContextProvider>
          <OverlayContextProvider>{children}</OverlayContextProvider>
        </SnackbarContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize firebase services at the startup...
  useEffect(() => {
    setLoading(true);
    initializeFirebase()
      .catch((err) =>
        console.error(
          "Check your environment file, possibly you didn't provide firebase credentials"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line no-constant-condition
  if (loading) {
    return <Loading minHeight="100vh" />;
  }

  return (
    <BrowserRouter>
      <AppContext>
        <CssBaseline />
        <Navigation />
        <OverlayContainer />
        <SnackbarContainer />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
