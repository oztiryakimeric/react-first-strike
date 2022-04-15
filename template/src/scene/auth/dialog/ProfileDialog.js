import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  DialogActions,
  Avatar,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";

import { useTranslation } from "react-i18next";
import SimpleDialogTitle from "common/component/DialogUtils";
import { useUser } from "context/UserContext";
import { useOverlay } from "context/OverlayContext";

function ProfileDialog() {
  const { t } = useTranslation();
  const { user, logout } = useUser();
  const { hide } = useOverlay();

  return (
    <>
      <SimpleDialogTitle>{t("profileDialog.title")}</SimpleDialogTitle>

      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MailOutlineIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={t("profileDialog.email")}
            secondary={user?.email}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MailOutlineIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={t("profileDialog.createdAt")}
            secondary={user?.metadata?.creationTime}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Grid3x3Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={t("profileDialog.id")} secondary={user?.uid} />
        </ListItem>
      </List>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            logout();
            hide();
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </>
  );
}

export default ProfileDialog;
