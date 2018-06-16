// @flow
import * as React from 'react';
import { View, TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import withMutation, { type Commit } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/EditorPageTitleMutation.graphql';

type EditorPageTitleProps = {|
  theme: Theme,
  pageId: string,
  defaultValue: string,
  commit: Commit<
    generated.SetPageTitleInput,
    generated.EditorPageTitleMutationResponse,
  >,
|};

class EditorPageTitle extends React.PureComponent<EditorPageTitleProps> {
  handleTextInputChangeText = value => {
    const input = {
      id: this.props.pageId,
      title: value,
    };
    // TODO: rate-limit
    this.props.commit(input);
  };

  render() {
    const { theme } = this.props;

    return (
      <View>
        <TextInput
          style={[
            theme.styles.heading,
            theme.typography.fontSizeWithLineHeight(1),
          ]}
          onChangeText={this.handleTextInputChangeText}
          defaultValue={this.props.defaultValue}
          // placeholderTextColor={theme.placeholderTextColor}
          // placeholder={intl.formatMessage(messages.placeholder)}
        />
      </View>
    );
  }
}

export default withMutation(
  withTheme(EditorPageTitle),
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
