const users = {};

export function newUser(email, authToken) {
  users[authToken] = {email, authToken, createdAt: new Date()};
}

export function getUser(authToken) {
  return users[authToken];
}
