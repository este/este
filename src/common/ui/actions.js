export const ON_SIDE_MENU_CHANGE = 'ON_SIDE_MENU_CHANGE';
export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU';

export function onSideMenuChange(isOpen) {
  return {
    type: ON_SIDE_MENU_CHANGE,
    payload: { isOpen }
  };
}

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
