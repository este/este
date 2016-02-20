export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login(fields) {
  return ({fetch, validate}) => {

    // Why function? https://phabricator.babeljs.io/T2765
    async function getPromise() {
      try {
        await validate(fields)
          .prop('email').required().email()
          .prop('password').required().simplePassword()
          .promise;
        // Sure we can use smarter api than raw fetch.
        const response = await fetch(`/api/v1/auth/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(fields)
        });
        if (response.status !== 200) throw response;
        // Return JSON response.
        return response.json();
      } catch (error) {
        // Here we can transforn error statuses to custom errors.
        if (error.status === 401) {
          throw validate.wrongPassword('password');
        }
        throw error;
      }
    }

    return {
      type: 'LOGIN',
      payload: {
        promise: getPromise()
      }
    };
  };
}

export function logout() {
  return ({firebase}) => {
    firebase.unauth();
    return {
      type: LOGOUT
    };
  };
}
