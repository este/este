// @flow
import * as React from 'react';
import TextInput from './core/TextInput';
import withMutation from './core/withMutation';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import * as validations from '../validations';
import { pipe } from 'ramda';
import SetPageTitleMutation, {
  type SetPageTitleCommit,
  type SetPageTitleErrors,
} from '../mutations/SetPageTitleMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PageTitle.graphql';
import withStore, { type Store } from './core/withStore';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'page title',
    id: 'pageTitle.textInput.placeholder',
  },
});

type PageTitleProps = {|
  data: generated.PageTitle,
  commit: SetPageTitleCommit,
  intl: IntlShape,
  store: Store,
|};

type PageTitleState = {|
  errors: SetPageTitleErrors,
|};

class PageTitle extends React.PureComponent<PageTitleProps, PageTitleState> {
  state = {
    errors: null,
  };

  handleTextInputChangeText = (text: string) => {
    this.props.store(store => {
      const record = store.get(this.props.data.id);
      if (!record) return;
      record.setValue(text, 'draftTitle');
    });
  };

  handleTextInputChangeTextThrottled = value => {
    const input = {
      id: this.props.data.id,
      title: value,
    };
    const errors = validations.validateSetPageTitle(input);
    this.setState({ errors });
    if (errors == null) this.props.commit(input);
  };

  render() {
    const { data, intl } = this.props;
    const { errors } = this.state;
    return (
      <TextInput
        error={errors && errors.title}
        size={1}
        value={data.draftTitle}
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
    withMutation(SetPageTitleMutation),
  )(PageTitle),
  graphql`
    fragment PageTitle on Page {
      id
      title @__clientField(handle: "draft")
      draftTitle
    }
  `,
);
