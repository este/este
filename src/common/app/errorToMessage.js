const isInnocuousError = error =>
  error.code === 'auth/popup-closed-by-user'; // Firebase stuff.

// Map promiseMiddleware rejected error to UI message.
// Unknown errors are reported so the developer can check what is wrong.
const errorToMessage = (error) => {
  // Some errors are so innocuos that we don't have to show any message.
  if (isInnocuousError(error)) {
    return { message: null };
  }

  return 'ERROROROROR';
};

export default errorToMessage;
