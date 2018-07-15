// @flow
import * as React from 'react';
import PostText, { messages as postTextMessages } from './PostText';
import PostActions from './PostActions';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostChild.graphql';
import { View } from 'react-native';
import getFocusableNodes from '../../client/getFocusableNodes';
import withStore, { type Store } from '../core/withStore';
import { injectIntl, type IntlShape } from 'react-intl';
import { pipe } from 'ramda';

type PostChildProps = {|
  data: generated.PostChild,
  store: Store,
  intl: IntlShape,
|};

type PostChildState = {|
  postActionsExpanded: boolean,
  postActionsShowReuse: boolean,
|};

class PostChild extends React.PureComponent<PostChildProps, PostChildState> {
  static focusFirst({ current }) {
    if (current == null) return;
    const first = getFocusableNodes(current)[0];
    if (first) first.focus();
  }

  postChildRef = React.createRef();

  postChildActionsRef = React.createRef();

  state = {
    postActionsExpanded: false,
    postActionsShowReuse: false,
  };

  // onFocus bubbles in React
  handlePostChildFocus = () => {
    this.setState({ postActionsExpanded: false });
  };

  handlePostTextSelectionChange = selection => {
    const selectionIsCollapsed = selection.start === selection.end;
    this.setState({ postActionsShowReuse: !selectionIsCollapsed });
  };

  handlePostActionsAction = action => {
    switch (action.type) {
      case 'EXPAND':
        this.handleExpandAction(action.value);
        break;
      case 'EXAMPLE':
        this.handleExampleAction();
        break;
      case 'REUSE':
        this.handleReuseAction();
        break;
      case 'MOVE':
        this.handleMoveAction();
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
  };

  handleExampleAction() {
    this.props.store(store => {
      const record = store.get(this.props.data.id);
      if (!record) return;
      // getValue returns mixed type.
      // https://twitter.com/estejs/status/1018113850875564032
      // It's string, because of createRelayEnvironment handlerProvider, but we
      // people make mistakes, so we have to ensure it via Flow type refinement.
      let draftText = record.getValue('draftText');
      if (typeof draftText !== 'string') draftText = ''; // Now it's string.
      const maybeNewLine = draftText.length > 0 ? '\n' : '';
      const example = this.props.intl
        .formatMessage(postTextMessages.example)
        // Trim because of accidental `...` newlines in messages.
        .trim();
      const newDraftText = `${draftText}${maybeNewLine}${example}`;
      record.setValue(newDraftText, 'draftText');
      PostChild.focusFirst(this.postChildRef);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleReuseAction() {
    // console.log('reuse');
  }

  // eslint-disable-next-line class-methods-use-this
  handleMoveAction() {
    // console.log('move');
  }

  handleExpandAction(expand) {
    this.setState({ postActionsExpanded: expand }, () => {
      PostChild.focusFirst(
        expand ? this.postChildActionsRef : this.postChildRef,
      );
    });
  }

  renderByType(data) {
    switch (data.type) {
      case 'TEXT':
        return (
          // $FlowFixMe https://github.com/facebook/relay/issues/2316
          <PostText
            data={data}
            onSelectionChange={this.handlePostTextSelectionChange}
          />
        );
      case 'IMAGE':
        return null;
      case 'CHILDREN':
        return null;
      // return (
      //   data.children != null &&
      //   data.children.map(child => <PostChild data={child} key={child.id} />)
      // );
      default:
        // eslint-disable-next-line no-unused-expressions
        (data.type: empty);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <>
        <View ref={this.postChildRef} onFocus={this.handlePostChildFocus}>
          {this.renderByType(data)}
        </View>
        <PostActions
          ref={this.postChildActionsRef}
          expanded={this.state.postActionsExpanded}
          showReuse={this.state.postActionsShowReuse}
          onAction={this.handlePostActionsAction}
        />
      </>
    );
  }
}

export default createFragmentContainer(
  pipe(
    injectIntl,
    withStore,
  )(PostChild),
  graphql`
    fragment PostChild on Post {
      id
      type
      ...PostText
    }
  `,
);
