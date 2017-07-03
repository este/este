// @flow
import Box from './box';
import Form from './form';
import Set from './set';
import Text from './text';
import TextInput from './text-input';
import withTheme, { type ThemeContext } from './withTheme';
import { SignInButton, SignUpButton } from './buttons';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';

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

const TextInputAuth = ({ error, theme, ...props }) =>
  <Box>
    <TextInput
      {...props}
      borderBottomWidth={1}
      borderColor="gray"
      borderStyle="solid"
      marginBottom={error ? 0 : 1}
      maxWidth={26}
      paddingVertical={0.5}
      style={overrideWebkitYellowAutofill(theme)}
    />
    {error &&
      <Text color="danger" size={-1}>
        {error}
      </Text>}
  </Box>;

type AuthFormProps = {
  intl: IntlShape,
};

const AuthForm = ({ intl }: AuthFormProps, { theme }: ThemeContext) =>
  <Form>
    <Set vertical spaceBetween={0}>
      <TextInputAuth
        error=""
        name="email"
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        theme={theme}
        type="email"
      />
      <TextInputAuth
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

export default injectIntl(AuthForm);
