// // @flow
// import * as React from 'react';
// import { createFragmentContainer, graphql } from 'react-relay';
// // import { type WebListItem_web } from './__generated__/WebListItem_web.graphql';
// import Text from './Text';
// import Box from './Box';
// import { FormattedRelative } from 'react-intl';
// import Set from './Set';
// import { DeleteButton } from './buttons';
// import AreYouSureConfirm from './AreYouSureConfirm';
// import Mutate, { clientMutationId } from './Mutate';
// // import DeleteWebMutation from '../mutations/DeleteWebMutation';
// import A from './A';
//
// const DeleteWeb = ({ onPress, disabled }) => (
//   <AreYouSureConfirm>
//     {confirm => (
//       <DeleteButton
//         color="warning"
//         disabled={disabled}
//         onPress={() => {
//           if (confirm()) onPress();
//         }}
//         paddingHorizontal={0}
//         size={-1}
//       />
//     )}
//   </AreYouSureConfirm>
// );
//
// type Props = {
//   web: WebListItem_web,
//   userId: string,
// };
//
// type State = {
//   pending: boolean,
// };
//
// const initialState = {
//   pending: false,
// };
//
// class WebListItem extends React.PureComponent<Props, State> {
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
//   deleteWeb = mutate => () => {
//     const variables = {
//       input: { id: this.props.web.id, clientMutationId: clientMutationId() },
//     };
//     this.setState({ pending: true });
//     // mutate(
//     //   DeleteWebMutation.commit(this.props.userId),
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
//           const { web } = this.props;
//           const userIsOwner = this.props.userId === web.owner.id;
//           return (
//             <Box>
//               <Text>{web.name}</Text>
//               <Set>
//                 <Text color="gray" size={-1}>
//                   <A
//                     href={{ pathname: '/edit', query: { domain: web.domain } }}
//                   >
//                     {web.domain}
//                   </A>
//                   {', '}
//                   <FormattedRelative value={web.updatedAt} />
//                   {userIsOwner && (
//                     <Text>
//                       {', '}
//                       <DeleteWeb
//                         disabled={this.state.pending}
//                         onPress={this.deleteWeb(mutate)}
//                       />
//                     </Text>
//                   )}
//                 </Text>
//               </Set>
//             </Box>
//           );
//         }}
//       </Mutate>
//     );
//   }
// }
//
// export default createFragmentContainer(WebListItem, {
//   web: graphql`
//     fragment WebListItem_web on Web {
//       updatedAt
//       domain
//       owner {
//         id
//       }
//       id
//       name
//     }
//   `,
// });
