import React, { PropTypes } from 'react';

const IndexedPicker = ({ selectedIndex, onChange, options, getLabel }) => {
  const getOptionLabel = option => getLabel ? getLabel(option) : (option.value || option.id);

  return (
    <span>
      <h1>{getOptionLabel(options[selectedIndex])}</h1>
      <select
        onChange={e => onChange(e.target.value)}
        value={selectedIndex}
      >
        {options.map(option => {
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
