export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_STATUS_BAR = 'TOGGLE_STATUS_BAR';
export const HIDE_STATUS_BAR = 'HIDE_STATUS_BAR';
export const SHOW_STATUS_BAR = 'SHOW_STATUS_BAR';

export function toggleMenu() {
  return {
    type: TOGGLE_MENU
  };
}

export function toggleStatusBar() {
  return {
    type: TOGGLE_STATUS_BAR
  };
}

export function hideStatusBar() {
  return {
    type: HIDE_STATUS_BAR
  };
}

export function showStatusBar() {
  return {
    type: SHOW_STATUS_BAR
  };
}
