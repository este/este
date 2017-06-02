// @flow
import type { State } from '../types';
import Box from '../components/box';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Set from '../components/set';
import Text from '../components/text';
import TextInput from '../components/text-input';
import { connect } from 'react-redux';
import {
  saveUser,
  setUserForm,
  toggleUsersSelection,
  deleteSelectedUsers,
} from '../lib/users/actions';

// This is pretty fast editable lists. Just follow this two simple rules:
// 1) Do not nest the same redux connect selected states.
// 2) For huge lists, use react-virtualized.

const Form = ({
  changedState,
  data,
  field,
  saveUser,
  selected,
  setUserForm,
  toggleUsersSelection,
}) => {
  const user = { ...data, ...changedState };
  const onChange = (prop: $Keys<typeof user>) => value => {
    setUserForm(user.id, { ...user, [(prop: string)]: value });
  };
  const onSavePress = () => saveUser(user);
  const onCancelPress = () => setUserForm(user.id, null);

  switch (field) {
    case 'select':
      return (
        <Checkbox
          alignItems="center"
          height={1}
          opacity={selected ? 1 : 0.25}
          onChange={() => toggleUsersSelection([user])}
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

const ConnectedForm = connect(
  ({ users }: State, { data }) => ({
    changedState: users.form.changedState[data.id],
    selected: users.selected[data.id],
  }),
  { setUserForm, saveUser, toggleUsersSelection }
)(Form);

const DeleteSelected = ({ selected, deleteSelectedUsers }) => (
  <Button
    color="warning"
    disabled={Object.keys(selected).length === 0}
    size={-1}
    onPress={deleteSelectedUsers}
    paddingHorizontal={0}
    marginVertical={0}
  >
    Delete Selected
  </Button>
);

const ConnectedDeleteSelected = connect(
  ({ users }: State) => ({ selected: users.selected }),
  { deleteSelectedUsers }
)(DeleteSelected);

const ToggleUsersSelection = ({ selected, toggleUsersSelection, users }) => (
  <Checkbox
    alignItems="center"
    opacity={0.25}
    onChange={() => toggleUsersSelection(users)}
    value={users.every(user => selected[user.id])}
  />
);

const ConnectedToggleUsersSelection = connect(
  ({ users }: State) => ({ selected: users.selected }),
  { toggleUsersSelection }
)(ToggleUsersSelection);

// Yep, this is a table without <table>. The table layout below is created
// with flexboxes only. React Native (https://facebook.github.io/yoga) does
// not support table layout, and honestly, I never liked it.
// Tableless tables allow us to do fancy things easily. For example:
// https://bvaughn.github.io/react-virtualized/#/components/Table
const UsersList = ({ users }) => {
  const sortedUsers = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse();

  const Column = ({ header, field }) => (
    <Box>
      {/* Header */}
      <Box height={1}>
        {typeof header === 'string'
          ? <Text bold style={{ whiteSpace: 'nowrap' }}>{header}</Text>
          : header}
      </Box>
      {sortedUsers.map(user => (
        <Box height={1} key={user.id}>
          <ConnectedForm field={field} data={user} />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box>
      <ConnectedDeleteSelected />
      <Set spaceBetween={1} flexWrap="nowrap">
        {/* Set can be nested for custom spaceBetween */}
        <Set spaceBetween={0.5} flexWrap="nowrap">
          <Column
            header={<ConnectedToggleUsersSelection users={sortedUsers} />}
            field="select"
          />
          <Column header="Name" field="name" />
        </Set>
        <Column header="🐈" field="likesCats" />
        <Column header="🐕" field="likesDogs" />
        <Column header="" field="saveOnCancel" />
      </Set>
    </Box>
  );
};

export default connect(({ users }: State) => ({ users: users.local }))(
  UsersList
);
