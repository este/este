import DocumentTitle from 'react-document-title';
import NewTodo from '../todos/newtodo.react';
import React from 'react';
import TodoList from '../todos/todolist.react';
import {Link} from 'react-router';
import {addHundredTodos, clearAll} from '../todos/actions';
import {msg} from '../intl/store';
import {state} from '../state';
import PureComponent from '../components/purecomponent.react';
import {Map} from 'immutable';
import '../todos/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('./todos.styl');

export default class Todos extends PureComponent {

  componentDidMount() {
    document.addEventListener('keypress', this.onDocumentKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onDocumentKeypress);
  }

  onDocumentKeypress(e) {
    // Press shift+ctrl+s to save app state and shift+ctrl+l to load.
    if (!e.shiftKey || !e.ctrlKey) return;
    switch (e.keyCode) {
      case 19:
        window._appState = state.save();
        window._appStateString = JSON.stringify(window._appState);
        /*eslint-disable no-console */
        console.log('app state saved');
        console.log('copy the state to your clipboard by calling copy(_appStateString)');
        console.log('or type _appState and press enter');
        /*eslint-enable */
        break;
      case 12:
        const stateStr = window.prompt('Path the serialized state into the input'); // eslint-disable-line no-alert
        const newState = JSON.parse(stateStr);
        if (!newState) return;
        state.load(newState);
        break;
    }
  }

  render() {
    // This is composite component. It load its data from store, and passes them
    // through props, so NewTodo and TodoList can leverage PureComponent.
    const newTodo = this.props.appState.getIn(['newTodo']);
    const todos = this.props.appState.getIn(['todos']);

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
          </div>
          <h3>
            Things to Check
          </h3>
          <ul>
            <li>View page source, take a look how app is server rendered with initial data.</li>
            <li>Open console, take a look how actions are logged from <code>src/client/dispatcher.js</code>.</li>
            <li>
              Development mode (<code>gulp</code>), try livereload styles or <a href="https://www.youtube.com/watch?v=pw4fKkyPPg8">
              live-editing</a> React components without app refresh.
            </li>
            <li>
              Production mode (<code>gulp -p</code>), to check built app performance and size.
            </li>
            <li>
              Isomorphic <Link to="/this-is-not-the-web-page-you-are-looking-for">
              404</Link> page.
            </li>
            <li>
              Global immutable app state, have you seen this <a href="https://www.youtube.com/watch?v=5yHFTN-_mOo">
              video</a>? Try <b>shift+ctrl+s</b> to save app state, and <b>
              shift+ctrl+l</b> to reload.
            </li>
            <li>
                <a href="http://facebook.github.io/react/docs/advanced-performance.html">
                Advanced performance</a> with <a href="http://facebook.github.io/react/docs/pure-render-mixin.html">PureRenderMixin</a>.
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

Todos.propTypes = {
  appState: React.PropTypes.instanceOf(Map)
};
