import React from "react";

import * as Yup from "yup";
import { Container, DialogContent, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useTranslation } from "react-i18next";
import { useSnackbar } from "context/SnackbarContext";
import { useOverlay } from "context/OverlayContext";
import { useUser } from "context/UserContext";

import SimpleDialogTitle from "common/component/DialogUtils";
import FormGenerator from "common/component/form/FormGenerator";
import SocialAuthProviders from "./SocialAuthProviders";

const registerFormSchema = {
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
    {
      name: "password2",
      label: "registerDialog.confirmPasswordLabel",
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
    password2: Yup.string()
      .min(6, "formValidation.wrongPassword")
      .required("formValidation.emptyField")
      .oneOf([Yup.ref("password"), null], "formValidation.passwordMatch"),
  }),
};

function Register() {
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();
  const { loading, createUser } = useUser();
  const { hide } = useOverlay();

  const onRegister = ({ email, password }) => {
    createUser({ email, password })
      .then(() => {
        openSnackbar("success", t("registerDialog.registerSuccessful"));
        hide();
      })
      .catch((err) => openSnackbar("error", t(err.code)));
  };

  return (
    <>
      <SimpleDialogTitle>{t("registerDialog.title")}</SimpleDialogTitle>
      <DialogContent>
        <Container sx={{ mb: 3 }}>
          <FormGenerator
            sx={{ mt: 1, mb: 2 }}
            schema={registerFormSchema}
            onSubmit={({ email, password }) => onRegister({ email, password })}
          >
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              loading={loading}
            >
              {t("registerDialog.submit")}
            </LoadingButton>
          </FormGenerator>

          <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
            <Typography variant="body1">{t("loginDialog.or")}</Typography>
          </Box>

          <SocialAuthProviders />
        </Container>
      </DialogContent>
    </>
  );
}

export default Register;
