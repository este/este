export const actions = create();
export const feature = 'todos';

const MAX_TODO_TITLE_LENGTH = 42;

export function create(dispatch) {

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

    completeTodo(todo) {
      dispatch(actions.completeTodo, todo);
    },

    onTodoFieldChange({id}, {target: {name, value}}) {
      switch (name) {
        case 'title':
          value = value.slice(0, MAX_TODO_TITLE_LENGTH);
          break;
      }
      dispatch(actions.onTodoFieldChange, {id, name, value});
    },

    onTodoEndEditing(todo) {
      if (todo.title.length === 0)
        dispatch(actions.deleteTodo, todo);
    },

    toggleTodoCompleted(todo) {
      dispatch(actions.toggleTodoCompleted, todo);
    },

    clearCompletedTodos() {
      dispatch(actions.clearCompletedTodos);
    },

    onNewTodoFieldChange({target: {name, value}}) {
      switch (name) {
        case 'title':
          value = value.slice(0, MAX_TODO_TITLE_LENGTH);
          break;
      }
      dispatch(actions.onNewTodoFieldChange, {name, value});
    }

  };

}
