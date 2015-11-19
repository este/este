export const FETCH_ME_ERROR = 'FETCH_ME_ERROR';
export const FETCH_ME_START = 'FETCH_ME_START';
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';

export function fetchMe({location, params}) {

  return ({fetch, persistenceStore}) => {
    return {
      type: 'FETCH_ME',
      payload: {
        promise: fetch('api/v1/user/me', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authToken': persistenceStore.get('authToken')
          },
          method: 'get'
        }).then(response => response.json())
      }
    };
  };
}
