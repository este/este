import React, { PropTypes } from 'react';

const IndexedPicker = ({ selectedIndex, onChange, options, getLabel }) => {
  const getOptionLabel = option =>
  {
    let label = 'Nothing selected';
    if (option) {
      label = getLabel ? getLabel(option) : (option.value || option.id);
    }
    return label;
  };

  const selectOptions = options.length ?
    options :
  [
    {
      id: 0,
      value: 'No items',
    },
  ];

  const selectDisabled = !(options.length > 0);

  return (
    <span>
      <select
        onChange={e => onChange(e.target.value)}
        value={selectedIndex}
        disabled={selectDisabled}
      >
        {
          selectOptions.map(option => {
            const index = option.id;
            const label = getOptionLabel(option);
            return (
              <option value={index} key={index}>
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
