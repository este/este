// @flow
import * as React from 'react';
import TextInput from './core/TextInput';
import withMutation from './core/withMutation';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import * as validations from '../validations';
import { pipe } from 'ramda';
import SetPostNameMutation, {
  type SetPostNameCommit,
  type SetPostNameErrors,
} from '../mutations/SetPostNameMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostName.graphql';
import withStore, { type Store } from './core/withStore';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'post name',
    id: 'postName.textInput.placeholder',
  },
});

type PostNameProps = {|
  data: generated.PostName,
  commit: SetPostNameCommit,
  intl: IntlShape,
  store: Store,
|};

type PostNameState = {|
  errors: SetPostNameErrors,
|};

class PostName extends React.PureComponent<PostNameProps, PostNameState> {
  state = {
    errors: null,
  };

  handleTextInputChangeText = (text: string) => {
    this.props.store(store => {
      const record = store.get(this.props.data.id);
      if (!record) return;
      record.setValue(text, 'draftName');
    });
  };

  handleTextInputChangeTextThrottled = value => {
    const input = {
      id: this.props.data.id,
      name: value,
    };
    const errors = validations.validateSetPostName(input);
    this.setState({ errors });
    if (errors == null) this.props.commit(input);
  };

  render() {
    const { data, intl } = this.props;
    const { errors } = this.state;
    return (
      <TextInput
        error={errors && errors.name}
        size={1}
        value={data.draftName}
        onChangeText={this.handleTextInputChangeText}
        onChangeTextThrottled={this.handleTextInputChangeTextThrottled}
        placeholder={intl.formatMessage(messages.placeholder)}
      />
    );
  }
}

export default createFragmentContainer(
  pipe(
    injectIntl,
    withStore,
    withMutation(SetPostNameMutation),
  )(PostName),
  graphql`
    fragment PostName on Post {
      id
      name @__clientField(handle: "draftName")
      draftName
    }
  `,
);
