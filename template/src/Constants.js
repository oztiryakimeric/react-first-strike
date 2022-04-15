import AuthDialog from "scene/auth/dialog/AuthDialog";
import ProfileDialog from "scene/auth/dialog/ProfileDialog";

import SettingsDrawer from "scene/settings/SettingsDrawer";

export const REMOTE_CONFIG_DEFAULTS = {
  themeColor: "yellow",
};

export const LANGUAGES = ["tr-TR", "en-EN"];

export const DIALOGS = {
  LOGIN_DIALOG: AuthDialog,
  PROFILE_DIALOG: ProfileDialog,
};

export const DRAWERS = {
  SETTINGS_DRAWER: SettingsDrawer,
};

export default DIALOGS;
