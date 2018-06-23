// @flow
import * as React from 'react';
import { View } from 'react-native';
import TextInput from '../core/TextInput';
import withMutation, { type Commit } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/PageTitleMutation.graphql';
import throttle from 'lodash/throttle';
import { defineMessages, type IntlShape } from 'react-intl';
import withIntl from '../core/withIntl';
import { changeTextThrottle } from '../../constants';

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

class PageTitle extends React.PureComponent<PageTitleProps> {
  handleTextInputChangeText = throttle(value => {
    const input = {
      id: this.props.pageId,
      title: value,
    };
    this.props.commit(input);
  }, changeTextThrottle);

  render() {
    const { intl } = this.props;

    return (
      <View>
        <TextInput
          size={1}
          onChangeText={this.handleTextInputChangeText}
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
