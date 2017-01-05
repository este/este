// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { fields } from '../../common/lib/redux-fields';
import {
  Box,
  Button,
  Checkbox,
  Form,
  Input,
  PageHeader,
  Radio,
  Title,
} from '../app/components';

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
      <Form
        maxWidth={21}
        onSubmit={onSubmit}
      >
        <Input
          field={fields.name}
          label="Name"
          maxLength={100}
          placeholder="Jane Doe"
          // That's how we can render field error.
          // error="Name is required"
        />
        <Input
          field={fields.description}
          label="Description"
          maxLength={100}
          placeholder="Some short description"
          rows={2}
        />
        <Box marginBottom={1}>
          <Checkbox
            field={fields.likeDogs}
            label="I like dogs"
          />
          <Checkbox
            field={fields.likeCats}
            label="I like cats"
          />
        </Box>
        <Box marginBottom={1}>
          <Radio
            field={fields.gender}
            label="Male"
            value="male"
          />
          <Radio
            field={fields.gender}
            label="Female"
            value="female"
          />
          <Radio
            field={fields.gender}
            label="Other"
            value="other"
          />
        </Box>
        <Checkbox
          checkboxStyle={{ marginBottom: 1 }}
          color="warning"
          field={fields.agree}
          label="Agree"
          labelPosition="left"
          labelStyle={{ bold: true }}
          size={1}
        />
        <Button primary onClick={onSubmit}>
          <FormattedMessage {...buttonsMessages.submit} />
        </Button>
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
      // We can use props of course.
      // likeCats: true,
      // gender: 'female',
    }),
  }),
)(FieldsPage);
