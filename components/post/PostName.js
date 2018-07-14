// @flow
import * as React from 'react';
import TextInput from '../core/TextInput';
import withMutation, { type Commit, type Errors } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/PostNameMutation.graphql';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import * as validations from '../../validations';
import { pipe } from 'ramda';

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
  commit: Commit<
    generated.SetPostNameInput,
    generated.PostNameMutationResponse,
  >,
  intl: IntlShape,
|};

type PostNameState = {|
  errors: Errors<generated.PostNameMutationResponse, 'setPostName'>,
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
  withMutation(
    graphql`
      mutation PostNameMutation($input: SetPostNameInput!) {
        setPostName(input: $input) {
          # Payload "post { name }" updates fragments with post name. Perfect.
          post {
            name
          }
          errors {
            name
          }
        }
      }
    `,
  ),
)(PostName);
