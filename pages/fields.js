// @flow
import type { State } from '../types';
import Button from '../components/button';
import Buttons from '../components/buttons';
import Checkbox from '../components/checkbox';
import Field from '../components/field';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import Radio from '../components/radio';
import app from '../lib/app';
import { connect } from 'react-redux';
import { setField } from '../lib/fields/actions';

const onFormSubmit = () => {
  // console.log('fok');
  // const values = fields.$values();
  // alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
  // fields.$reset();
  // // To see how to handle form validation and IO, check /auth.
  // // strom, pres name?
  console.log('foo');
};

// const fok =

const UserForm = ({ userName, userDescription, setField }) => (
  <Form onSubmit={onFormSubmit}>
    <Field
      label="Name"
      name="name"
      onChange={e => setField('1', { userName: e.currentTarget.value })}
      placeholder="Jane Doe"
      value={userName}
    />
    <Field
      label="Description"
      name="description"
      onChange={e => setField('1', { userDescription: e.currentTarget.value })}
      placeholder="..."
      value={userDescription}
    />
    {/* <Buttons vertical>
      <Checkbox value={user.likeCats} label="I like cats" />
      <Checkbox value={user.likeDogs} label="I like dogs" />
    </Buttons>
    <Buttons>
      <Radio value={user.gender} label="Female" select="female" />
      <Radio value={user.gender} label="Male" select="male" />
      <Radio value={user.gender} label="Other" select="other" />
    </Buttons>
    <Buttons>
      <Checkbox
        value={user.doWeNeedKing}
        color="warning"
        label="Do we need a king?"
        labelOnLeft
        size={1}
      />
    </Buttons>
    <Buttons>
      <Button primary>Submit</Button>
    </Buttons> */}
  </Form>
);

// TODO: Custom hoc, dostane array strings, sama resi merge, a reset i values.
//
const NewUserForm = connect(
  // merge props z initial, a z changed
  // idealne v komponente, imho... hmm
  (state: State) => ({
    userName: state.fields.initial.userName,
    userDescription: state.fields.initial.userDescription,
  }),
  // kdykoliv je zmena...
  // mixovat zde, pak v hoc
  // (state: State) => {
  //   return ['userName', 'userDescription'].reduce((props, fieldName) => {
  //     return {
  //       ...props,
  //       [fieldName]: state.fields.initial[fieldName],
  //     };
  //   }, {});
  // },
  { setField }
)(UserForm);

const Fields = () => (
  <Page title="Fields">
    <Heading size={3}>redux-fields</Heading>
    <P>
      Simple and universal Redux forms.
    </P>
    <NewUserForm />
  </Page>
);

export default app(Fields);
