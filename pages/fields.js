// @flow
import type { State } from '../types';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Fieldset from '../components/fieldset';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import Radio from '../components/radio';
import TextInput from '../components/text-input';
import app from '../components/app';
import fields from '../components/fields';

const onFormSubmit = () => {
  // ze by reset a values dostal form?
  // console.log('fok');
  // const values = fields.$values();
  // alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
  // fields.$reset();
  // // To see how to handle form validation and IO, check /auth.
};

const UserForm = ({ fields }) => (
  <Form onSubmit={onFormSubmit}>
    {/* <Field name="name"> */}
    <TextInput label="Name" placeholder="Jane Doe" {...fields.userName} />
    {/* </Field> */}
    <TextInput
      label="Description"
      placeholder="..."
      {...fields.userDescription}
    />
    <Fieldset vertical>
      <Checkbox label="I like cats" {...fields.userLikesCats} />
      <Checkbox label="I like dogs" {...fields.userLikesDogs} />
    </Fieldset>
    <Fieldset>
      <Radio label="Female" select="female" {...fields.userGender} />
      <Radio label="Male" select="male" {...fields.userGender} />
      <Radio label="Other" select="other" {...fields.userGender} />
    </Fieldset>
    <Fieldset>
      <Checkbox
        color="warning"
        label="Do we need a king?"
        labelOnLeft
        size={1}
        {...fields.userWantsKing}
      />
    </Fieldset>
    <Fieldset>
      <Button primary>Submit</Button>
    </Fieldset>
  </Form>
);

const NewUserForm = fields([
  'userName',
  'userDescription',
  'userLikesCats',
  'userLikesDogs',
  'userGender',
  'userWantsKing',
])(UserForm);

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
