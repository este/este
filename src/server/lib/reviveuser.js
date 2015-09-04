export function reviveUserByHeader(req, res, next) {
  if (req.user) {
    const auth = (req.header.authorization && JSON.parse(req.header.authorization)) || false;
    console.log(auth);
    if (auth && auth.email && auth.password)
      req.user = {
        email: auth.email,
        password: auth.password
      };
  }
  next();
}
