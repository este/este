import Promise from 'bluebird';

//import {canUseDOM} from 'exenv';

export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS';
export const PROFILE_LOAD_ERROR = 'PROFILE_LOAD_ERROR';

const get = (fetch, endpoint) => {
  console.log('profile/actions get endpoint', endpoint);
  return fetch(endpoint, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      method: 'get'
    })
    .then(response => {
      if (response.status === 200) return response.json();
      throw response;
    });
}



export function loadProfile({location, params, req}) {
  //if (canUseDOM) {
  //  console.log('profile/actions loadProfile Exiting early, data already loaded on server...');
  //  return;
  //}

  let {pathname} = location;
  const pathArray = pathname.split('/');
  if (pathArray.length === 3)
    pathArray.push('bio');
  pathArray.shift();
  pathArray.unshift('json');
  // if just /profile/SomeUser

  let endpoint = '/' + pathArray.join('/') + '.json';

  if (req)
    endpoint = req.protocol + '://' + req.get('host') + endpoint;

  return ({fetch, validate}) => ({
    types: [
      PROFILE_LOAD,
      PROFILE_LOAD_SUCCESS,
      PROFILE_LOAD_ERROR
    ],
    payload: {
      promise: get(fetch, endpoint)
        .catch(response => {
          throw response;
        })
    }
  });
}
