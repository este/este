/* eslint-disable no-undef */
import 'isomorphic-fetch';

export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_RESERVATIONS_SUCCESS = 'FETCH_RESERVATIONS_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export function fetchMovies(name) {
  return () => ({
    type: 'FETCH_MOVIES',
    payload: fetch(`/api/movies?name=${name || ''}`).then(res => res.json())
  });
}

export function fetchReservations() {
  return () => ({
    type: 'FETCH_RESERVATIONS',
    payload: fetch('/api/reservations').then(res => res.json())
  });
}

export function fetchUser() {
  return () => ({
    type: 'FETCH_USER',
    payload: fetch('/api/user').then(res => res.json())
  });
}
