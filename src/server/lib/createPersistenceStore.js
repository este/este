import CookieDough from 'cookie-dough';

export default function createPersistenceStore(req) {
  const cookies = CookieDough(req);

  return {
    get(key) {
      return cookies.get(key);
    },
    set(key, value) {
      return cookies.set(key, value);
    },
    remove(key) {
      return cookies.remove(key);
    }
  };
}
