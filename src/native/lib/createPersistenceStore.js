import {AsyncStorage} from 'react-native';

export default function createPersistenceStore() {

  return {
    get(key) {
      return AsyncStorage.getItem(key);
    },
    set(key, value) {
      return AsyncStorage.setItem(key, value);
    },
    remove(key) {
      return AsyncStorage.removeItem(key);
    }
  };
}
