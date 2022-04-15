import React from "react";
import PropTypes from "prop-types";
import { TextField, Box } from "@mui/material";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

function TextInput(props) {
  const [field, meta] = useField(props);
  const { t } = useTranslation();
  const { label } = props;

  return (
    <Box>
      <TextField
        {...field}
        {...props}
        label={t(label)}
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? t(meta.error) : " "}
        fullWidth
      />
    </Box>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default TextInput;
