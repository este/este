// @flow
import * as React from 'react';
import { View, TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import withMutation, { type Commit } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/EditorPageTitleMutation.graphql';
import throttle from 'lodash/throttle';
import { defineMessages, type IntlShape } from 'react-intl';
import withIntl from '../core/withIntl';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'page title…',
    id: 'editorPageTitle.textInput.placeholder',
  },
});

type EditorPageTitleProps = {|
  theme: Theme,
  pageId: string,
  // defaultValue because component is uncontrolled. This is fine for now.
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  defaultValue: string,
  commit: Commit<
    generated.SetPageTitleInput,
    generated.EditorPageTitleMutationResponse,
  >,
  intl: IntlShape,
|};

class EditorPageTitle extends React.PureComponent<EditorPageTitleProps> {
  handleTextInputChangeText = throttle(value => {
    const input = {
      id: this.props.pageId,
      title: value,
    };
    this.props.commit(input);
  }, 1000);

  render() {
    const { theme, intl } = this.props;

    return (
      <View>
        <TextInput
          style={[
            theme.styles.heading,
            theme.typography.fontSizeWithLineHeight(1),
          ]}
          onChangeText={this.handleTextInputChangeText}
          defaultValue={this.props.defaultValue}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder={intl.formatMessage(messages.placeholder)}
        />
      </View>
    );
  }
}

export default withMutation(
  withIntl(withTheme(EditorPageTitle)),
  graphql`
    mutation EditorPageTitleMutation($input: SetPageTitleInput!) {
      setPageTitle(input: $input) {
        page {
          id
        }
      }
    }
  `,
);
