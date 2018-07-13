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
  postActionsShowReuse: boolean,
|};

class PostChild extends React.PureComponent<PostChildProps, PostChildState> {
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
        // this.handleExampleAction();
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

  // handleExampleAction() {
  //   // commitLocalUpdate(this.props.relay.environment, store => {
  //   //   store.get(this.props.data.id).setValue('example', 'clientText');
  //   // });
  //   // TODO: Need to decide whether it should be controlled component or not.
  //   //   this.setState(prevState => {
  //   //     // Trim and \n for normalized lines.
  //   //     const example = this.props.intl.formatMessage(messages.example).trim();
  //   //     const value =
  //   //       prevState.value.length === 0
  //   //         ? example
  //   //         : `${prevState.value}\n${example}`;
  //   //     return { value: `${value}` };
  // }

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
      const { current } = expand ? this.postChildActionsRef : this.postChildRef;
      if (current == null) return;
      const first = getFocusableNodes(current)[0];
      if (first) first.focus();
    });
  }

  renderByType(post) {
    switch (post.type) {
      case 'TEXT':
        return (
          <PostText
            id={post.id}
            text={post.text}
            clientText={post.clientText}
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
        (post.type: empty);
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
  PostChild,
  graphql`
    fragment PostChild on Post {
      id
      # name
      text
      clientText
      type
    }
  `,
);
