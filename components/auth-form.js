// @flow
// import type {} from // State,
// // Dispatch,
// // UserForm as UserFormType,
// // ValidationErrors,
// '../types';

import Form from './form';
import Set from './set';
import TextInputBig from './text-input-big';
import withTheme, { type ThemeContext } from './withTheme';
import { SignInButton, SignUpButton } from './buttons';
import { compose } from 'ramda';
// import { connect } from 'react-redux';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';
// import { noFormId } from '../lib/form';

// https://blog.mariusschulz.com/2016/03/20/how-to-remove-webkits-banana-yellow-autofill-background
const overrideWebkitYellowAutofill = theme => ({
  WebkitBoxShadow: `inset 0 0 0px 9999px ${theme.colors[
    theme.page.backgroundColor
  ]}`,
  WebkitTextFillColor: theme.colors[theme.text.color],
});

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'email',
    id: 'authForm.emailPlaceholder',
  },
  passowordPlaceholder: {
    defaultMessage: 'password',
    id: 'authForm.passowordPlaceholder',
  },
});

const TextInputBigAuth = ({ theme, ...props }) =>
  <TextInputBig
    {...props}
    maxWidth={26}
    style={overrideWebkitYellowAutofill(theme)}
  />;

type AuthFormProps = {
  intl: IntlShape,
};

// const addUser = () => dispatch({ type: 'ADD_USER', form });

const AuthForm = ({ intl }: AuthFormProps, { theme }: ThemeContext) =>
  <Form>
    <Set vertical spaceBetween={0}>
      <TextInputBigAuth
        error=""
        name="email"
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        theme={theme}
        type="email"
      />
      <TextInputBigAuth
        error=""
        name="password"
        placeholder={intl.formatMessage(messages.passowordPlaceholder)}
        theme={theme}
        type="password"
      />
    </Set>
    <Set>
      <SignInButton primary />
      <SignUpButton primary />
    </Set>
  </Form>;

withTheme(AuthForm);

export default compose(
  // connect(({ auth: { form } }: State) => ({
  //   form: form.changed[noFormId] || form.initial,
  // })),
  injectIntl,
)(AuthForm);
//
// const connectedAuthForm = connect(state => ({
//
// }))(AuthForm)
//
// // Object define compose?
// export default connect(({ users: { form } }: State, { id = noFormId }) => ({
//   id,
//   form: form.changed[id] || form.initial,
//   appError: form.appError[id],
//   validationErrors: form.validationErrors[id],
//   disabled: form.disabled[id],
// }))(UserForm);

// export default injectIntl(AuthForm);
