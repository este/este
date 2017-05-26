// @flow
import type { State } from '../types';
import Box from '../components/box';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import Radio from '../components/radio';
import Set from '../components/set';
import Text from '../components/text';
import TextInput from '../components/text-input';
import app from '../components/app';
import { addUser } from '../lib/users/actions';
import { connect } from 'react-redux';
import { setUserForm } from '../lib/forms/actions';

const UserForm = ({ id, user, setUserForm, addUser }) => {
  // If you know how to type it better, please let me know.
  const onChange = (prop: $Keys<typeof user>) => state => {
    setUserForm(id, { ...user, [(prop: string)]: state });
  };

  const add = () => {
    addUser({
      ...user,
      id: Date.now().toString(36),
      createdAt: Date.now(),
      updatedAt: null,
    });
    setUserForm(id, null);
  };

  const add100 = () => {
    // for (let i = 0; i < 100; i++) {
    //   addUser({ ...user, id: Date.now().toString(36) });
    // }
    // setUserForm(id, null);
  };

  return (
    <Form>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only for
          // browser auth pre-filling. Also, it's not universal.
          label="Name"
          placeholder="Jane Doe"
          value={user.name}
          onChange={onChange('name')}
          // error="Please enter your full name"
        />
        <TextInput
          label="Description"
          placeholder="..."
          value={user.description}
          onChange={onChange('description')}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          label="Likes cats"
          value={user.likesCats}
          onChange={onChange('likesCats')}
        />
        <Checkbox
          label="Likes dogs"
          value={user.likesDogs}
          onChange={onChange('likesDogs')}
        />
      </Set>
      <Set>
        <Radio
          label="Female"
          select="female"
          value={user.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Male"
          select="male"
          value={user.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Other"
          select="other"
          value={user.gender}
          onChange={onChange('gender')}
        />
      </Set>
      <Set>
        <Checkbox
          label="Do we need a king?"
          labelOnLeft
          color="warning"
          size={1}
          value={user.wantsKing}
          onChange={onChange('wantsKing')}
        />
      </Set>
      <Set>
        <Button
          primary
          onPress={add}
          type="submit" // Submit on key enter in browser. TODO: React Native.
        >
          Add
        </Button>
        <Button primary onPress={add100}>
          Add 100x
        </Button>
      </Set>
    </Form>
  );
};

// Don't abstract this. It's good as is. We can't predict the future, so we
// can't abstract it. For example, we can compose many forms and actions here.
const ConnectedUserForm = connect(
  ({ forms: { user } }: State, { id = '' }) => ({
    id,
    user: user.changedState[id] || user.initialState,
  }),
  { setUserForm, addUser }
)(UserForm);

// const UserInlineForm = ({ user }) => (
//   <Set
//     // justifyContent="center"
//     borderColor="gray"
//     borderStyle="solid"
//     // borderBottomWidth={1}
//     marginBottom={0}
//     // borderWidth={1}
//   >
//     <TextInput value={user.name} onChange={() => {}} />
//     <Checkbox
//       label="Likes cats"
//       value={user.likesCats}
//       onChange={() => {}}
//       labelOnLeft
//     />
//     <Checkbox
//       label="Likes dogs"
//       value={user.likesDogs}
//       onChange={() => {}}
//       labelOnLeft
//     />
//     {/* <Button primary outline size={-1}>
//       edit
//     </Button> */}
//   </Set>
// );

// {/* {list.map(user => <UserInlineForm key={user.id} user={user} />)} */}
const UsersListForm = ({ field, user }) => {
  switch (field) {
    case 'name':
      return <TextInput value={user[field]} onChange={() => {}} />;
    case 'likesCats':
      return <Checkbox value={user[field]} onChange={() => {}} />;
    case 'likesDogs':
      return <Checkbox value={user[field]} onChange={() => {}} />;
    default:
      // TODO: actions, delete, or save | cancel
      return null;
  }
};

const UsersList = ({ users }) => {
  const usersSortedByCreatedAt = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse();

  const Column = ({ headerText, field }) => (
    <Box>
      <Text height={1}>{headerText}</Text>
      {usersSortedByCreatedAt.map(user => (
        <UsersListForm field={field} user={user} key={user.id} />
      ))}
    </Box>
  );

  // Yep, this is a table without <table>. The table layout below is created
  // with flexboxes only. React Native (https://facebook.github.io/yoga) does
  // not support table layout, and honestly, I never liked it.
  // Tableless tables allow us to do fancy things easily. For example:
  // https://bvaughn.github.io/react-virtualized/#/components/Table
  return (
    <Set>
      <Column field="name" headerText="Name" />
      <Column field="likesCats" headerText="Likes cats" />
      <Column field="likesDogs" headerText="Likes dogs" />
      <Column field="saveOnCancel" />
    </Set>
  );
};

const ConnectedUsersList = connect(({ users: { local } }: State) => ({
  users: local,
}))(UsersList);

const Forms = () => (
  <Page title="Forms">
    <Heading size={3}>Forms</Heading>
    <P>Simple, fast, and dynamic Redux forms.</P>
    <ConnectedUserForm />
    <ConnectedUsersList />
  </Page>
);

export default app(Forms);
