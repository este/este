import isomorphicFetch from 'isomorphic-fetch';
import URI from 'urijs';

function ensureAbsoluteUrl(webAddr, input) {
  if (typeof input !== 'string') return input;
  if (URI(input).is('absolute')) return input;
  return URI(webAddr + input).normalize().toString();
}

export default function createFetch(webAddr) {
  // Wrapper over isomorphicFetch making relative urls absolute. We don't want
  // hardcode fetch urls since they are different when app is deployed or not.
  return function fetch(input, init) {
    input = ensureAbsoluteUrl(webAddr, input);
    return isomorphicFetch(input, init);
  };
}
