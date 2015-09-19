// X-Powered-By: Este.js
// http://expressjs.com/4x/api.html#res.set
export default function esteMiddleware() {

  return (req, res, next) => {
    const {app} = req;

    // Set X-Powered-By only if it has not been disabled by the user previously.
    if (app.get('x-powered-by'))
      res.set({
        'X-Powered-By': 'Este.js'
      });

    next();
  };

}
