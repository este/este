export const SET_DEVICE = 'SET_DEVICE';

export function setDevice(device) {
  return {
    type: SET_DEVICE,
    payload: device,
  };
}
