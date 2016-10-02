import React, { PropTypes } from 'react';

const NULL_INDEX = 'NULL_INDEX';

const IndexedPicker = ({ selectedIndex, onChange, options, getLabel }) => {
  const getOptionLabel = option => {
    let label = 'Nothing selected';
    if (option) {
      label = getLabel ? getLabel(option) : (option.value || option.id);
    }
    return label;
  };

  const selectOptions = options.length ?
    options
    :
  [
    {
      id: NULL_INDEX,
      value: 'No items',
    },
  ];

  const selectDisabled = !(options.length > 0);

  const selectChange = (e) => {
    const index = e.target.value;
    if (index === NULL_INDEX) {
      onChange(null);
    } else {
      onChange(index);
    }
  };

  return (
    <span>
      <select
        onChange={selectChange}
        value={selectedIndex}
        disabled={selectDisabled}
      >
        {
          selectOptions.map(option => {
            const index = option.id || NULL_INDEX;
            const label = getOptionLabel(option);
            return (
              <option value={index} key={index} disabled={option.disabled || false}>
                { label }
              </option>
            );
          })
        }
      </select>
    </span>
  );
};

IndexedPicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  selectedIndex: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getLabel: PropTypes.func,
};

export default IndexedPicker;
