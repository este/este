import { ValidationError } from '../lib/validation';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login(fields) {
  return ({ fetch, validate }) => {
    const getPromise = async () => {
      try {
        await validate(fields)
          .prop('email').required().email()
          .prop('password').required().simplePassword()
          .promise;
        // Simulate response for server-less (Firebase hosting) example.
        if (process.env.IS_SERVERLESS) {
          return {
            email: fields.email,
            id: Date.now()
          };
        }
        // Sure we can use smarter api than raw fetch.
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields)
        });
        if (response.status !== 200) throw response;
        // Return JSON response.
        return response.json();
      } catch (error) {
        // Transform error status to custom error.
        if (error.status === 401) {
          throw new ValidationError('wrongPassword', { prop: 'password' });
        }
        throw error;
      }
    };

    return {
      type: 'LOGIN',
      payload: {
        promise: getPromise()
      }
    };
  };
}

export function logout() {
  return ({ engine, firebase }) => {
    engine.save({});
    firebase.unauth();
    return {
      type: LOGOUT
    };
  };
}
