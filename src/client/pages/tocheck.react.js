import PureComponent from '../components/purecomponent.react';
import React from 'react';
import {Link} from 'react-router';

class ToCheck extends PureComponent {

  render() {
    return (
      <div className="tocheck">
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
      </div>
    );
  }

}

export default ToCheck;
