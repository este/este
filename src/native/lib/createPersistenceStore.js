import {AsyncStorage} from 'react-native';

// This is tricky, all persistence stores are sync and Native is async :(
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
