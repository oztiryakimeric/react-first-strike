import React from "react";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Container, DialogContent } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import SimpleDialogTitle from "common/component/DialogUtils";
import FormGenerator from "common/component/form/FormGenerator";

import { useSnackbar } from "context/SnackbarContext";
import { useOverlay } from "context/OverlayContext";
import { useUser } from "context/UserContext";

const resetPasswordFormSchema = {
  fields: [
    {
      name: "email",
      label: "formValidation.emailLabel",
      type: "text",
      required: true,
    },
  ],
  validationSchema: Yup.object({
    email: Yup.string()
      .email("formValidation.wrongEmail")
      .required("formValidation.emptyField"),
  }),
};

function ResetPassword() {
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();
  const { hide } = useOverlay();
  const { loading, resetPassword } = useUser();

  const onSendResetEmail = ({ email }) => {
    resetPassword({ email })
      .then(() => {
        openSnackbar("success", t("resetPasswordDialog.sendSuccessful"));
        hide();
      })
      .catch((err) => openSnackbar("error", t(err.code)));
  };

  return (
    <>
      <SimpleDialogTitle>{t("resetPasswordDialog.title")}</SimpleDialogTitle>
      <DialogContent>
        <Container sx={{ mb: 3 }}>
          <FormGenerator
            sx={{ mt: 1, mb: 2 }}
            schema={resetPasswordFormSchema}
            onSubmit={({ email }) => onSendResetEmail({ email })}
          >
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              loading={loading}
            >
              {t("resetPasswordDialog.submit")}
            </LoadingButton>
          </FormGenerator>
        </Container>
      </DialogContent>
    </>
  );
}

export default ResetPassword;
