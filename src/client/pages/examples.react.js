import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import Editable from '../components/editable.react';
import Promise from 'bluebird';
import React from 'react';
import {msg} from '../intl/store';

class Examples extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editableState: null,
      editableText: 'Editable textarea component. Click to edit. '
    };
  }

  render() {
    return (
      <DocumentTitle title={msg('examples.title')}>
        <div className="examples-page">
          <h2>editable.react.js</h2>
          <Editable
            disabled={false}
            id="1"
            name="example"
            onSave={(id, name, value) => {
              return Promise.resolve(id, name, value)
                .then(() => this.setState({editableText: value}));
            }}
            onState={(id, name, state) => this.setState({editableState: state})}
            state={this.state.editableState}
            text={this.state.editableText}
            type="textarea"
          />
        </div>
      </DocumentTitle>
    );
  }

}

export default Examples;
