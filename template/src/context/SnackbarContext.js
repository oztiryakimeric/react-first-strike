import React, { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";

const SnackbarContext = createContext({
  open: true,
});

export function SnackbarContextProvider({ children }) {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const openSnackbar = (type, message) => {
    setSnackPack((prev) => [
      ...prev,
      { message, type, key: new Date().getTime() },
    ]);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const contextValue = useMemo(() => {
    return { messageInfo, open, openSnackbar, closeSnackbar, handleExited };
  }, [messageInfo?.key, messageInfo?.message, messageInfo?.type, open]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
}

SnackbarContextProvider.defaultProps = {
  children: null,
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useSnackbar = () => useContext(SnackbarContext);
