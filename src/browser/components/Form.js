// @flow
import type { BoxProps } from '../../common/components/Box';
import type { Theme } from '../../common/themes/types';
import React from 'react';
import { Box } from '../../common/components';

type FormProps = BoxProps & {
  children?: any,
  onSubmit?: (SyntheticEvent) => void,
};

type FormContext = { theme: Theme };

// Note BrowserForm is defined here and not dynamically passed, otherwise
// children inputs would lost focus.
// TODO: Consider PlatformForm, aka Form for the React Native. Do we need it?
const BrowserForm = props => <form {...props} />;

const onSubmitWithPreventDefault = onSubmit =>
  event => {
    if (!onSubmit) return;
    event.preventDefault();
    onSubmit(event);
  };

// Hack allowing to submit a form on key enter in input.
const SubmitOnInputEnter = () => (
  <input style={{ display: 'none' }} type="submit" />
);

const Form = (props: FormProps, { theme }: FormContext) => {
  const {
    marginBottom = theme.block.marginBottom,
    maxWidth = theme.block.maxWidth,
    onSubmit,
    children,
    ...restProps
  } = props;
  return (
    <Box
      as={BrowserForm}
      marginBottom={marginBottom}
      maxWidth={maxWidth}
      onSubmit={onSubmitWithPreventDefault(onSubmit)}
      {...restProps}
    >
      <SubmitOnInputEnter />
      {children}
    </Box>
  );
};

Form.contextTypes = { theme: React.PropTypes.object };

export default Form;
