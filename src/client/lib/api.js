import axios from 'axios';

const HOST = 'http://localhost:8000';

export function get(url, viewer, host=HOST) {
  return axios({
    url: host + url,
    headers: {
      'authorization': viewer ? JSON.stringify(viewer) : ''
    }
  });
}

export function post(url, viewer, data, host=HOST) {
  return axios({
    method: 'post',
    data: data,
    url: host + url,
    headers: {
      'authorization': viewer ? JSON.stringify(viewer) : ''
    }
  });
}
