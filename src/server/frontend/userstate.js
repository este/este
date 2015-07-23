export default function userState() {
  return (req, res, next) => {
    req.userState = {
      users: {
        viewer: req.cookies.user ? JSON.parse(req.cookies.user) : null
      }
    };
    next();
  };
}
