import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation LoginWithEmailAndPassword($input: LoginInput!) {
    login(input: $input) {
      clientMutationId,
      user {
        id
        email
        username
        dob
        name
      }
    }
   }
`;

export const logoutMutation = gql`
  mutation Logout($input: LogoutInput!) {
    logout(input: $input) {
      clientMutationId
    }  
  }
`;

export const createLoginMutation = ({ email, password }) => ({
  mutation: loginMutation,
  variables: {
    input: {
      email,
      password,
    },
  },
});

export const createLogoutMutation = () => ({
  mutation: logoutMutation,
  variables: {
    input: {
      clientMutationId: 'LOGOUT', // TODO
    },
  },
});
