import { PropTypes } from "prop-types";
import {
  AppBar as MuiAppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import AccountCircle from "@mui/icons-material/AccountCircle";

import { useTranslation } from "react-i18next";
import { useUser } from "context/UserContext";
import { useOverlay } from "context/OverlayContext";
import { useTheme } from "context/ThemeContext";

function GenericAppBar({ title, children }) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </MuiAppBar>
  );
}

GenericAppBar.defaultProps = {
  children: null,
};

GenericAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

function ThemeLightingToggle() {
  const { isDark, toggleLighting } = useTheme();

  return (
    <IconButton size="large" onClick={() => toggleLighting()} color="inherit">
      {isDark && <LightModeIcon />}
      {!isDark && <DarkModeIcon />}
    </IconButton>
  );
}

function SettingsButton() {
  const { t } = useTranslation();
  const { showDrawer } = useOverlay();

  return (
    <IconButton
      size="large"
      onClick={() =>
        showDrawer({
          id: "SETTINGS_DRAWER",
          props: { title: t("settingsDrawer.title") },
        })
      }
      color="inherit"
    >
      <MoreVertIcon />
    </IconButton>
  );
}

function ProfileButton() {
  const { t } = useTranslation();
  const { loading, user } = useUser();
  const { showDialog } = useOverlay();

  return (
    <>
      {!loading && !user?.uid && (
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => showDialog({ id: "LOGIN_DIALOG" })}
        >
          {t("profileMenu.login")}
        </Button>
      )}
      {!loading && user?.uid && (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() =>
            showDialog({
              id: "PROFILE_DIALOG",
              props: { backdropDisabled: true },
            })
          }
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      )}
    </>
  );
}

function AppBar() {
  return (
    <GenericAppBar title="React First Strike">
      <>
        <ThemeLightingToggle />
        <ProfileButton />
        <SettingsButton />
      </>
    </GenericAppBar>
  );
}

export default AppBar;
