// @flow
import Ajv from 'ajv';

type Schema = Object;

// This is just a DEV helper.
export const validateSchema = (schema: Schema) => {
  if (process.env.NODE_ENV === 'production') return;
  const ajv = new Ajv();
  const isValid = ajv.validateSchema(schema);
  if (isValid) return;
  // eslint-disable-next-line no-console
  console.error(ajv.errorsText());
};

export const validate = (schema: Schema, data: any): boolean => {
  const ajv = new Ajv();
  return ajv.validate(schema, data);
};
