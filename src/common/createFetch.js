import URI from 'urijs';
import isomorphicFetch from 'isomorphic-fetch';

// Server and react-native need full url with server address.
function ensureAbsoluteUrl(webAddr, input) {
  if (typeof input !== 'string') return input;
  if (URI(input).is('absolute')) return input;
  return URI(webAddr + input).normalize().toString();
}

// Simple wrapper making isomorphic-fetch universal.
export default function createFetch(webAddr) {
  return (input, init) => {
    input = ensureAbsoluteUrl(webAddr, input);
    return isomorphicFetch(input, init);
  };
}
