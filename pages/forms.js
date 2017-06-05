// @flow
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import UserForm from '../components/user-form';
import UsersTable from '../components/users-table';
import app from '../components/app';

const Forms = () =>
  <Page title="Forms">
    <Heading size={3}>Forms</Heading>
    <P>
      Simple, fast, and typed Redux forms without unnecessary abstractions.
    </P>
    <UserForm />
    <UsersTable />
  </Page>;

export default app(Forms);
