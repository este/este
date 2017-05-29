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
import { connect } from 'react-redux';
import { range } from 'ramda';
import {
  setUserForm,
  addUser,
  saveUser,
  toggleUsersSelection,
  deleteSelectedUsers,
} from '../lib/users/actions';

// TODO: Inject deps, import uuid from 'uuid'
const createUuid = () => Math.random().toString(36);

const UserForm = ({ id, form, setUserForm, addUser }) => {
  // If you know how to type it better, please let me know.
  const onChange = (prop: $Keys<typeof form>) => value => {
    setUserForm(id, { ...form, [(prop: string)]: value });
  };
  const onAddPress = () => {
    addUser({
      ...form,
      id: createUuid(),
      createdAt: Date.now(),
    });
    setUserForm(id, null);
  };
  const onAdd100RandomUsersPress = () => {
    range(0, 100)
      .map(() => {
        const id = createUuid();
        return {
          id,
          createdAt: Date.now(),
          name: id.split('-')[0],
          description: '',
          likesCats: false,
          likesDogs: false,
          gender: 'other',
          wantsKing: false,
        };
      })
      .forEach(form => addUser(form));
  };

  return (
    <Form>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only for
          // browser auth pre-filling. Also, it's not universal.
          label="Name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={onChange('name')}
          // error="Please enter your full name"
        />
        <TextInput
          label="Description"
          placeholder="..."
          value={form.description}
          onChange={onChange('description')}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          label="Likes cats"
          value={form.likesCats}
          onChange={onChange('likesCats')}
        />
        <Checkbox
          label="Likes dogs"
          value={form.likesDogs}
          onChange={onChange('likesDogs')}
        />
      </Set>
      <Set>
        <Radio
          label="Female"
          select="female"
          value={form.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Male"
          select="male"
          value={form.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Other"
          select="other"
          value={form.gender}
          onChange={onChange('gender')}
        />
      </Set>
      <Set>
        <Checkbox
          label="Do we need a king?"
          labelOnLeft
          color="warning"
          size={1}
          value={form.wantsKing}
          onChange={onChange('wantsKing')}
        />
      </Set>
      <Set>
        <Button
          primary
          onPress={onAddPress}
          type="submit" // Submit on key enter in browser. TODO: React Native?
        >
          Add
        </Button>
        <Button primary onPress={onAdd100RandomUsersPress}>
          Add 100 random users
        </Button>
      </Set>
    </Form>
  );
};

// Don't abstract this. It's good as is. We can't predict the future, so we
// can't abstract it. For example, we can compose many forms and actions here.
const ConnectedUserForm = connect(
  // id is '' for create form and real id probably from url for edit form
  ({ users: { form } }: State, { id = '' }) => ({
    id,
    form: form.changedState[id] || form.initialState,
  }),
  { setUserForm, addUser }
)(UserForm);

const UsersListInlineForm = ({
  changedState,
  data,
  field,
  saveUser,
  selected,
  setUserForm,
}) => {
  const user = { ...data, ...changedState };

  const onChange = (prop: $Keys<typeof user>) => value => {
    setUserForm(user.id, { ...user, [(prop: string)]: value });
  };
  const onSavePress = () => {
    saveUser(user);
    setUserForm(user.id, null);
  };
  const onCancelPress = () => setUserForm(user.id, null);

  switch (field) {
    case 'select':
      return (
        <Checkbox
          alignItems="center"
          height={1}
          opacity={selected ? 1 : 0.25}
          onChange={() => {}}
          value={selected}
        />
      );
    case 'name':
      return <TextInput value={user[field]} onChange={onChange('name')} />;
    case 'likesCats':
    case 'likesDogs':
      return (
        <Checkbox
          alignItems="center"
          height={1}
          onChange={onChange(field)}
          value={user[field]}
        />
      );
    case 'saveOnCancel': {
      if (!changedState) return null;
      return (
        <Set flexWrap="nowrap">
          <Button
            color="primary"
            size={-1}
            height={1}
            marginVertical={0}
            onPress={onSavePress}
            paddingHorizontal={0}
          >
            save
          </Button>
          <Button
            color="warning"
            size={-1}
            marginVertical={0}
            onPress={onCancelPress}
            paddingHorizontal={0}
          >
            cancel
          </Button>
        </Set>
      );
    }
    default:
      return null;
  }
};

const ConnectedUsersListForm = connect(
  ({ users }: State, { data }) => ({
    changedState: users.form.changedState[data.id],
    selected: users.selected[data.id],
  }),
  { setUserForm, saveUser }
)(UsersListInlineForm);

// Yep, this is a table without <table>. The table layout below is created
// with flexboxes only. React Native (https://facebook.github.io/yoga) does
// not support table layout, and honestly, I never liked it.
// Tableless tables allow us to do fancy things easily. For example:
// https://bvaughn.github.io/react-virtualized/#/components/Table
const UsersList = ({
  users,
  selected,
  toggleUsersSelection,
  deleteSelectedUsers,
}) => {
  const usersSortedByCreatedAt = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse();
  const allSelected =
    usersSortedByCreatedAt.length > 0 &&
    usersSortedByCreatedAt.every(user => selected[user.id]);

  const Column = ({ header, field }) => (
    <Box>
      {typeof header === 'string'
        ? <Text bold height={1} style={{ whiteSpace: 'nowrap' }}>{header}</Text>
        : header}
      {usersSortedByCreatedAt.map(user => (
        <Box height={1} key={user.id}>
          <ConnectedUsersListForm field={field} data={user} />
        </Box>
      ))}
    </Box>
  );
  const DeleteSelectedUsers = () => (
    <Button
      color="warning"
      disabled={!allSelected}
      size={-1}
      onPress={deleteSelectedUsers}
      paddingHorizontal={0}
      marginVertical={0}
    >
      Delete Selected
    </Button>
  );
  const ToggleUsersSelection = (
    <Checkbox
      alignItems="center"
      height={1}
      opacity={0.25}
      onChange={() => toggleUsersSelection(usersSortedByCreatedAt)}
      value={allSelected}
    />
  );

  return (
    <Box>
      <DeleteSelectedUsers />
      <Set spaceBetween={1} flexWrap="nowrap">
        {/* Set can be nested for custom spaceBetween */}
        <Set spaceBetween={0.5} flexWrap="nowrap">
          <Column header={ToggleUsersSelection} field="select" />
          <Column header="Name" field="name" />
        </Set>
        <Column header="🐈" field="likesCats" />
        <Column header="🐕" field="likesDogs" />
        <Column header="" field="saveOnCancel" />
      </Set>
    </Box>
  );
};

const ConnectedUsersList = connect(
  ({ users }: State) => ({
    users: users.local,
    selected: users.selected,
  }),
  { toggleUsersSelection, deleteSelectedUsers }
)(UsersList);

const Forms = () => (
  <Page title="Forms">
    <Heading size={3}>Forms</Heading>
    <P>
      Simple and fast Redux forms without unnecessary abstraction.
    </P>
    <ConnectedUserForm />
    <Heading size={1}>A table made from Flexbox only</Heading>
    <P>Check how fast editation is even with hunderds of items.</P>
    <ConnectedUsersList />
  </Page>
);

export default app(Forms);
