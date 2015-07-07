import {List} from 'immutable';

// .merge and .mergeDeep do not concat list values resulting in the
// initialstate.js array values being completely overwritten by the given
// user state instead of being merged.
// https://github.com/facebook/immutable-js/issues/406#issuecomment-85759958
export default function merger(a, b) {
  if (List.isList(a) && List.isList(b))
    return a.concat(b);

  if (a && a.mergeWith)
    return a.mergeWith(merger, b);

  return b;
}
