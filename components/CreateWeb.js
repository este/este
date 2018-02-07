// @flow
import * as React from 'react';

// import Form from './Form';
// import { CreateButton } from './buttons';
// import TextInputBig from './TextInputBig';
// import { FormattedMessage } from 'react-intl';
// import Text from './Text';
// import Set from './Set';
// import CreateWebMutation from '../mutations/CreateWebMutation';
// import Mutate, { clientMutationId } from './Mutate';
// import { validateNewWeb } from '../validation';
// import type { Errors } from '../lib/error';
// import ValidationError from './ValidationError';
//
// type Props = {
//   userId: string,
// };
//
// type Fields = {
//   name: string,
// };
//
// type State = {
//   pending: boolean,
//   errors: Errors<Fields>,
// } & Fields;
//
// const initialState = {
//   name: '',
//   pending: false,
//   errors: {},
// };
//
// class CreateWeb extends React.PureComponent<Props, State> {
//   state = initialState;
//
//   handleCompleted = () => {
//     this.setState(initialState);
//   };
//
//   handleError = () => {
//     this.setState({ pending: false });
//   };
//
//   // Using an existential type is ok. It works well.
//   createWeb = (mutate: *) => () => {
//     // const variables = {
//     //   input: {
//     //     domain: '', // computed by g r a p h c o o l/functions/createWeb.js nameToDomain
//     //     name: this.state.name,
//     //     ownerId: this.props.userId,
//     //     clientMutationId: clientMutationId(),
//     //   },
//     // };
//     //
//     // const errors = validateNewWeb(variables.input);
//     // if (errors) {
//     //   this.setState({ errors });
//     //   return;
//     // }
//     //
//     // this.setState({ pending: true });
//     // mutate(
//     //   CreateWebMutation.commit(this.props.userId),
//     //   variables,
//     //   this.handleCompleted,
//     //   this.handleError,
//     // );
//   };
//
//   render() {
//     return (
//       <Mutate>
//         {mutate => {
//           const { pending, errors } = this.state;
//           return (
//             <Form onSubmit={this.createWeb(mutate)}>
//               <TextInputBig
//                 label={
//                   <Text>
//                     <FormattedMessage
//                       defaultMessage="Web Name"
//                       id="createApp.label"
//                     />
//                   </Text>
//                 }
//                 autoFocus={errors.name}
//                 disabled={pending}
//                 error={<ValidationError error={errors.name} />}
//                 onChange={name => this.setState({ name })}
//                 type="text"
//                 value={this.state.name}
//               />
//               <Set>
//                 <CreateButton
//                   primary
//                   disabled={pending}
//                   onPress={this.createWeb(mutate)}
//                 />
//               </Set>
//             </Form>
//           );
//         }}
//       </Mutate>
//     );
//   }
// }
//
// export default CreateWeb;
