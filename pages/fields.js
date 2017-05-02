// @flow
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import TextInput from '../components/text-input';
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
      <TextInput placeholder="fok" />
    </Form>
    <P>Shit man</P>
  </Page>
);

export default app(About);
