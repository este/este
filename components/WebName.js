// @flow
import * as React from 'react';
import TextInput from './core/TextInput';
import withMutation from './core/withMutation';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import * as validations from '../validations';
import { pipe } from 'ramda';
import SetWebNameMutation, {
  type SetWebNameCommit,
  type SetWebNameErrors,
} from '../mutations/SetWebNameMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import type { WebName as Data } from './__generated__/WebName.graphql';
import withStore, { type Store } from './core/withStore';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'web name',
    id: 'webName.textInput.placeholder',
  },
});

type WebNameProps = {|
  data: Data,
  commit: SetWebNameCommit,
  intl: IntlShape,
  store: Store,
|};

type WebNameState = {|
  errors: SetWebNameErrors,
|};

class WebName extends React.PureComponent<WebNameProps, WebNameState> {
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
    const errors = validations.validateSetWebName(input);
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
    withMutation(SetWebNameMutation),
  )(WebName),
  graphql`
    fragment WebName on Web {
      id
      name @__clientField(handle: "draft")
      draftName
    }
  `,
);
