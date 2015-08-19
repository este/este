export const actions = create();
export const feature = 'todos';

// When everything is constant, who needs to SCREAM_CONSTANTS?
const maxTitleLength = 42;

export function create(dispatch, validate) {

  return {

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
