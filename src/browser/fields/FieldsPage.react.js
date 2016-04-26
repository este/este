import './FieldsPage.scss';
import Component from 'react-pure-render/component';
import DynamicField from './DynamicField.react.js';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

const messages = defineMessages({
  h2: {
    defaultMessage: 'redux-fields demonstration',
    id: 'fields.page.h2'
  },
  p: {
    defaultMessage: 'Something like redux-form but simplified.',
    id: 'fields.page.p'
  }
});

class FieldsPage extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    fieldsPageModel: PropTypes.object,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    /* eslint-disable no-alert, no-console */
    e.preventDefault();
    const { fields, fieldsPageModel } = this.props;
    alert('Check developer console.');
    // For simple flat forms we can use handy fields.$values() helper.
    console.log(fields.$values());
    // For complex nested forms we can get whole model via redux connect.
    console.log(fieldsPageModel && fieldsPageModel.toJS());
    // Reset all fieldsPage fields, even nested.
    fields.$reset();
    /* eslint-enable no-alert, no-console */
  }

  render() {
    const { fields, fieldsPageModel, intl } = this.props;

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

    return (
      <div className="fields-page">
        <Helmet title={intl.formatMessage(linksMessages.fields)} />
        <h2>
          <FormattedMessage {...messages.h2} />
        </h2>
        <p>
          <FormattedMessage {...messages.p} />
        </p>
        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <h3>Some Field</h3>
            <input
              {...fields.someField}
              maxLength={100}
              type="text"
            />
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
            <div>
              <button type="submit">Submit</button>
            </div>
            <pre>
              {
                fieldsPageModel &&
                JSON.stringify(fieldsPageModel.toJS(), null, 2)
              }
            </pre>
          </fieldset>
        </form>
      </div>
    );
  }

}

FieldsPage = injectIntl(FieldsPage);

FieldsPage = fields(FieldsPage, {
  path: 'fieldsPage',
  fields: [
    'someField',
    'hasCar',
    'hasBike',
    'gender',
    'selectedNumber'
  ],
  // With getInitialState we can set any initial value easily.
  // Use fields.$reset() to reset whole fieldsPage model.
  getInitialState: () => ({
    // someField: '123',
    // hasCar: true,
    gender: 'male',
    selectedNumber: '2'
  })
});

export default connect(state => ({
  fieldsPageModel: state.reduxFields.get('fieldsPage')
}))(FieldsPage);

