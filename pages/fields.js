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
import { compose } from 'ramda';

const onFormSubmit = () => {
  // const values = fields.$values();
  // alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
  // fields.$reset();
  // // To see how to handle form validation and IO, check /auth.
  // // strom, pres name?
  // console.log('foo');
};

const Fields = () => (
  <Page title="Fields">
    <Heading size={3}>redux-fields</Heading>
    <P>
      Simple and universal Redux forms.
    </P>
    <Form onSubmit={onFormSubmit}>
      <Field label="Name" placeholder="Jane Doe" />
      <Field label="Description" placeholder="Some short description" />
      <Buttons vertical>
        <Checkbox label="I like dogs" value={true} />
        <Checkbox label="I like cats" value={false} />
      </Buttons>
      <Buttons>
        <Radio label="Male" select="male" value="male" />
        <Radio label="Female" select="female" value="" />
        <Radio label="Other" select="other" value="" />
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

// const fields = {
//   name: {
//     name: 'name',
//     value: 'Joe',
//     onChange: e => {
//       // dispatch
//       console.log(e.currentTarget.value);
//     },
//   },
// };
// typove, to vlozi fields objekty, ok
// const fields = (name, getInitialState) => Component => {
//   // vytvorit objekt pro render, pokud neni
//   //
//
//   let fieldsProp;
//   const Fields = props => {
//     // if (!fieldsProp) {
//     //   const initialState = getInitialState(props);
//     // }
//     return <Component {...props} />;
//   };
//   // vytvorit fields jakmile mam props
//   // mit to v closure,
//   return Fields;
// };

// jak na edit? ta sama komponenta dostane data
// default props?
export default compose(
  // fields(({ data }) => ({
  //   path: 'fieldsPage',
  //   initialState: data || {
  //     name: '',
  //     description: '',
  //     likeCats: false,
  //     likeDogs: false,
  //     gender: 'null',
  //     agree: false,
  //   },
  // })),
  app
)(Fields);
