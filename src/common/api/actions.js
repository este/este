/* eslint-disable no-undef */
import 'isomorphic-fetch';

export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';

export function fetchMovies() {
  return () => ({
    type: 'FETCH_MOVIES',
    payload: fetch('/api/movies').then(res => res.json())
  });
}
