/* eslint-disable jsx-a11y/label-has-for */
import './FieldsPage.scss';
import DynamicField from './DynamicField.react.js';
import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import classnames from 'classnames';
import linksMessages from '../../common/app/linksMessages';
import { FieldError } from '../app/components';
import { FormattedMessage, defineMessages } from 'react-intl';
import { ValidationError } from '../../common/lib/validation';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

const messages = defineMessages({
  h2: {
    defaultMessage: 'Fields',
    id: 'fields.page.h2',
  },
  p: {
    defaultMessage: 'Something like redux-form but simplified and universal.',
    id: 'fields.page.p',
  },
});

// Just an example of some dynamically loaded data.
// cato.org/publications/commentary/key-concepts-libertarianism
const keyConceptsOfLibertarianism = [
  'Individualism',
  'Individual Rights',
  'Spontaneous Order',
  'The Rule of Law',
  'Limited Government',
  'Free Markets',
  'The Virtue of Production',
  'Natural Harmony of Interests',
  'Peace',
].map((concept, index) => ({
  id: index,
  name: concept,
}));

class FieldsPage extends Component {

  static propTypes = {
    // Generated fields by fields higher order component.
    fields: PropTypes.object.isRequired,
    // We can read anything from fields model directly.
    fieldsPageModel: PropTypes.object,
  };

  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    // For a demo, we can store the state in the component.
    this.state = {
      disabled: false,
      error: null,
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { fields } = this.props;
    const values = fields.$values();

    // This is just a demo. Check src/common/auth flow for the real usage.

    // Disable form now.
    this.setState({ disabled: true });

    // Simulate async action.
    setTimeout(() => {
      this.setState({ disabled: false });
      const isValid = values.someField.trim();
      if (!isValid) {
        const error = new ValidationError('required', { prop: 'someField' });
        this.setState({ error });
        return;
      }
      this.setState({ error: null });
      fields.$reset();
    }, 1000);
  }

  onToggleClick() {
    const { fields } = this.props;
    fields.$setValue('toggled', !fields.toggled.value);
  }

  render() {
    const { fields, fieldsPageModel } = this.props;
    const { disabled, error } = this.state;

    return (
      <div className="fields-page">
        <FormattedMessage {...linksMessages.fields}>
          {message =>
            <Helmet title={message} />
          }
        </FormattedMessage>
        <h2>
          <FormattedMessage {...messages.h2} />
        </h2>
        <p>
          <FormattedMessage {...messages.p} />
        </p>
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={disabled}>
            <h3>Some Field</h3>
            <input
              {...fields.someField}
              maxLength={100}
              type="text"
            />
            <FieldError error={error} prop="someField" />
            <h3>Dynamic Fields</h3>
            <div>
              {keyConceptsOfLibertarianism.map(concept =>
                <DynamicField item={concept} key={concept.id} />
              )}
            </div>
            <h3>Checkboxes</h3>
            <label>
              <input
                {...fields.hasCar}
                checked={fields.hasCar.value}
                type="checkbox"
              /> Has Car
            </label>
            <label>
              <input
                {...fields.hasBike}
                checked={fields.hasBike.value}
                type="checkbox"
              /> Has Bike
            </label>
            <h3>Radios</h3>
            <label>
              <input
                {...fields.gender}
                checked={fields.gender.value === 'male'}
                type="radio"
                value="male"
              /> Male
            </label>
            <label>
              <input
                {...fields.gender}
                checked={fields.gender.value === 'female'}
                type="radio"
                value="female"
              /> Female
            </label>
            <label>
              <input
                {...fields.gender}
                checked={fields.gender.value === 'other'}
                type="radio"
                value="other"
              /> Other
            </label>
            <h3>Select</h3>
            <select {...fields.selectedNumber}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            {/*
              Why no multiple select? Because users are not familiar with that.
              Use checkboxes or custom checkable dynamic fields instead.
            */}
            <h3>Custom</h3>
            <div
              className={classnames('custom-toggle', {
                toggled: fields.toggled.value,
              })}
              onClick={this.onToggleClick}
            >Toggle me!</div>
            <div>
              <button type="submit">
                <FormattedMessage {...buttonsMessages.submit} />
              </button>
            </div>
            <pre>
              {fieldsPageModel &&
                JSON.stringify(fieldsPageModel.toJS(), null, 2)
              }
            </pre>
          </fieldset>
        </form>
      </div>
    );
  }

}

FieldsPage = fields(FieldsPage, {
  path: 'fieldsPage',
  fields: [
    'someField',
    'hasCar',
    'hasBike',
    'gender',
    'selectedNumber',
    'toggled',
  ],
  getInitialState: () => ({
    // someField: '123',
    // hasCar: true,
    gender: 'male',
    selectedNumber: '2',
    toggled: false,
  }),
});

// Connect is not required. It's just a demonstration of nested fields state.
export default connect(state => ({
  fieldsPageModel: state.fields.get('fieldsPage'),
}))(FieldsPage);
