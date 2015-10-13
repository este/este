// export const HIDE_STATUS_BAR = 'HIDE_STATUS_BAR';
// export const SHOW_STATUS_BAR = 'SHOW_STATUS_BAR';
export const ON_SIDE_MENU_CHANGE = 'ON_SIDE_MENU_CHANGE';
export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU';
// export const TOGGLE_STATUS_BAR = 'TOGGLE_STATUS_BAR';

// export function hideStatusBar() {
//   return {
//     type: HIDE_STATUS_BAR
//   };
// }

// export function showStatusBar() {
//   return {
//     type: SHOW_STATUS_BAR
//   };
// }

export function onSideMenuChange(isOpen) {
  return {
    type: ON_SIDE_MENU_CHANGE,
    payload: {isOpen}
  };
}

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}

// export function toggleStatusBar() {
//   return {
//     type: TOGGLE_STATUS_BAR
//   };
// }
