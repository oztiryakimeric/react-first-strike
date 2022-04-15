import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {
  Box,
  Container,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useTranslation } from "react-i18next";
import { useSnackbar } from "context/SnackbarContext";
import { useUser } from "context/UserContext";

import SimpleDialogTitle from "common/component/DialogUtils";
import FormGenerator from "common/component/form/FormGenerator";
import SocialAuthProviders from "./SocialAuthProviders";

const loginFormSchema = {
  fields: [
    {
      name: "email",
      label: "formValidation.emailLabel",
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: "formValidation.passwordLabel",
      type: "password",
      required: true,
    },
  ],
  validationSchema: Yup.object({
    email: Yup.string()
      .email("formValidation.wrongEmail")
      .required("formValidation.emptyField"),
    password: Yup.string()
      .min(6, "formValidation.wrongPassword")
      .required("formValidation.emptyField"),
  }),
};

function Login({ changeTab }) {
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();

  const { loading, emailPasswordLogin } = useUser();

  const onLogin = ({ email, password }) => {
    emailPasswordLogin({ email, password })
      .then(() => openSnackbar("success", t("loginDialog.loginSuccessful")))
      .catch((err) => openSnackbar("error", t(err.code)));
  };

  return (
    <>
      <SimpleDialogTitle>{t("loginDialog.title")}</SimpleDialogTitle>
      <DialogContent>
        <Container sx={{ mb: 3 }}>
          <FormGenerator
            sx={{ mt: 1, mb: 2 }}
            schema={loginFormSchema}
            onSubmit={({ email, password }) => onLogin({ email, password })}
          >
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              loading={loading}
            >
              {t("loginDialog.submit")}
            </LoadingButton>
          </FormGenerator>

          <Button
            sx={{ mt: 1 }}
            size="small"
            variant="text"
            onClick={() => changeTab("reset")}
            disabled={loading}
          >
            {t("loginDialog.lostPassword")}
          </Button>

          <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
            <Typography variant="body1">{t("loginDialog.or")}</Typography>
          </Box>

          <SocialAuthProviders />

          <Box sx={{ mt: 7 }}>
            {t("loginDialog.createAccountText")}
            <span> </span>
            <Button variant="text" onClick={() => changeTab("register")}>
              {t("loginDialog.createAccountLink")}
            </Button>
          </Box>
        </Container>
      </DialogContent>
    </>
  );
}

Login.propTypes = {
  changeTab: PropTypes.func.isRequired,
};

export default Login;
