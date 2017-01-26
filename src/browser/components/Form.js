// @flow
import type { BoxProps } from '../../common/components/Box';
import type { Theme } from '../../common/themes/types';
import React from 'react';
import { Box } from '../../common/components';

type FormProps = BoxProps & { onSubmit?: (SyntheticEvent) => void };
type FormContext = { theme: Theme };

const onSubmitWithPreventDefault = onSubmit => event => {
  if (!onSubmit) return;
  event.preventDefault();
  onSubmit(event);
};

// Note BrowserForm is defined here and not dynamically passed, otherwise
// children inputs would lost focus.
// TODO: Consider PlatformForm, aka Form for the React Native. Do we need it?
const BrowserForm = props => <form {...props} />;

const Form = (props: FormProps, { theme }: FormContext) => {
  const {
    marginBottom = theme.block.marginBottom,
    maxWidth = theme.block.maxWidth,
    onSubmit,
    ...restProps
  } = props;
  return (
    <Box
      as={BrowserForm}
      marginBottom={marginBottom}
      maxWidth={maxWidth}
      onSubmit={onSubmitWithPreventDefault(onSubmit)}
      {...restProps}
    />
  );
};

Form.contextTypes = { theme: React.PropTypes.object };

export default Form;
