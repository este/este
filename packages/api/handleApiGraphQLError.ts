type KnownGraphQLErrorStatusCode = 401 | 403 | 404;

const getKnownGraphQLErrorHttpStatusCodes = (
  errors: any,
): KnownGraphQLErrorStatusCode[] => {
  return Array.isArray(errors)
    ? errors
        .map(error => error && error.extensions && error.extensions.code)
        .filter(
          code =>
            code === 'FORBIDDEN' ||
            code === 'NOTFOUND' ||
            code === 'UNAUTHENTICATED',
        )
        .map(code =>
          code === 'FORBIDDEN' ? 403 : code === 'UNAUTHENTICATED' ? 401 : 404,
        )
    : [];
};

const handleApiGraphQLError = (
  error: any,
  handlers: { [code in KnownGraphQLErrorStatusCode | 'unknown']: () => void },
) => {
  if (error == null) return;
  const codes = getKnownGraphQLErrorHttpStatusCodes(error);
  // The order is important. GraphQL error can contain many different errors
  // and we want to handle them by severity.
  if (codes.includes(401)) handlers[401]();
  else if (codes.includes(404)) handlers[404]();
  else if (codes.includes(403)) handlers[403]();
  else handlers.unknown();
};

export default handleApiGraphQLError;
