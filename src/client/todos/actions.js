import Promise from 'bluebird';

export const actions = create();
export const feature = 'todos';

// When everything is constant, who needs to SCREAM_CONSTANTS?
const maxTitleLength = 42;

//TESTING
var Api = {
  get: function() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        const response = [{id: 'sh5s3g5baqle', title: 'meow meow meow'}, {id:'fde4fyf7p87d', title: 'make make make'}];
        resolve(response);
      }, 100);
    });
  }
};

export function create(dispatch, validate) {

  return {

    loadAllTodos() {

      return Api.get()
              .then(res => {
                dispatch(actions.loadAllTodos, res);
              })
              .catch(err => {
              });

    },

    addHundredTodos() {
      dispatch(actions.addHundredTodos);
    },

    addTodo(todo) {
      const title = todo.title.trim();
      if (!title) return;
      dispatch(actions.addTodo, todo);
    },

    clearAll() {
      dispatch(actions.clearAll);
    },

    deleteTodo(todo) {
      dispatch(actions.deleteTodo, todo);
    },

    setNewTodoField({target: {name, value}}) {
      switch (name) {
        case 'title':
        value = value.slice(0, maxTitleLength);
        break;
      }
      dispatch(actions.setNewTodoField, {name, value});
    }

  };

}

// import Promise from 'bluebird';

// export function onEditableSave(id, name, value) {
//   // Simulate async saving.
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({id, name, value});
//     }, 500);
//   });
//   return dispatch(onEditableSave, promise);
// }

// export function onEditableState(id, name, state) {
//   if (state)
//     state = state.set('value', state.value.slice(0, MAX_TODO_TITLE_LENGTH));
//   dispatch(onEditableState, {id, name, state});
// }
