// @flow
import Box from './box';
import Button from './button';
import Form from './form';
import Set from './set';
import Text from './text';
import TextInput from './text-input';
import withTheme, { type ThemeContext } from './withTheme';

// https://blog.mariusschulz.com/2016/03/20/how-to-remove-webkits-banana-yellow-autofill-background
const overrideWebkitYellowAutofill = theme => ({
  WebkitBoxShadow: `inset 0 0 0px 9999px ${theme.colors[
    theme.page.backgroundColor
  ]}`,
  WebkitTextFillColor: theme.colors[theme.text.color],
});

const TextInputBig = ({ error, theme, ...props }) =>
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

const AuthForm = (props: {}, { theme }: ThemeContext) =>
  <Form>
    <Set vertical spaceBetween={0}>
      <TextInputBig
        error=""
        name="email"
        placeholder="Email"
        theme={theme}
        type="email"
      />
      <TextInputBig
        error=""
        name="password"
        placeholder="Password"
        theme={theme}
        type="password"
      />
    </Set>
    <Set>
      <Button primary>Sign In</Button>
      <Button primary>Sign Up</Button>
    </Set>
  </Form>;

withTheme(AuthForm);

export default AuthForm;
