// @flow
import * as React from 'react';
import TextInput from '../core/TextInput';
import withMutation from '../core/withMutation';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import * as validations from '../../validations';
import { pipe } from 'ramda';
import SetWebNameMutation, {
  type SetWebNameCommit,
  type SetWebNameErrors,
} from '../../mutations/SetWebNameMutation';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'web name',
    id: 'webName.textInput.placeholder',
  },
});

type WebNameProps = {|
  webId: string,
  // defaultValue because component is uncontrolled. This is fine for now.
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  defaultValue: string,
  commit: SetWebNameCommit,
  intl: IntlShape,
|};

type WebNameState = {|
  errors: SetWebNameErrors,
|};

class WebName extends React.PureComponent<WebNameProps, WebNameState> {
  state = {
    errors: null,
  };

  handleTextInputChangeTextThrottled = value => {
    const input = {
      id: this.props.webId,
      name: value,
    };
    const errors = validations.validateSetWebName(input);
    this.setState({ errors });
    if (errors == null) this.props.commit(input);
  };

  render() {
    const { intl } = this.props;
    const { errors } = this.state;

    return (
      <TextInput
        error={errors && errors.name}
        size={1}
        onChangeTextThrottled={this.handleTextInputChangeTextThrottled}
        defaultValue={this.props.defaultValue}
        placeholder={intl.formatMessage(messages.placeholder)}
      />
    );
  }
}

export default pipe(
  injectIntl,
  withMutation(SetWebNameMutation),
)(WebName);
