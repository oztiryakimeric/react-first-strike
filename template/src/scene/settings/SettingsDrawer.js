import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useTheme } from "context/ThemeContext";

import { LANGUAGES } from "Constants";

function SettingsDrawer() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleLighting } = useTheme();

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <FormControl>
          <FormLabel id="lang">{t("settingsDrawer.language")}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="lang"
            name="lang-group"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <FormControlLabel
                key={l}
                value={l}
                control={<Radio />}
                label={t(l)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControl>
          <FormLabel id="themeMode">{t("settingsDrawer.themeMode")}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="themeMode"
            name="themeMode-group"
            value={isDark ? "dark" : "light"}
            onChange={toggleLighting}
          >
            <FormControlLabel
              key="dark"
              value="dark"
              control={<Radio />}
              label={t("settingsDrawer.themeDark")}
            />
            <FormControlLabel
              key="light"
              value="light"
              control={<Radio />}
              label={t("settingsDrawer.themeLight")}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
}

export default SettingsDrawer;
