// This is simulation of database
// It is only for running example app

const users = {};

export function createUser(email, authToken) {
  users[authToken] = {email, authToken, createdAt: new Date()};
}

export function getUser(authToken) {
  return users[authToken];
}
