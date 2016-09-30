import React, { PropTypes } from 'react';

const UniqueInput = ({ submit, btnLabel }) => {
  let contentNode = null;
  const onSubmit = (e) => {
    e.preventDefault();

    const content = contentNode.value.trim();
    if (!content) return;
    submit(content);
    contentNode.value = '';
  };


  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        ref={node => { contentNode = node; }}
      />
      <button type="submit">
        { btnLabel || 'Submit' }
      </button>
    </form>
  );
};

UniqueInput.propTypes = {
  submit: PropTypes.func.isRequired,
  btnLabel: PropTypes.string,
};

export default UniqueInput;
