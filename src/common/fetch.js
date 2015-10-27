import isomorphicFetch from 'isomorphic-fetch';
import URI from 'urijs';

const local = 'http://localhost:8000/';

function ensureAbsoluteUrl(input) {
  if (typeof input !== 'string') return input;
  const uri = new URI(input);
  if (uri.is("url") === false) return input;
  return uri.normalize().toString();
}

// Wrapper over isomorphicFetch making relative urls absolute. We don't want
// hardcode fetch urls since they are different when app is deployed or not.
export default function fetch(input, init) {
  input = ensureAbsoluteUrl(input);
  return isomorphicFetch(input, init);
}

