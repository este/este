// @flow
import * as React from 'react';
import PostText from './PostText';
import PostActions from './PostActions';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostChild.graphql';
import { View } from 'react-native';
import getFocusableNodes from '../client/getFocusableNodes';
import withStore, { type Store } from './core/withStore';
import { injectIntl, type IntlShape } from 'react-intl';
import { pipe } from 'ramda';

type PostChildProps = {|
  data: generated.PostChild,
  store: Store,
  intl: IntlShape,
|};

type PostChildState = {|
  postActionsExpanded: boolean,
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
  };

  // onFocus bubbles in React
  handlePostChildFocus = () => {
    this.setState({ postActionsExpanded: false });
  };

  handlePostActionsAction = action => {
    switch (action.type) {
      case 'EXPAND':
        this.handleExpandAction(action.value);
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

  static renderByType(data) {
    switch (data.type) {
      case 'TEXT':
        return (
          // $FlowFixMe https://github.com/facebook/relay/issues/2316
          <PostText data={data} />
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
          {PostChild.renderByType(data)}
        </View>
        <PostActions
          ref={this.postChildActionsRef}
          expanded={this.state.postActionsExpanded}
          showReuse={false}
          // showReuse={
          //   data.draftTextSelectionStart !== data.draftTextSelectionEnd
          // }
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
      # id
      type
      ...PostText
    }
  `,
);
