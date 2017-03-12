// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import linksMessages from '../../common/app/linksMessages';
import { Box, Button, Field, PageHeader } from '../../common/components';
import { Checkbox, Form, Radio, Title } from '../components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { fields } from '../../common/lib/redux-fields';

const FieldsPage = ({ fields }) => {
  const onSubmit = () => {
    const values = fields.$values();
    alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
    fields.$reset();
    // To see how to handle form validation and IO, check /auth.
  };

  return (
    <Box>
      <Title message={linksMessages.fields} />
      <PageHeader
        heading="redux-fields"
        description="Simple and universal Redux forms"
      />
      <Form maxWidth={21} onSubmit={onSubmit}>
        <Field
          {...fields.name}
          label="Name"
          maxLength={100}
          placeholder="Jane Doe"
          // That's how we can show field error.
          // error="Name is required"
        />
        <Field
          {...fields.description}
          label="Description"
          maxLength={100}
          placeholder="Some short description"
        />
        <Box marginBottom={1}>
          <Checkbox {...fields.likeDogs} label="I like dogs" />
          <Checkbox {...fields.likeCats} label="I like cats" />
        </Box>
        <Box flexDirection="row" marginBottom={1}>
          <Radio {...fields.gender} label="Male" selected="male" />
          <Radio {...fields.gender} label="Female" selected="female" />
          <Radio {...fields.gender} label="Other" selected="other" />
        </Box>
        <Checkbox
          {...fields.agree}
          color="warning"
          label="Agree"
          labelPosition="left"
          size={1}
        />
        <Box flexDirection="row" marginTop={1}>
          <FormattedMessage {...buttonsMessages.submit}>
            {message => <Button primary onPress={onSubmit}>{message}</Button>}
          </FormattedMessage>
        </Box>
      </Form>
    </Box>
  );
};

export default compose(
  fields({
    path: 'fieldsPage',
    fields: [
      'name',
      'description',
      'likeCats', // checkbox
      'likeDogs', // checkbox
      'gender', // radios
      'agree',
    ],
    getInitialState: () => ({
      // Of course, we can use passed props if we want.
      // likeCats: true,
      // gender: 'female',
    }),
  }),
)(FieldsPage);
