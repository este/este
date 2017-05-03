// @flow
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
      <Buttons vertical>
        <Checkbox label="I like dogs" value />
        <Checkbox label="I like cats" value />
      </Buttons>
      <Buttons>
        <Radio label="Male" select="male" value="male" />
        <Radio label="Female" select="female" value="male" />
        <Radio label="Other" select="other" value="male" />
      </Buttons>
      <Buttons>
        <Checkbox
          // {...fields.agree}
          color="warning"
          label="Agree"
          labelOnLeft
          size={1}
          value={false}
        />
      </Buttons>
      <Buttons>
        <Button primary>Submit</Button>
      </Buttons>
    </Form>
  </Page>
);

// TODO: IsFoo boolean by default.

export default app(About);
