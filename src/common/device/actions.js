export const SET_PLATFORM = 'SET_PLATFORM';

export function setPlatform(platform) {
  return {
    type: SET_PLATFORM,
    payload: { platform }
  };
}
