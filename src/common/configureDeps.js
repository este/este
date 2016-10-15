/* @flow weak */
import firebase from 'firebase';
import validate from './validate';

let firebaseDeps = null;

const createFirebaseDeps = firebaseConfig => {
  if (!firebaseDeps) {
    firebase.initializeApp(firebaseConfig);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseDatabase: firebase.database,
    };
  }
  // // Check whether Firebase works.
  // firebaseDeps.firebase.child('hello-world').set({
  //   createdAt: firebaseDeps.firebaseDatabase.ServerValue.TIMESTAMP,
  //   text: 'Yes!'
  // });
  return firebaseDeps;
};

const configureDeps = (initialState, platformDeps, storageEngine) => ({
  ...platformDeps,
  ...createFirebaseDeps(initialState.config.firebase),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  storageEngine,
  validate,
});

export default configureDeps;
