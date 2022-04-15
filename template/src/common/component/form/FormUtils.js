import { COMPONENTS } from "./Constants";

export const getDefaultValues = (schema) =>
  schema.fields.reduce((acc, val) => {
    const { defaultValue } = COMPONENTS[val.type];
    return { ...acc, [val.name]: val.defaultValue || defaultValue };
  }, {});

export const getInitialValues = (defaultValues, initialValues) => {
  if (!initialValues) return defaultValues;

  return { ...defaultValues, ...initialValues };
};

export const getComponent = (componentType) =>
  COMPONENTS[componentType].component;
