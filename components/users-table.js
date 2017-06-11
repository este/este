// @flow
import type { State, Dispatch } from '../types';
import Box from '../components/box';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Heading from '../components/heading';
import P from '../components/p';
import Set from '../components/set';
import Text from '../components/text';
import TextInput from '../components/text-input';
import { connect } from 'react-redux';

// This is pretty fast editable lists. Just follow this two simple rules:
// 1) Do not nest the same redux connect selected states.
// 2) For huge lists, use react-virtualized.

const Form = ({ data, changed, field, selected, dispatch }) => {
  const user = { ...data, ...changed };
  const set = (prop: string) => value => {
    dispatch({
      type: 'SET_USER_FORM',
      id: user.id,
      form: { ...user, [prop]: value },
    });
  };
  const toggleUsersSelection = () => {
    dispatch({
      type: 'TOGGLE_USERS_SELECTION',
      users: [user],
    });
  };
  const saveUser = () => {
    dispatch({ type: 'SAVE_USER', user });
  };
  const cancelEditation = () => {
    dispatch({
      type: 'SET_USER_FORM',
      id: user.id,
      form: null,
    });
  };
  const onNameKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        saveUser();
        break;
      case 'Escape':
        cancelEditation();
        break;
    }
  };

  switch (field) {
    case 'select':
      return (
        <Checkbox
          alignItems="center"
          height={1}
          opacity={selected ? 1 : 0.25}
          onChange={toggleUsersSelection}
          value={selected}
        />
      );
    case 'name':
      return (
        <TextInput
          borderBottomWidth={1}
          borderColor="gray"
          borderStyle="solid"
          maxLength={100}
          onChange={set('name')}
          onKeyDown={onNameKeyDown}
          value={user[field]}
          width={10}
        />
      );
    case 'likesCats':
    case 'likesDogs':
      return (
        <Checkbox
          alignItems="center"
          height={1}
          onChange={set(field)}
          value={user[field]}
        />
      );
    case 'saveOnCancel': {
      if (!changed) return null;
      return (
        <Set flexWrap="nowrap">
          <Button
            color="primary"
            size={-1}
            height={1}
            marginVertical={0}
            onPress={saveUser}
            paddingHorizontal={0}
          >
            save
          </Button>
          <Button
            color="warning"
            size={-1}
            marginVertical={0}
            onPress={cancelEditation}
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
    changed: users.form.changed[data.id],
    selected: users.selected[data.id],
  }),
  (dispatch: Dispatch) => ({ dispatch })
)(Form);

const DeleteSelected = ({ selected, dispatch }) =>
  <Button
    color="warning"
    disabled={Object.keys(selected).length === 0}
    size={-1}
    onPress={() => dispatch({ type: 'DELETE_SELECTED_USERS' })}
    paddingHorizontal={0}
    marginVertical={0}
  >
    Delete Selected
  </Button>;

const ConnectedDeleteSelected = connect(
  ({ users }: State) => ({
    selected: users.selected,
  }),
  (dispatch: Dispatch) => ({ dispatch })
)(DeleteSelected);

const ToggleUsersSelection = ({ selected, users, dispatch }) =>
  <Checkbox
    alignItems="center"
    opacity={0.25}
    onChange={() => dispatch({ type: 'TOGGLE_USERS_SELECTION', users })}
    value={users.every(user => selected[user.id])}
  />;

const ConnectedToggleUsersSelection = connect(
  ({ users }: State) => ({
    selected: users.selected,
  }),
  (dispatch: Dispatch) => ({ dispatch })
)(ToggleUsersSelection);

const Column = ({ header, field, users }) =>
  <Box>
    <Box height={2} paddingVertical={0.5}>
      {typeof header === 'string'
        ? <Text bold style={{ whiteSpace: 'nowrap' }}>{header}</Text>
        : header}
    </Box>
    {users.map(user =>
      <Box height={2} paddingVertical={0.5} key={user.id}>
        <ConnectedForm field={field} data={user} />
      </Box>
    )}
  </Box>;

const EmptyTable = () =>
  <Text italic>Some friendly empty table message here...</Text>;

// Yep, this is a table without <table>. The table layout below is created
// with flexboxes only. React Native (https://facebook.github.io/yoga) does
// not support table layout, and honestly, I never liked it.
// Tableless tables allow us to do fancy things easily. For example:
// https://bvaughn.github.io/react-virtualized/#/components/Table
const UsersTable = ({ users }) => {
  const sortedUsers = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse();

  return (
    <Box>
      <Heading size={2}>A table made from Flexbox only</Heading>
      <P>
        Note it's fast even with hundred of rows. How? Just two rules. Do not
        nest connected selected states. And for very long lists, use
        react-virtualized.
      </P>
      {sortedUsers.length === 0
        ? <EmptyTable />
        : <Box>
            <ConnectedDeleteSelected />
            <Set spaceBetween={1} flexWrap="nowrap">
              {/* Set can be nested for custom spaceBetween */}
              <Set spaceBetween={0.5} flexWrap="nowrap">
                <Column
                  header={<ConnectedToggleUsersSelection users={sortedUsers} />}
                  field="select"
                  users={sortedUsers}
                />
                <Column header="Name" field="name" users={sortedUsers} />
              </Set>
              <Column header="🐈" field="likesCats" users={sortedUsers} />
              <Column header="🐕" field="likesDogs" users={sortedUsers} />
              <Column header="" field="saveOnCancel" users={sortedUsers} />
            </Set>
          </Box>}
    </Box>
  );
};

export default connect(({ users }: State) => ({ users: users.local }))(
  UsersTable
);
