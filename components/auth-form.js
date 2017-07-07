// @flow
import type {
  State,
  // Dispatch,
  Form as FormType,
  AuthFormFields,
} from '../types';
import type { Theme } from '../themes/types';
import Form from './form';
import Set from './set';
import TextInputBig from './text-input-big';
import injectTheme from './inject-theme';
import { SignInButton, SignUpButton } from './buttons';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';
import { noFormId } from '../lib/form';

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
  form: FormType<AuthFormFields>,
  intl: IntlShape,
  theme: Theme,
};

const AuthForm = ({ form, intl, theme }: AuthFormProps) =>
  <Form>
    <Set vertical spaceBetween={0}>
      <TextInputBigAuth
        error=""
        name="email"
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        theme={theme}
        type="email"
        value={form.fields.email}
      />
      <TextInputBigAuth
        error=""
        name="password"
        placeholder={intl.formatMessage(messages.passowordPlaceholder)}
        theme={theme}
        type="password"
        value={form.fields.password}
      />
    </Set>
    <Set>
      <SignInButton primary />
      <SignUpButton primary />
    </Set>
  </Form>;

export default compose(
  injectIntl,
  injectTheme,
  // Connect must be the last until React fixes context update.
  connect(({ auth: { form } }: State) => ({
    form: form.changed[noFormId] || form.initial,
  })),
)(AuthForm);
