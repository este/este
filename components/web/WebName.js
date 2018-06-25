// @flow
import * as React from 'react';
import TextInput from '../core/TextInput';
import withMutation, { type Commit, type Errors } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/WebNameMutation.graphql';
import { defineMessages, type IntlShape } from 'react-intl';
import withIntl from '../core/withIntl';
import * as validations from '../../validations';

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
  commit: Commit<generated.SetWebNameInput, generated.WebNameMutationResponse>,
  intl: IntlShape,
|};

type WebNameState = {|
  errors: Errors<generated.WebNameMutationResponse, 'setWebName'>,
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

export default withMutation(
  withIntl(WebName),
  graphql`
    mutation WebNameMutation($input: SetWebNameInput!) {
      setWebName(input: $input) {
        web {
          name
          id
        }
        errors {
          name
        }
      }
    }
  `,
);
