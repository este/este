// @flow
import * as React from 'react';
import Button from './Button';

const ToggleDark = () => (
  <Button primary outline size={-1} disabled>
    {/* {darkEnabled ? 'Disable Dark' : 'Enable dark'} */}
    Disable dark
  </Button>
);

export default ToggleDark;
