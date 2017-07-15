// @flow
// import type { Epic, Errors, AuthFormFields } from '../../types';
// import Router from 'next/router';
// import cookie from 'cookie';
// import validate, { required, minLength, email } from '../validate';
// import { Observable } from 'rxjs/Observable';

// const validateAuth = fields => {
//   const validationErrors = validate(fields, {
//     email: [required(), email()],
//     password: [required(), minLength(5)],
//   });
//   if (!validationErrors) return Observable.of(fields);
//   return Observable.throw(({ validationErrors }: Errors<AuthFormFields>));
// };
//
// const signInMutation = gql`
//   mutation signIn($email: String!, $password: String!) {
//     signinUser(email: { email: $email, password: $password }) {
//       token
//     }
//   }
// `;
//
// // TODO: Use fragments, but probably after the switch to Relay Modern.
// const signUpMutation = gql`
//   mutation signUp($email: String!, $password: String!) {
//     createUser(
//       authProvider: { email: { email: $email, password: $password } }
//     ) {
//       # Mutation must have a sub selection. I don't know why.
//       id
//     }
//     signinUser(email: { email: $email, password: $password }) {
//       token
//     }
//   }
// `;
//
// // https://www.graph.cool/docs/reference/simple-api/error-management-aecou7haj9
// const mapGraphCoolErrorToErrors = (graphCoolError): Errors<AuthFormFields> => {
//   const code =
//     graphCoolError.graphQLErrors &&
//     graphCoolError.graphQLErrors[0] &&
//     graphCoolError.graphQLErrors[0].code;
//   switch (code) {
//     case 3022:
//       return { appError: { type: 'cannotSignInCredentialsInvalid' } };
//     case 3023:
//       return { validationErrors: { email: { type: 'alreadyExists' } } };
//     default:
//       return { appError: { type: 'unknown', message: graphCoolError.message } };
//   }
// };
//
// const mutateAuth = apolloClient => fields =>
//   Observable.create(observer => {
//     apolloClient
//       .mutate({
//         mutation: fields.signUp ? signUpMutation : signInMutation,
//         variables: {
//           email: fields.email,
//           password: fields.password,
//         },
//       })
//       .then(({ data: { signinUser: { token } } }) => {
//         observer.next({ token });
//       })
//       .catch(graphCoolError => {
//         observer.error(mapGraphCoolErrorToErrors(graphCoolError));
//       });
//   });
//
// const setCookie = ({ token }) => {
//   // eslint-disable-next-line
//   document.cookie = cookie.serialize('token', token, {
//     maxAge: 365 * 30 * 24 * 60 * 60, // one year
//   });
//   // Token isn't used yet, but it will be for cross tab auth.
//   // return Observable.of({ token });
//   return Observable.of(null);
// };
//
// // https://github.com/apollographql/apollo-client/issues/1889
// const resetStore = apolloClient => () =>
//   ((apolloClient.resetStore(): any): Promise<null>);
//
// const redirectToHomeOrRedirectUrl = () => {
//   // TODO: Use redirectUrl.
//   Router.replace('/');
//   return Observable.of(null);
// };
//
// export const auth: Epic = (action$, { apolloClient }) =>
//   action$.filter(action => action.type === 'AUTH').mergeMap(action => {
//     // https://flow.org/en/docs/lang/refinements
//     if (action.type !== 'AUTH') throw Error();
//
//     return Observable.of(action.fields)
//       .mergeMap(validateAuth)
//       .mergeMap(mutateAuth(apolloClient))
//       .mergeMap(setCookie)
//       .mergeMap(resetStore(apolloClient))
//       .mergeMap(redirectToHomeOrRedirectUrl)
//       .mapTo({ type: 'AUTH_SUCCESS' })
//       .catch((errors: Errors<AuthFormFields>) =>
//         Observable.of({ type: 'AUTH_ERROR', errors }),
//       );
//   });
