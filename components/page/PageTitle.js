// @flow
import * as React from 'react';
import { View } from 'react-native';
import TextInput from '../core/TextInput';
import withMutation, { type Commit, type Errors } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/PageTitleMutation.graphql';
import { defineMessages, type IntlShape } from 'react-intl';
import withIntl from '../core/withIntl';
import { validateSetPageTitle } from '../../server/api/resolvers/Mutation';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'page title',
    id: 'pageTitle.textInput.placeholder',
  },
});

type PageTitleProps = {|
  pageId: string,
  // defaultValue because component is uncontrolled. This is fine for now.
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  defaultValue: string,
  commit: Commit<
    generated.SetPageTitleInput,
    generated.PageTitleMutationResponse,
  >,
  intl: IntlShape,
|};

type PageTitleState = {|
  errors: Errors<generated.CreateWebMutationResponse, 'createWeb'>,
|};

class PageTitle extends React.PureComponent<PageTitleProps, PageTitleState> {
  state = {
    errors: null,
  };

  handleTextInputChangeTextThrottled = value => {
    const input = {
      id: this.props.pageId,
      title: value,
    };
    const errors = validateSetPageTitle(input);
    this.setState({ errors });
    if (errors == null) this.props.commit(input);
  };

  render() {
    const { intl } = this.props;
    const { errors } = this.state;

    return (
      <View>
        <TextInput
          error={errors && errors.title}
          size={1}
          onChangeTextThrottled={this.handleTextInputChangeTextThrottled}
          defaultValue={this.props.defaultValue}
          placeholder={intl.formatMessage(messages.placeholder)}
        />
      </View>
    );
  }
}

export default withMutation(
  withIntl(PageTitle),
  graphql`
    mutation PageTitleMutation($input: SetPageTitleInput!) {
      setPageTitle(input: $input) {
        # Payload "page { title }" updates fragments with page title. Perfect.
        page {
          title
        }
      }
    }
  `,
);
