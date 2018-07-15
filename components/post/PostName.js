// @flow
import * as React from 'react';
import TextInput from '../core/TextInput';
import withMutation from '../core/withMutation';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import * as validations from '../../validations';
import { pipe } from 'ramda';
import SetPostNameMutation, {
  type SetPostNameCommit,
  type SetPostNameErrors,
} from '../../mutations/SetPostNameMutation';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'post name',
    id: 'postName.textInput.placeholder',
  },
});

type PostNameProps = {|
  postId: string,
  // defaultValue because component is uncontrolled. This is fine for now.
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  defaultValue: string,
  commit: SetPostNameCommit,
  intl: IntlShape,
|};

type PostNameState = {|
  errors: SetPostNameErrors,
|};

class PostName extends React.PureComponent<PostNameProps, PostNameState> {
  state = {
    errors: null,
  };

  handleTextInputChangeTextThrottled = value => {
    const input = {
      id: this.props.postId,
      name: value,
    };
    const errors = validations.validateSetPostName(input);
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
  withMutation(SetPostNameMutation),
)(PostName);
