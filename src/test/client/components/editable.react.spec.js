import Editable from 'client/components/editable.react';
import React from 'react/addons';
import {expect} from 'chai';
import {render} from 'test/utils';

describe('Editable', () => {
  it('should render default view', () => {
    const component = render(
      <Editable
        // These props are required. We can't test warnings yet.
        id="1"
        name="foo"
        onSave={() => {}}
        onState={() => {}}
        text="a"
      />
    );

    expect(component.type).to.equal('div');
    expect(component.props.className).to.equal('editable view');

    // TODO: JSON.stringify is verbose, but to.deep.equal does't work with
    // shallow rendering for some reason, or it doesn't provide diff.
    expect(JSON.stringify(component.props.children)).to.equal(JSON.stringify([
      <span>a</span>,
      false
    ]));
  });

  // TODO: Add more tests.
});
