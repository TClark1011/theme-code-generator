const isBasicError = (val: any): val is Record<'message', string> =>
  typeof val === 'object' && 'message' in val && typeof val?.message === 'string';

const getPrintableError = (errorObject: unknown): string => {
  // If the error object is a standard error, return the message
  if (isBasicError(errorObject)) return errorObject.message;

  // If the error object is a string, return it
  if (typeof errorObject === 'string') return errorObject;

  // Last case resort, if we are unable to reasonably derive
  // an error message from the object, we just stringify the
  // whole thing and return that
  return JSON.stringify(errorObject);
};

export default getPrintableError;
