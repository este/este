// @flow
import * as React from 'react';
import PostText from './PostText';
import PostActions from './PostActions';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostChild.graphql';
import { View } from 'react-native';
import getFocusableNodes from '../../client/getFocusableNodes';

type PostChildProps = {|
  data: generated.PostChild,
|};

type PostChildState = {|
  postActionsExpanded: boolean,
  postActionsReuseButton: boolean,
|};

class PostChild extends React.PureComponent<PostChildProps, PostChildState> {
  postChildRef = React.createRef();

  postChildActions = React.createRef();

  state = {
    postActionsExpanded: false,
    postActionsReuseButton: false,
  };

  handlePostActionsExpand = (expand: boolean) => {
    this.setState({ postActionsExpanded: expand }, () => {
      if (expand) {
        this.focusFirstPostChildActionsButton();
      } else {
        this.focusFirstPostChild();
      }
    });
  };

  // onFocus bubbles in React
  handlePostChildFocus = () => {
    this.setState({ postActionsExpanded: false });
  };

  handlePostActionsExample = () => {
    // TODO: Need to decide whether it should be controlled component or not.
    //   this.setState(prevState => {
    //     // Trim and \n for normalized lines.
    //     const example = this.props.intl.formatMessage(messages.example).trim();
    //     const value =
    //       prevState.value.length === 0
    //         ? example
    //         : `${prevState.value}\n${example}`;
    //     return { value: `${value}` };
  };

  handlePostActionsReuse = () => {};

  handlePostActionsMove = () => {};

  handlePostTextSelectionChange = selection => {
    const selectionIsCollapsed = selection.start === selection.end;
    this.setState({ postActionsReuseButton: !selectionIsCollapsed });
  };

  focusFirstPostChild() {
    const { current } = this.postChildRef;
    if (current == null) return;
    const first = getFocusableNodes(current)[0];
    if (first) first.focus();
  }

  focusFirstPostChildActionsButton() {
    const { current } = this.postChildActions;
    if (current == null) return;
    const first = getFocusableNodes(current)[0];
    if (first) first.focus();
  }

  renderByType(post) {
    const { type } = post;
    switch (type) {
      case 'TEXT':
        return (
          <PostText
            id={post.id}
            defaultValue={post.text}
            onSelectionChange={this.handlePostTextSelectionChange}
          />
        );
      case 'IMAGE':
        return null;
      case 'CHILDREN':
        return null;
      // return (
      //   post.children != null &&
      //   post.children.map(child => <PostChild data={child} key={child.id} />)
      // );
      default:
        // eslint-disable-next-line no-unused-expressions
        (type: empty);
    }
  }

  render() {
    const { data: post } = this.props;
    return (
      <>
        <View ref={this.postChildRef} onFocus={this.handlePostChildFocus}>
          {this.renderByType(post)}
        </View>
        <PostActions
          ref={this.postChildActions}
          expanded={this.state.postActionsExpanded}
          showReuse={this.state.postActionsReuseButton}
          onExpand={this.handlePostActionsExpand}
          onExample={this.handlePostActionsExample}
          onReuse={this.handlePostActionsReuse}
          onMove={this.handlePostActionsMove}
        />
      </>
    );
  }
}

export default createFragmentContainer(
  PostChild,
  graphql`
    fragment PostChild on Post {
      id
      name
      text
      type
    }
  `,
);
