import {
  Box,
  Typography,
  Dialog,
  Drawer,
  useMediaQuery,
  DialogContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useOverlay } from "context/OverlayContext";
import { DIALOGS, DRAWERS } from "Constants";

import SimpleDialogTitle from "common/component/DialogUtils";
import TrackedComponent from "../TrackedComponent";

const drawerWidth = 350;

function OverlayContainer() {
  const { overlay, open, hide, handleExited } = useOverlay();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = (event, reason) => {
    if (
      overlay?.props?.backdropDisabled &&
      reason &&
      reason === "backdropClick"
    ) {
      return;
    }
    hide();
  };

  if (overlay?.type === "dialog") {
    const DialogBody = DIALOGS[overlay?.id];

    return (
      <TrackedComponent event="MODAL_OPEN" params={{ id: overlay?.id }}>
        <Dialog
          maxWidth={overlay?.props?.width || "xs"}
          fullWidth
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          disablebackdropclick="true"
        >
          <DialogBody {...overlay?.props} />
        </Dialog>
      </TrackedComponent>
    );
  }

  if (overlay?.type === "drawer") {
    const DrawerBody = DRAWERS[overlay?.id];

    return (
      <TrackedComponent event="DRAWER_OPEN" params={{ id: overlay?.id }}>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => {
            hide();
            setTimeout(() => handleExited(), 300);
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              {overlay?.props?.title}
            </Typography>
            <DrawerBody {...overlay?.props} />
          </Box>
        </Drawer>
        <Dialog
          sx={{ display: { xs: "block", sm: "none" } }}
          maxWidth="xs"
          fullWidth
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          disablebackdropclick="true"
        >
          <SimpleDialogTitle>{overlay?.props?.title}</SimpleDialogTitle>
          <DialogContent>
            <DrawerBody {...overlay?.props} />
          </DialogContent>
        </Dialog>
      </TrackedComponent>
    );
  }

  return null;
}

export default OverlayContainer;
