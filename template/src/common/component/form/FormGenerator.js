import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import { Formik, Form } from "formik";

import { getDefaultValues, getInitialValues, getComponent } from "./FormUtils";

const generateFormInputs = (schema) => {
  const inputs = schema.fields.reduce((acc, fieldProps) => {
    const Component = getComponent(fieldProps.type);
    return {
      ...acc,
      [fieldProps.name]: (
        <Component className="mt-3" key={fieldProps.name} {...fieldProps} />
      ),
    };
  }, {});
  return inputs;
};

function FormContainer({
  schema,
  initialValues,
  formRef,
  children,
  onSubmit,
  onPostValidationError,
  ...props
}) {
  const defaultValues = getDefaultValues(schema);

  const applyPostValidationRules = (formValues) => {
    if (process.env.NODE_ENV === "development") {
      console.log({ formValues });
    }

    if (schema?.postValidation) {
      const errorObj = schema.postValidation(formValues);
      const errors = Object.values(errorObj).filter((v) => v !== undefined);
      if (errors.length !== 0) {
        onPostValidationError(errors);
        return;
      }
    }

    onSubmit(formValues);
  };

  return (
    <Formik
      initialValues={getInitialValues(defaultValues, initialValues)}
      innerRef={formRef}
      validationSchema={schema.validationSchema}
      onSubmit={applyPostValidationRules}
    >
      <Form>
        <Stack spacing={1} {...props}>
          {children}
        </Stack>
      </Form>
    </Formik>
  );
}

function FormGenerator({ children, ...props }) {
  const { schema } = props;
  const formInputs = generateFormInputs(schema);
  return (
    <FormContainer {...props}>
      <>
        {schema.fields?.map((fieldProps) => formInputs[fieldProps.name])}
        {children}
      </>
    </FormContainer>
  );
}

const formDefaultProps = {
  initialValues: {},
  onSubmit: () => {},
  onPostValidationError: () => {},
  formRef: null,
};

FormGenerator.defaultProps = formDefaultProps;
FormContainer.defaultProps = formDefaultProps;

FormGenerator.propTypes = {
  schema: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    validationSchema: PropTypes.shape(),
    postValidation: PropTypes.func,
  }).isRequired,
  initialValues: PropTypes.shape(),
  formRef: PropTypes.shape({}),
  onSubmit: PropTypes.func,
  onPostValidationError: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

FormContainer.propTypes = {
  schema: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    validationSchema: PropTypes.shape(),
    postValidation: PropTypes.func,
  }).isRequired,
  initialValues: PropTypes.shape(),
  formRef: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onSubmit: PropTypes.func,
  onPostValidationError: PropTypes.func,
};

export default FormGenerator;
