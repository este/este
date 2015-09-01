export const actions = create();
export const feature = 'app';

export function create(dispatch) {

  return {

    toggleMenu() {
      dispatch(actions.toggleMenu);
    },

    toggleStatusBar() {
      dispatch(actions.toggleStatusBar);
    },

    hideStatusBar() {
      dispatch(actions.hideStatusBar);
    },

    showStatusBar() {
      dispatch(actions.showStatusBar);
    }

  };

}
