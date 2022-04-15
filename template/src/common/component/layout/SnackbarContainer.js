import { Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "context/SnackbarContext";

function SnackbarContainer() {
  const { messageInfo, open, closeSnackbar, handleExited } = useSnackbar();

  return (
    <Snackbar
      key={messageInfo?.key}
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      TransitionProps={{ onExited: handleExited }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={closeSnackbar}
        >
          <CloseIcon />
        </IconButton>
      }
    >
      <Alert
        onClose={closeSnackbar}
        severity={messageInfo?.type}
        sx={{ width: "100%" }}
      >
        {messageInfo?.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarContainer;
