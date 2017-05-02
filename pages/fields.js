// @flow
import Field from '../components/field';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import app from '../lib/app';

const onFormSubmit = () => {
  console.log('foo');
};

const About = () => (
  <Page title="Fields">
    <Heading size={3}>redux-fields</Heading>
    <P>
      Simple and universal Redux forms.
    </P>
    <Form onSubmit={onFormSubmit}>
      <Field label="Name" placeholder="Jane Doe" />
      <Field label="Description" placeholder="Some short description" />
    </Form>
  </Page>
);

export default app(About);
