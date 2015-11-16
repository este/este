export const FETCH_ME_ERROR = 'FETCH_ME_ERROR';
export const FETCH_ME_START = 'FETCH_ME_START';
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';

export function fetchMe({location, params}) {

  return ({fetch, credentialsStore}) => {
    console.log('running fetch me', credentialsStore.get('authToken'))
    return {
      type: 'FETCH_ME',
      payload: {
        // We can use location and params to create custom endpoint.
        promise: fetch('api/v1/user/me', {
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'authToken': credentialsStore.get('authToken')},
          method: 'get'
        })
          .then(response => response.json())
      }
    }
  };
}
