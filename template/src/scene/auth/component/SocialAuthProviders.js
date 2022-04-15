import { Stack, IconButton } from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

import { useTranslation } from "react-i18next";
import { useSnackbar } from "context/SnackbarContext";
import { useUser } from "context/UserContext";

function SocialAuthProviders() {
  const { t } = useTranslation();
  const { loading, socialSignIn } = useUser();
  const { openSnackbar } = useSnackbar();

  const onClick = (provider) => () => {
    socialSignIn(provider)
      .then(() => openSnackbar("success", t("socialSignIn.success")))
      .catch((err) => {
        if (err.code !== "show-nothing") {
          openSnackbar("error", t(err.code));
        }
      });
  };

  return (
    <Stack direction="row" sx={{ justifyContent: "center" }} spacing={2}>
      <IconButton disabled={loading} onClick={onClick("google")}>
        <GoogleIcon />
      </IconButton>
      <IconButton disabled={loading} onClick={onClick("github")}>
        <GitHubIcon />
      </IconButton>
      <IconButton disabled={loading} onClick={onClick("facebook")}>
        <FacebookIcon />
      </IconButton>
    </Stack>
  );
}

export default SocialAuthProviders;
