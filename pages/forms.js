// @flow
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import UserForm from '../components/user-form';
import UsersForm from '../components/users-form';
import app from '../components/app';

const Forms = () => (
  <Page title="Forms">
    <Heading size={3}>Forms</Heading>
    <P>
      Simple and fast Redux forms without unnecessary abstractions.
    </P>
    <UserForm />
    <Heading size={1}>A table made from Flexbox only</Heading>
    <P>
      Note edit is fast even with hundred of users. How? Just two rules. Do not
      nest connected selected states and use react-virtualized for super
      long lists.
    </P>
    <UsersForm />
  </Page>
);

export default app(Forms);
