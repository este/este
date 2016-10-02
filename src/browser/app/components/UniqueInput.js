import React, { PropTypes } from 'react';
import { Form, Button, Input } from '../../app/components';

import { fields } from '../../../common/lib/redux-fields';

let UniqueInput = ({ submit, fields, inputLabel, btnLabel, placeholder }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    const content = fields.content.value.trim();
    if (!content) return;

    submit(content);

    fields.$reset();
  };


  return (
    <Form onSubmit={onSubmit}>
      <Input
        {...fields.content}
        label={inputLabel || ''}
        placeholder={placeholder}
      />
      <Button>
        { btnLabel || 'Submit' }
      </Button>
    </Form>
  );
};

UniqueInput.propTypes = {
  submit: PropTypes.func.isRequired,
  btnLabel: PropTypes.string,
  inputLabel: PropTypes.string,
  placeholder: PropTypes.string,
  fields: React.PropTypes.object.isRequired,
};


UniqueInput = fields(UniqueInput, {
  path: 'uniqueInput',
  fields: ['content'],
});

export default UniqueInput;
