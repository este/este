// @flow
import * as React from 'react';
import Button from './Button';

// Test vertical rhythm visually. Inspired by basehold.it

const ToggleBaseline = () => (
  <Button primary outline size={-1} disabled>
    {/* {baselineShown ? 'Hide Baseline' : 'Show Baseline'} */}
    Show Baseline
  </Button>
);

export default ToggleBaseline;
