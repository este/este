import DocumentTitle from 'react-document-title';
import NewTodo from '../todos/newtodo.react';
import React from 'react';
import TodoList from '../todos/todolist.react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import {addHundredTodos, clearAll} from '../todos/actions';
import {getNewTodo, getTodos} from '../todos/store';
import {msg} from '../intl/store';
import {state} from '../state';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('./todos.styl');

// Naïve undo implementation.
// TODO: Reimplement it.
const undoStates = [];

export default class Todos extends React.Component {

  componentDidMount() {
    state.on('change', this.onStateChange);
    document.addEventListener('keypress', this.onDocumentKeypress);
  }

  componentWillUnmount() {
    state.removeListener('change', this.onStateChange);
    document.removeEventListener('keypress', this.onDocumentKeypress);
  }

  onStateChange(newState) {
    undoStates.push(newState);
  }

  onDocumentKeypress(e) {
    // Press shift+ctrl+s to save app state and shift+ctrl+l to load.
    if (!e.shiftKey || !e.ctrlKey) return;
    switch (e.keyCode) {
      case 19:
        window._appState = state.save();
        window._appStateString = JSON.stringify(window._appState);
        /*eslint-disable no-console */
        console.log('App state saved');
        console.log('Copy the state to your clipboard by calling copy(_appStateString),');
        console.log('or type _appState and press enter');
        /*eslint-enable */
        break;
      case 12:
        const stateStr = window.prompt('Paste the serialized state into the input'); // eslint-disable-line no-alert
        const newState = JSON.parse(stateStr);
        if (!newState) return;
        state.load(newState);
        break;
    }
  }

  undo() {
    undoStates.pop();
    state.set(undoStates.pop());
  }

  render() {
    // This is just a demo. In real app you would set first undo elsewhere.
    if (!undoStates.length) undoStates.push(state.get());

    // This is composite component. It load its data from store, and passes them
    // through props, so NewTodo and TodoList can leverage PureComponent.
    const newTodo = getNewTodo();
    const todos = getTodos();

    return (
      <DocumentTitle title={msg('todos.title')}>
        <section className="todos">
          <NewTodo todo={newTodo} />
          <TodoList todos={todos} />
          <div className="buttons">
            <button
              children={msg('todos.clearAll')}
              disabled={!todos.size}
              onClick={clearAll}
            />
            <button
              children={msg('todos.add100')}
              onClick={addHundredTodos}
            />
            <button
              disabled={undoStates.length === 1}
              onClick={() => this.undo()}
            ><FormattedMessage
              message={msg('todos.undo')}
              steps={undoStates.length - 1}
            /></button>
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
            <li>
              <a href="https://github.com/ftlabs/fastclick">ftlabs/fastclick
              </a> to remove click delays on browsers with touch UIs.
            </li>
            <li>
              <a href="http://formatjs.io">formatjs.io</a> localization with <a href="https://github.com/andyearnshaw/Intl.js">
              polyfill</a> for browsers without native Intl.
            </li>
            <li>... and much more.</li>
          </ul>
        </section>
      </DocumentTitle>
    );
  }

}
