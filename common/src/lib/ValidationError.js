// Prop associates error with form field name.
export default class ValidationError extends Error {

  constructor(message, prop) {
    super();
    this.message = message;
    this.prop = prop;
  }

}

