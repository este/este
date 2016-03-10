import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import NewTodo from './NewTodo.react';
import React from 'react';
import Todos from './Todos.react';
import fetch from '../../common/components/fetch';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { fetchUserTodos } from '../../common/todos/actions';

const messages = defineMessages({
  title: {
    defaultMessage: 'Todos',
    id: 'todos.page.title'
  }
});


class Page extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);

    return (
      <div className="todos-page">
        <Helmet title={title} />
        <NewTodo />
        <Todos />
        <Buttons />
      </div>
    );
  }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default injectIntl(Page);
