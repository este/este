// @flow
import type {
  AuthFormFields,
  Dispatch,
  Form as FormType,
  State,
} from '../types';
import AppError from './app-error';
import Box from './box';
import Form from './form';
import Heading from './heading';
import Set from './set';
import TextInputBig from './text-input-big';
import ValidationError from '../components/validation-error';
import withTheme, { type ThemeContext } from './with-theme';
import { SignInButton, SignUpButton } from './buttons';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';
import { initialFormId } from '../lib/form';
import { temp } from '../lib/temp';

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

// https://blog.mariusschulz.com/2016/03/20/how-to-remove-webkits-banana-yellow-autofill-background
const overrideWebkitYellowAutofill = theme => ({
  WebkitBoxShadow: `inset 0 0 0px 9999px ${theme.colors[
    theme.page.backgroundColor
  ]}`,
  WebkitTextFillColor: theme.colors[theme.text.color],
});

const TextInputBigAuth = ({ theme, ...props }) =>
  <TextInputBig
    {...props}
    maxWidth={26}
    style={overrideWebkitYellowAutofill(theme)}
  />;

type AuthFormProps = {
  dispatch: Dispatch,
  form: FormType<AuthFormFields>,
  intl: IntlShape,
};

const AuthForm = (
  { dispatch, form, intl }: AuthFormProps,
  { theme }: ThemeContext,
) => {
  const disabled = temp(form.disabled);
  const setUserForm = (prop: $Keys<AuthFormFields>) => value => {
    dispatch({
      type: 'SET_AUTH_FORM',
      // $FlowFixMe Flow bug.
      fields: { ...form.fields, [prop]: value },
    });
  };
  const auth = signUp =>
    dispatch({ type: 'AUTH', fields: { ...form.fields, signUp } });
  const signIn = () => auth(false);
  const signUp = () => auth(true);

  return (
    <Box>
      <Heading size={3}>Auth</Heading>
      <Form onSubmit={signIn}>
        <Set vertical spaceBetween={0}>
          <TextInputBigAuth
            autoFocus={form.validationErrors.email}
            disabled={disabled}
            error={<ValidationError error={form.validationErrors.email} />}
            name="email"
            onChange={setUserForm('email')}
            placeholder={intl.formatMessage(messages.emailPlaceholder)}
            theme={theme}
            type="email"
            value={form.fields.email}
          />
          <TextInputBigAuth
            autoFocus={form.validationErrors.password}
            disabled={disabled}
            error={<ValidationError error={form.validationErrors.password} />}
            name="password"
            onChange={setUserForm('password')}
            placeholder={intl.formatMessage(messages.passowordPlaceholder)}
            theme={theme}
            type="password"
            value={form.fields.password}
          />
        </Set>
        <Set>
          <SignInButton disabled={disabled} onPress={signIn} primary />
          <SignUpButton disabled={disabled} onPress={signUp} />
        </Set>
        <AppError error={form.appError} />
      </Form>
    </Box>
  );
};

withTheme(AuthForm);

export default compose(
  connect(({ auth: { form } }: State) => ({
    form: form.changed[initialFormId] || form.initial,
  })),
  injectIntl,
)(AuthForm);
