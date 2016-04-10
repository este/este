import Firebase from 'firebase';

export function reportRejectionEvent({ firebaseUrl, error }) {
  const firebase = new Firebase(firebaseUrl);
  const rejection = firebase.child('rejections').push();
  const { reason: { message, stack } } = error;
  rejection.set({
    error: { message, stack },
    rejectedAt: Firebase.ServerValue.TIMESTAMP
  });
}
