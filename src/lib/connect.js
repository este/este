import {createSelector} from 'reselect';
import assign from 'lodash.assign';
import {connect} from 'react-redux';

export default function mergeSelectors(...selectors) {
  const mapStateToProps = createSelector(selectors, (...output) => {
    return assign({}, ...output);
  });
  return connect(mapStateToProps);
}
