// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostParents.graphql';
import Row from './core/Row';
import A from './core/A';

type PostParentsProps = {|
  data: generated.PostParents,
|};

class PostParents extends React.PureComponent<PostParentsProps> {
  render() {
    const { parents } = this.props.data;
    if (!parents) return null;
    return (
      <Row>
        {parents.map(post => (
          <A
            size={-1}
            href={{ pathname: '/post', query: { id: post.id } }}
            key={post.id}
          >
            {post.name}
          </A>
        ))}
      </Row>
    );
  }
}

export default createFragmentContainer(
  PostParents,
  graphql`
    fragment PostParents on Post {
      parents {
        id
        name
      }
    }
  `,
);
