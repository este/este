import CookieDough from 'cookie-dough';

export default function createCredentialsStore(req?) {
  const cookies = CookieDough(req);

  return {
    get(key) {
      return cookies.get(key);
    },
    set(key, value) {
      cookies.set(key, value);
    },
    remove(key) {
      cookies.remove(key);
    }
  };
}
