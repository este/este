// import * as actions from './actions';
// import {examplesCursor} from '../state';
// import {register} from '../dispatcher';

// export const dispatchToken = register(({action, data}) => {

//   switch (action) {

//     case actions.onEditableSave:
//       examplesCursor(examples => {
//         const {value} = data;
//         return examples
//           .setIn(['editable', 'text'], value.trim())
//           .deleteIn(['editable', 'state']);
//       });
//       break;

//     case actions.onEditableState:
//       examplesCursor(examples => {
//         const {state} = data;
//         return examples.setIn(['editable', 'state'], state);
//       });
//       break;

//   }

// });
