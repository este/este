// import Promise from 'bluebird';
// import setToString from '../lib/settostring';
// import {dispatch} from '../dispatcher';

// const MAX_EDITABLE_LENGTH = 256;

// export function onEditableSave(id, name, value) {
//   // Simulate async saving.
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({id, name, value});
//     }, 500);
//   });
//   return dispatch(onEditableSave, promise);
// }

// export function onEditableState(id, name, state) {
//   if (state)
//     state = state.set('value', state.value.slice(0, MAX_EDITABLE_LENGTH));
//   // We don't need id and name for this demo.
//   dispatch(onEditableState, {state});
// }

// setToString('demos', {
//   onEditableSave,
//   onEditableState
// });
