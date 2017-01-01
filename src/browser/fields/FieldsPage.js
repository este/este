// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import compose from 'ramda/src/compose';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { fields } from '../../common/lib/redux-fields';
import {
  Box,
  Button,
  Form,
  Input,
  PageHeader,
  Paragraph,
  Text,
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
        description="Simple and universal forms without pitas"
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
        {/* TODO:
          <Radio checked={fields.gender.value === 'female'}
          <Checkbox checked={fields.likeCats.value}
        */}
        <Button onClick={onSubmit} primary>
          <FormattedMessage {...buttonsMessages.submit} />
        </Button>
      </Form>
      <Paragraph>
        <Text display="block">TODO: Universal SVG Radio, Checkbox, Select.</Text>
      </Paragraph>
    </Box>
  );
};

export default compose(
  fields({
    path: 'fieldsPage',
    fields: [
      'name',
      'description',
      'gender', // radios
      'likeCats', // checkbox
      'likeDogs', // checkbox
    ],
    getInitialState: () => ({
      // We can set initial state by props ofc.
      // name: props.name, gender: 'other', etc.
      gender: null,
      likeCats: false,
      likeDogs: false,
    }),
  }),
)(FieldsPage);
