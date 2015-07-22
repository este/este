// import * as actions from '../examples/actions';
// import Component from '../components/component.react';
// import DocumentTitle from 'react-document-title';
// import Editable from '../components/editable.react';
// import React from 'react';
// import immutable from 'immutable';
// import {msg} from '../intl/store';

// export default class Index extends Component {

//   static propTypes = {
//     examples: React.PropTypes.instanceOf(immutable.Map).isRequired,
//     pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired
//   };

//   render() {
//     const {examples, pendingActions} = this.props;
//     const editableState = examples.getIn(['editable', 'state']);
//     const editableText = examples.getIn(['editable', 'text']);

//     const editableFor = (id, name) =>
//       <Editable
//         disabled={pendingActions.has(actions.onEditableSave.toString())}
//         id={id}
//         name={name}
//         onSave={actions.onEditableSave}
//         onState={actions.onEditableState}
//         showEditButtons
//         showViewButtons
//         state={editableState}
//         text={editableText}
//         type="textarea"
//       />;

//     return (
//       <DocumentTitle title={msg('pages.examples.title')}>
//         <div className="examples-page">
//           <h2>editable.react.js</h2>
//           {editableFor(1, 'example')}
//         </div>
//       </DocumentTitle>
//     );
//   }

// }
