import * as actions from '../todos/actions';
import DocumentTitle from 'react-document-title';
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {Link} from 'react-router';
import {msg} from '../intl/store';

// import {FormattedMessage} from 'react-intl';
// import {state} from '../state';

// Leverage webpack require goodness.
require('./todos.styl');

// Naïve undo implementation.
// TODO: Reimplement it.
// const undoStates = [];

class Todos extends PureComponent {

  // componentDidMount() {
  //   state.on('change', this.onStateChange);
  //   document.addEventListener('keypress', this.onDocumentKeypress);
  // }

  // componentWillUnmount() {
  //   state.removeListener('change', this.onStateChange);
  //   document.removeEventListener('keypress', this.onDocumentKeypress);
  // }

  // onStateChange(newState) {
  //   undoStates.push(newState);
  // }

  // undo() {
  //   undoStates.pop();
  //   state.set(undoStates.pop());
  // }

  render() {
    // if (!undoStates.length) undoStates.push(state.get());
    const newTodo = this.props.todos.get('newTodo');
    const todos = this.props.todos.get('list');

    return (
      <DocumentTitle title={msg('todos.title')}>
        <section className="todos-page">
          <NewTodo todo={newTodo} />
          <List todos={todos} />
          <div className="buttons">
            <button
              children={msg('todos.clearAll')}
              disabled={!todos.size}
              onClick={actions.clearAll}
            />
            <button
              children={msg('todos.add100')}
              onClick={actions.addHundredTodos}
            />
            {/*<button
              disabled={undoStates.length === 1}
              onClick={() => this.undo()}
            ><FormattedMessage
              message={msg('todos.undo')}
              steps={undoStates.length - 1}
            /></button>*/}
          </div>
          <h3>
            Things to Check
          </h3>
          <ul>
            <li>
              View page source, take a look how HTML is server rendered with
              initial data.
            </li>
            <li>Open console, take a look how actions are logged from <code>src/client/dispatcher.js</code>.</li>
            <li>
              Development mode (<code>gulp</code>), try edit styles or
              react component to see <a href="https://www.youtube.com/watch?v=pw4fKkyPPg8">
              live-editing</a> without app reload.
            </li>
            <li>
              Production mode (<code>gulp -p</code>), to check built app performance and size.
            </li>
            <li>
              Isomorphic <Link to="/this-is-not-the-web-page-you-are-looking-for">
              404</Link> page.
            </li>
            <li>Undo button.</li>
            <li>
              Global immutable app state, have you seen this <a href="https://www.youtube.com/watch?v=5yHFTN-_mOo">
              video</a>? Try <b>ctrl+shift+s</b> to save app state, and <b>
              ctrl+shift+l</b> to load.
            </li>
            <li>
                <a href="http://facebook.github.io/react/docs/advanced-performance.html">
                Advanced performance</a> with PureComponent. Always use PureComponent
                and everything will be faster and simpler.
              </li>
            <li>... and much more.</li>
          </ul>
        </section>
      </DocumentTitle>
    );
  }

}

Todos.propTypes = {
  todos: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Todos;
