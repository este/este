// @flow
import type { Epic, Errors, AuthFormFields } from '../../types';
import { Observable } from 'rxjs/Observable';
import validate, { required, minLength, email } from '../validate';
import { gql } from 'react-apollo';

const validateAuth = fields => {
  const validationErrors = validate(fields, {
    email: [required(), email()],
    password: [required(), minLength(5)],
  });
  if (!validationErrors) return Observable.of(fields);
  return Observable.throw(({ validationErrors }: Errors<AuthFormFields>));
};

const signInMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

// TODO: Use fragments, but probably after the switch to Relay Modern.
const signUpMutation = gql`
  mutation signUp($email: String!, $password: String!) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

// https://www.graph.cool/docs/reference/simple-api/error-management-aecou7haj9
const mapGraphCoolErrorToErrors = (graphCoolError): Errors<AuthFormFields> => {
  const code =
    graphCoolError.graphQLErrors &&
    graphCoolError.graphQLErrors[0] &&
    graphCoolError.graphQLErrors[0].code;
  switch (code) {
    case 3023:
      return { validationErrors: { email: { type: 'alreadyExists' } } };
    default:
      return { appError: { type: 'unknown', message: graphCoolError.message } };
  }
};

const mutateAuth = apolloClient => fields =>
  Observable.create(observer => {
    apolloClient
      .mutate({
        mutation: fields.signUp ? signUpMutation : signInMutation,
        variables: {
          email: fields.email,
          password: fields.password,
        },
      })
      .then(({ data }) => {
        observer.next(data);
        // pokud create neni, jak ho ziskam?
        // data.createUser.id
        // data.signinUser.token
        // console.log(result);
      })
      .catch(graphCoolError => {
        observer.error(mapGraphCoolErrorToErrors(graphCoolError));
      });
  });

export const auth: Epic = (action$, { apolloClient }) =>
  action$.filter(action => action.type === 'AUTH').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'AUTH') throw Error();

    return Observable.of(action.fields)
      .mergeMap(validateAuth)
      .mergeMap(mutateAuth(apolloClient))
      .mapTo({ type: 'AUTH_SUCCESS' })
      .catch((errors: Errors<AuthFormFields>) =>
        Observable.of({ type: 'AUTH_ERROR', errors }),
      );
  });

// createWithEmail({
//   variables: {
//     email: data.get('email'),
//     password: data.get('password'),
//     name: data.get('name'),
//   },
// })
//   .then(({ data: { signinUser: { token } } }) => {
//     // Store the token in cookie
//     document.cookie = cookie.serialize('token', token, {
//       maxAge: 30 * 24 * 60 * 60, // 30 days
//     });
//
//     // Force a reload of all the current queries now that the user is
//     // logged in
//     client.resetStore().then(() => {
//       // Now redirect to the homepage
//       redirect({}, '/');
//     });
//   })
//   .catch(error => {
//     // Something went wrong, such as incorrect password, or no network
//     // available, etc.
//     console.error(error);
//   });
